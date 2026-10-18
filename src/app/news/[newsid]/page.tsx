import { notFound } from 'next/navigation';
import React from 'react';

const NewsDetalis = async ({ params }: { params:{ newsid: string } }) => {
    const { newsid } = await params;

    const res = await fetch(
        `https://news-api-v2.vercel.app/api/articles/${newsid}`
    );

    const data = await res.json();
    const news = data.data;
    if(!news){
        notFound()
    }

    return (
        <div>
            
            {/* <h1>{news.title}</h1> */}
            
            <h4>{news.text}</h4>
        </div>
    );
};

export default NewsDetalis;