import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiHeart } from "react-icons/hi"
import { IoMdStar } from "react-icons/io"
import { LiaExternalLinkAltSolid } from "react-icons/lia"
import { useRemoveFavourite } from "../features/Favourites/useRemoveFavourite";
import { getTokensInCookies } from "../features/auth/authCookies";
import { useCompare } from "../context/CompareContext";
import { MdCompareArrows } from "react-icons/md";

const getSourceTagColor = (source) => {
    switch (source) {
      case "Jumia Kenya":
        return "bg-green-200 text-green-500";
      case "Kilimall":
        return "bg-blue-300 text-blue-500";
      case "Jiji Kenya":
        return "bg-red-200 text-red-500";
      default:
        return "bg-gray-300 text-gray-500";
    }
  };

function RecommendedProducts({products, favourites}) {
    console.log(products)
    const baseUrl = import.meta.env.VITE_API_URL;
    const {accessToken} = getTokensInCookies()

    const {removeFavourite, isDeleting} = useRemoveFavourite()
    const {compareItems, toggleCompare} = useCompare()


    const queryClient = useQueryClient()

    const [localFavourites, setLocalFavourites] = useState(
        () => favourites?.reduce((acc, item) => {
          acc[item.product.id] = true;
          return acc;
        }, {})
      );

    
      const toggleFavorite = async (item) => {
        const productId = item.id;
        const isCurrentlyFav = localFavourites[productId];
      
        // Optimistically update UI
        setLocalFavourites((prev) => ({
          ...prev,
          [productId]: !isCurrentlyFav,
        }));
      
        if (isCurrentlyFav) {
          // Remove from favorites
          try {
            await removeFavourite(item.id);
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
          // Add to favorites
          const payload = {
            product_id: productId,
            search_data: [item],
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
              toast.success("Favorited successfully");
            } else {
              const errorData = await res.json();
              toast.error(errorData?.product_id || "Failed to favorite");
      
              // Revert on failure
              setLocalFavourites((prev) => ({
                ...prev,
                [productId]: isCurrentlyFav,
              }));
            }
          } catch (error) {
            console.error("Request failed", error);
            toast.error("Network error");
      
            // Revert on failure
            setLocalFavourites((prev) => ({
              ...prev,
              [productId]: isCurrentlyFav,
            }));
          }
        }
      };

  return (
    <div className='px-12'>
                <h1 className='my-6 font-extrabold text-3xl'>My Recommended Products</h1>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-2 overflow-y-scroll pb-8">
                {products?.map((product, index) => (
                  <li key={index} className="relative flex flex-col gap-3 bg-gray-900 p-4 max-w-[350px]">
                    <img
                      src={product?.image || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}
                      alt={product?.name}
                      className="w-full max-w-[310px] h-[370px] object-cover hover:scale-105 hover:opacity-50 transition-all duration-300 mb-6"
                    />
                    <button disabled={isDeleting} onClick={() => toggleFavorite(product)} className="absolute top-4 right-4 bg-black/40 p-2 rounded-full">
                        <HiHeart className={`w-6 h-6 ${localFavourites[product.id] ? "text-red-500" : "text-white stroke-white"}`} />
                        </button>
                        <button
                          onClick={() => toggleCompare(product)}
                          className="absolute top-4 left-4 bg-black/40 p-2 rounded-full flex items-center gap-2"
                          title={
                            compareItems.some((item) => item.id === product.id)
                              ? "Remove from Compare"
                              : compareItems.length >= 4
                              ? "Maximum 4 items"
                              : "Add to Compare"
                          }
                        >
                          <MdCompareArrows
                            size={24}
                            className={`transition-colors duration-300 ${
                              compareItems.some((item) => item.id === product.id)
                                ? "text-green-400"
                                : compareItems.length >= 4
                                ? "text-gray-500"
                                : "text-white"
                            }`}
                          /> 
                          <span className={`transition-colors duration-300 ${
                              compareItems.some((item) => item.id === product.id)
                                ? "text-green-400"
                                : compareItems.length >= 4
                                ? "text-gray-500"
                                : "text-white"
                            }`}>Compare</span>
                        </button>
        
                    <div className="flex justify-between items-center -mt-4">
                        <span className={`rounded-lg py-1 px-3 text-sm ${getSourceTagColor(product?.source)}`}>
                          {product?.source}
                        </span>
                        <span className="flex items-start gap-1"><IoMdStar size={20} /><span>{product?.rating}</span></span>
                    </div>
                    <h1 className="text-lg font-semibold text-gray-300 hover:text-gray-400">{product?.name}</h1>
                    <div className="flex justify-between items-center">
                      <h1 className="text-yellow-300 font-black text-xl">Ksh {product?.price}</h1>
                      <a href={product?.url} target="_blank" rel="noreferrer">
                        <LiaExternalLinkAltSolid size={30} className="text-blue-300 hover:text-yellow-300" />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
  )
}

export default RecommendedProducts