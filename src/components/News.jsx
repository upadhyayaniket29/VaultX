import moment from "moment";
import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import Spinner from "./Spinner";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("bitcoin");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    coin: newsCategory,
  });
  const { data: cryptosList } = useGetCryptosQuery(100);

  if (isFetching) return <Spinner />;

  const demoThumbnail =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  return (
    <>
      {!simplified && (
        <h1 className="text-center mt-5 md:mt-0 text-3xl font-semibold dark:text-gray-200 mb-4">
          Latest News
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5 md:px-16 mb-16 pt-5 dark:text-gray-200">
        {cryptoNews?.results?.map((news, index) => (
          <a href={news.link} key={index} target="_blank" rel="noreferrer">
            <div className="border cursor-pointer p-3 h-full flex flex-col justify-between hover:shadow-md">
              <div className="flex justify-between gap-2">
                <h3
                  title={news.title}
                  className="text-lg font-medium"
                >
                  {news.title.length > 75
                    ? `${news.title.substring(0, 75)}...`
                    : news.title}
                </h3>
                <img
                  className="w-28 h-28 object-cover"
                  src={news.image_url || demoThumbnail}
                  alt={news.title}
                />
              </div>

              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-4">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    src={news.source_icon || demoThumbnail}
                    alt="provider icon"
                  />
                  <p>{news.source_id}</p>
                </div>
                <p className="text-gray-700 text-sm dark:text-gray-400">
                  {moment(news.pubDate).startOf("ss").fromNow()}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default News;

