import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Inews {
    id: string;
    title: string;
    description: string;
    category: string;
    imageAlt: string;
    imageUrl: string;
}
const NewsCard = ({ news }:{news:Inews}) => {
  return (
    <Link href={`/news/${news.id}`}>
    <div className="card bg-base-100 shadow-sm">
      <figure>
        <Image
          height={600}
          width={600}
          src={news.imageUrl}
          alt={news.imageAlt}
        />
      </figure>
      <div className="card-body">
        <p className="text-2xl text-red-600 font-semibold">{news.category}</p>
        <h2 className="card-title">{news.title}</h2>
        <p>{news.description}</p>
      </div>
    </div>
    </Link>
  );
};

export default NewsCard;
