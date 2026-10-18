import Image from "next/image";
import React from "react";
interface INews{
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;


}
const MainNews = ({ news}:{news:INews[]}) => {
const [firstNews, ...otherNews] = news;

//   const otherNews  = news.slice(1)
//   console.log(otherNews);
  return (
    <div className="flex gap-2 my-5">
      <div className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <Image
            height={300}
            width={400}
            src={firstNews.imageUrl}
            alt={firstNews.imageAlt}
          />
        </figure>
        <div className="card-body">
            <p className="text-2xl text-red-600 font-semibold">{firstNews.category}</p>
          <h2 className="card-title">{firstNews.title}</h2>
          <p>
           {firstNews.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 rounded-xl border border-gray-300 overflow-hidden">
  {otherNews.slice(0, 4).map((on) => (
    <div
      key={on.id}
      className="border-b border-gray-300 px-4 py-5 last:border-b-0"
    >
      <p className="mb-1 text-sm text-red-600">{on.category}</p>

      <h2 className="text-lg font-medium leading-7 text-black">
        {on.title}
      </h2>
    </div>
  ))}
</div>
    </div>
  );
};

export default MainNews;
