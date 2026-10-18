import MainNews from "@/components/MainNews";
import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";

interface IotherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageAlt: string;
    imageUrl: string;
  }[];
}
export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
    if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles;
  // console.log(sections)

  const otherSection:IotherSection[] = sections.slice(1);
  // console.log(otherSection)

  return (
    <div>
      

      <div className="grid grid-cols-3 ">
        {/* New section */}

        <div className=" col-span-2">
          <MainNews news={mainNews} />

          <div className="grid gap-5 mt-5">
            {otherSection.map((os) => (
              <div className="" key={os.curationId}>
                <h1 className="font-bold border-b-2 pb-1">{os.title}</h1>

                <div className="grid mt-3 grid-cols-3 gap-2 py-2 sm:grid-cols-3">
                  {os.articles.map((news) => (
                    <NewsCard key={news.id} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* most read */}
        <div className= "col-span-1 mt-5 mx-2">
          <MostRead></MostRead>
        </div>
      </div>
    </div>
  );
}
