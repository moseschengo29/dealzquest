/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { HiHeart } from "react-icons/hi";
import { benefits } from "../constants";
import Spinner from "./Spinner";

function SearchResults() {
  const [favorites, setFavorites] = useState({});

  const toggleFavorite = (index) => {
    setFavorites((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle the favorite state
    }));
  };

  if (false) return <Spinner />;

  return (
    <>
      <h1 className="mb-8 text-3xl">Showing 50 search results for "PS4"</h1>
      <ul className="flex flex-wrap gap-12 mb-2 max-h-[64vh] overflow-y-scroll pb-8">
        {benefits.map((benefit, index) => (
          <li key={index} className="relative flex flex-col bg-gray-900 p-4">
            <img
              src={benefit.imageUrl}
              alt="image"
              className="w-full h-full max-w-[310px] object-cover ease-in-out hover:scale-105 hover:opacity-50 transition-all duration-300 mb-6"
            />

            {/* Favorite Button - Always Visible */}
            <button
              onClick={() => toggleFavorite(index)}
              className="absolute top-4 right-4 bg-black/40 p-2 rounded-full transition-all"
            >
              <HiHeart
                className={`w-6 h-6 transition-all ${
                  favorites[index] ? "text-red-500" : "text-white stroke-white"
                }`}
              />
            </button>

            <h1 className="text-lg font-semibold hover:text-amber-500 cursor-pointer">{benefit.title}</h1>
            <h1 className="text-yellow-400 font-bold">KES 49,000</h1>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchResults;
