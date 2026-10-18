import Link from "next/link";
import React from "react";

interface Navs {
  slug: string;
  title: string;
  topicId: number;
  url: string;
  scrapable: boolean;
}

const NavLinks = async () => {
  let navs: Navs[] = [];

  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/categories");

    if (!res.ok) {
      console.error("Categories API failed:", res.status);
    } else {
      const data = await res.json();
      navs = data.data ?? [];
    }
  } catch (error) {
    console.error("Fetch error details:", error);
    navs = [];
  }

  const filteredNavs = navs.filter((n) => n.scrapable);

  return (
    <div className="flex gap-5 justify-center mt-5">
      <Link href="/">হোম</Link>

      {filteredNavs.map((n) => (
        <Link key={n.topicId} href={`/category/${n.slug}`}>
          {n.title}
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
