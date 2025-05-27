import { MdAddCircle, MdCheckCircle, MdCompareArrows, MdOutlineCompareArrows } from "react-icons/md";
import { useCompare } from "../context/CompareContext";
import ReactApexChart from "react-apexcharts";
import React, { useState } from "react";
import { Link } from "react-router-dom"; // If you're using React Router
import { FiExternalLink } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import { useRemoveFavourite } from "../features/Favourites/useRemoveFavourite";
import { useQueryClient } from "@tanstack/react-query";
import useFavourites from "../features/Favourites/useFavourites";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { getTokensInCookies } from "../features/auth/authCookies";


export default function ComparePage() {
  const { compareItems, toggleCompare } = useCompare();
  const slots = [...compareItems, ...Array(4 - compareItems.length).fill(null)];
  const { removeFavourite, isDeleting } = useRemoveFavourite(); 
  const queryClient = useQueryClient();
  const {isLoading:isLoadingFavourites, favourites} = useFavourites()
  const [localFavourites, setLocalFavourites] = useState({});

  const baseUrl = import.meta.env.VITE_API_URL;
    const {accessToken} = getTokensInCookies()


const toggleFavorite = async (product) => {
  const isCurrentlyFav = localFavourites[product.id];
  const productId = product.id;

  // Optimistic UI update
  setLocalFavourites((prev) => ({
    ...prev,
    [productId]: !isCurrentlyFav,
  }));

  if (isCurrentlyFav) {
    // 🔻 Remove from backend favorites
    const currentFavourite = favourites.find((fav) => fav.product.id === productId);

    if (!currentFavourite) {
      console.warn("Could not find favorite record to delete");
      return;
    }

    try {
      await removeFavourite(currentFavourite.id);
      queryClient.invalidateQueries(['favourites']);
    } catch (error) {
      toast.error("Failed to remove favorite");
      // Revert on failure
      setLocalFavourites((prev) => ({
        ...prev,
        [productId]: isCurrentlyFav,
      }));
    }
  } else {
    // ❤️ Add to favorites
    const payload = {
      product_id: productId,
      search_data: [product],
    };

    try {
      const res = await fetch(`${baseUrl}/api/user/favorites/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Item Added To Favourites Successfully");
        queryClient.invalidateQueries(['favourites']);
      } else {
        const errorData = await res.json();
        toast.error(errorData?.product_id || "Failed to add item to favorites");
        // Revert on failure
        setLocalFavourites((prev) => ({
          ...prev,
          [productId]: isCurrentlyFav,
        }));
      }
    } catch (error) {
      console.error("Request failed", error);
      toast.error("Network error");
      setLocalFavourites((prev) => ({
        ...prev,
        [productId]: isCurrentlyFav,
      }));
    }
  }
};


  
  const placeholderImg =
    "https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg";

  const prices = compareItems?.map((item) => item.price);
  const ratings = compareItems?.map((item) => item.rating);

  const bestPrice = Math.min(...prices);
  const worstPrice = Math.max(...prices);
  const bestRating = Math.max(...ratings);
  const worstRating = Math.min(...ratings);

const maxRating = 5; 
const maxPrice = Math.max(...slots.map(p => p?.price || 0));
const ratingWeight = 0.6;
const priceWeight = 0.4;


  

  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    xaxis: {
      categories: compareItems.map((p) => p.name),
      title: {
        text: 'Item name',
        style: { color: '#fff' },
      },
      labels: { style: { colors: '#ccc' } },
    },
    yaxis: {
      title: {
        text: 'Value',
        style: { color: '#fff' },
      },
      labels: { style: { colors: '#ccc' } },
    },
    legend: {
      labels: { colors: '#fff' },
    },
    tooltip: {
      theme: 'dark',
    },
    colors: ['#3B82F6', '#FBBF24'], // Blue for rating, yellow for price
    dataLabels: {
      enabled: true,
      style: { colors: ['#000'] },
    },
  };
  
  const chartSeries = [
    {
      name: 'Price (Ksh)',
      data: compareItems.map((p) => p.price),
    },
    {
      name: 'Rating',
      data: compareItems.map((p) => p.rating),
    },
  ];

  if(isLoadingFavourites) return <Loader />

  return (
    <div className="p-6">
            <h1 className='my-2 font-extrabold text-3xl'>Product Comparisons</h1>

      <div className="flex flex-wrap justify-start items-stretch gap-2 mb-12">
  {slots.map((product, index) => (
    <React.Fragment key={product?.id || `slot-${index}`}>
      {product ? (
        (() => {
          const normalizedRating = product.rating / maxRating;
          const normalizedPrice = 1 - (product.price / maxPrice);
          const valueScore = (normalizedRating * ratingWeight + normalizedPrice * priceWeight);
          const barPercentage = Math.round(valueScore * 100);
      
          let barColor = "bg-red-600"; // Default for very poor value

          if (valueScore > 0.8) barColor = "bg-emerald-500";     // Excellent - Bright green
          else if (valueScore > 0.7) barColor = "bg-lime-500";     // Good - Lime
          else if (valueScore > 0.55) barColor = "bg-amber-400";   // Average - Amber/Yellow
          else if (valueScore > 0.4) barColor = "bg-orange-500";   // Below average - Orange

      
          return (
            <div className="w-full min-w-[360px] sm:w-80 bg-gray-900 text-white p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative">
              <button
                onClick={() => toggleCompare(product)}
                className="absolute top-4 left-4 bg-black/40 p-2 rounded-full flex items-center gap-2"
                title="Remove"
              >
                <MdCompareArrows size={24} className="text-red-400" />
              </button>
              <button disabled={isDeleting} onClick={() => toggleFavorite(product)} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full">
                            <HiHeart className={`w-6 h-6 ${localFavourites[product.id] ? "text-red-500" : "text-white stroke-white"}`} />
                          </button>
      
              <img
                src={product.image || placeholderImg}
                alt={product.name}
                className="w-full h-[330px] object-cover rounded mb-4"
              />
      
              <h2 className="text-lg font-bold mb-2 text-white line-clamp-2">{product.name}</h2>
              <p className="text-sm mb-3">
                <span className="font-medium text-gray-400 ">Source:</span> {product.source}
              </p>
      
              <div className="mb-4 bg-n-8 py-3 px-1">
                <p className="text-base font-semibold text-gray-300 mb-1">
                  Rating: {product.rating}
                  {product.rating === bestRating && (
                    <MdCheckCircle size={23} className="inline text-green-400 ml-1" />
                  )}
                </p>
              </div>
      
              <div className="mb-4 bg-n-8 py-3 px-1">
                <p className="text-base font-semibold text-gray-300 mb-1">
                  Price: Ksh {product.price.toLocaleString()}
                  {product.price === bestPrice && (
                    <MdCheckCircle size={23} className="inline text-green-400 ml-1" />
                  )}
                </p>
              </div>
      
              {/* Best Value Bar */}
              <div className="mt-2">
                <p className="text-sm text-gray-400 mb-1">Best Value</p>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${barColor} transition-all duration-500`}
                    style={{ width: `${barPercentage}%` }}
                  />
                </div>
              </div>
      
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-blue-400 hover:underline pt-2  flex items-center gap-1"
              >
                <span>View Product</span>
                <FiExternalLink />
              </a>
            </div>
          );
        })()
      ): (
        // Placeholder Box
        <Link
          to="/search" // Change to your actual search route
          className="w-full min-w-[360px] min-h-[500px] sm:w-80 bg-gray-800 text-white p-4 rounded-2xl shadow-md flex flex-col items-center justify-center hover:bg-gray-700 transition-all duration-300"
        >
          <MdAddCircle className="text-5xl text-blue-400 mb-2" />
          <p className="text-base font-semibold text-blue-300">Add A Product To Compare</p>
        </Link>
      )}

      {/* Arrow Between Cards */}
      {index !== slots.length - 1 && (
        <div className="flex items-center justify-center px-1">
          <MdOutlineCompareArrows className="text-gray-400 text-3xl" />
        </div>
      )}
    </React.Fragment>
  ))}
</div>





<div className="bg-gray-900 p-6 rounded-xl shadow-md mt-10">
    <h2 className="text-xl font-bold text-white mb-4">Price & Rating Comparison</h2>
    <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} />
  </div>
    </div>
  );
}