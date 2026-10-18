import NewsCard from "@/components/NewsCard";
import { notFound } from "next/navigation";

interface Inews {
  id: string;
  title: string;
  description: string;
  category: string;
  imageAlt: string;
  imageUrl: string;
}

const CategoryNews = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${id}`
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const categoryNews: Inews[] = data.data;

  if (!categoryNews || categoryNews.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold border-b-2 border-red-700 mb-5">
        {data.title}
      </h1>

      <div className="grid mt-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-2">
        {categoryNews.map((cnews) => (
          <NewsCard key={cnews.id} news={cnews} />
        ))}
      </div>
    </div>
  );
};

export default CategoryNews;