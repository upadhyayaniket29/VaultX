import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import millify from "millify";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Spinner from "./Spinner";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcryptos] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    const filteredCryptos = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setcryptos(filteredCryptos);
  }, [cryptosList, searchKey]);

  if (isFetching) return <Spinner/>

  return (
    <>
      {!simplified && (
       <div className="text-center mt-10">
  <div className="relative">
    <input
      type="search"
      className="px-6 py-3 pl-12 mb-6 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 placeholder:text-gray-600 transition-all duration-300 ease-in-out w-80"
      placeholder="Search a coin"
      value={searchKey}
      onChange={(e) => setSearchKey(e.target.value)}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M11 16a7 7 0 100-14 7 7 0 000 14zm7 0l4 4"
      />
    </svg>
  </div>
</div>

      )}
      <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 md:px-16 mb-16 mt-6 dark:text-gray-200">
        {cryptos?.map((obj) => {
          return (
            <Link key={obj.uuid} to={`/coins/${obj.uuid}`}>
              <div
                className="border p-4 flex items-center gap-1 h-full hover:shadow-md "
              >
                  <img
                    className="w-12  object-cover"
                    src={obj.iconUrl}
                    alt={obj.name + "icon"}
                  />
                  <div className="flex flex-col gap-3 mx-auto">
                    <p className="text-gray-700 text-sm dark:text-gray-400">
                      {obj.name} ({obj.symbol})
                    </p>
                                  <h3 className="text-center text-3xl">{millify(obj.price)}</h3>
                                  {obj.change > 0 ? (
                    <div className="flex justify-center items-center  text-green-800 dark:text-green-600 gap-1">
                      <CaretUpOutlined />
                      <p className="text-center ">{obj.change}%</p>
                    </div>
                                  ) : (
                    <div className="flex justify-center items-center  text-red-800 dark:text-red-600 gap-1">
                      <CaretDownOutlined />
                      <p className="text-center ">{Math.abs(obj.change)}%</p>
                    </div>
                                  )}
                  </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Cryptocurrencies;
