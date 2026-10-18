import MarqueeText from "react-marquee-text";
import "react-marquee-text/dist/styles.css";

interface Headline {
  id: number;
  title: string;
  url: string;
  publishedAt: string;
}
const Marquee = async () => {
  const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}`);
  }
  const data = await res.json();
  const headlines: Headline[] = data.data;
  console.log(headlines);
  return (
    <div className="bg-red-600 text-white ">
      <div className="flex max-w-7xl mx-auto">
        <div className="bg-red-700 py-1 px-1.5">সর্বশেষ</div>
        <MarqueeText className="py-1" direction="right" duration={20}>
          {headlines.map((headline) => (
            <span key={headline.id}>
              <span>{headline.title}</span>
              <span className="mx-4">•</span>
            </span>
          ))}
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
