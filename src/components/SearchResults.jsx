import { useEffect, useState } from "react";
import { HiHeart } from "react-icons/hi";
import { CiFilter } from "react-icons/ci";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { IoMdStar } from "react-icons/io";
import Spinner from "./Spinner";
import { getTokensInCookies } from "../features/auth/authCookies";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useFavourites from "../features/Favourites/useFavourites";
import { useRemoveFavourite } from "../features/Favourites/useRemoveFavourite";
import { Link } from "react-router-dom";
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

function SearchResults({ searchQuery }) {
  const baseUrl = import.meta.env.VITE_API_URL;
  const {accessToken} = getTokensInCookies()

  const [sortOption, setSortOption] = useState("relevance");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const {compareItems, toggleCompare} = useCompare()

  const [selectedSources, setSelectedSources] = useState([])

  const queryClient = useQueryClient();
  const {isLoading:isLoadingFavourites, favourites} = useFavourites()
  const [localFavourites, setLocalFavourites] = useState({});


  const toggleFilters = () => setShowFilters(!showFilters);
  

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) return;

  
      setLoading(true);
      setError("");
  
      try {
        const res = await fetch(`${baseUrl}/api/products/search/?q=${searchQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        queryClient.invalidateQueries({ queryKey: ['searches'] });

  
        const data = await res.json();
        console.log(data)
        setProducts(data || []);

        const uniqueSources = Array.from(new Set(data.map((p) => p.source)));
        setSelectedSources(uniqueSources);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch products.");
      }
  
      setLoading(false);
    };
  
    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    if (!isLoadingFavourites) {
      const favState = {};
      favourites?.forEach((fav) => {
        favState[fav.product.id] = true;
      });
      setLocalFavourites(favState);
    }
  }, [isLoadingFavourites, favourites]);
  

  const filteredProducts = products?.filter(
    (product) =>
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      selectedSources?.includes(product.source)
  )
  .sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return (b.rating || 0) - (a.rating || 0); // fallback if rating is undefined
      case "relevance":
      default:
        return 0; // no sorting — keep API order
    }
  });

  const { removeFavourite, isDeleting } = useRemoveFavourite(); 


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

  

  console.log(favourites)

  if (!searchQuery) return <p className="text-gray-400 text-center">Start typing to search for a product.</p>;
  if (loading || isLoadingFavourites) return <Spinner />;
  if (error) return <p className="text-red-400 text-center">{error}</p>;
  if (products.length === 0) return <p className="text-gray-400 text-center">No products found for {searchQuery}.</p>;

  return (
    <>
    <div>
        <div className="bg-n-7 rounded-lg shadow mb-6">
          <div className="p-4 border-b flex justify-between items-center">
            <h1 className="text-xl font-semibold">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
              <span className="ml-2 text-sm text-gray-400">
                ({filteredProducts.length} items)
              </span>
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={toggleFilters}
                className="flex items-center px-3 py-2 border border-gray-600 rounded-md text-sm bg-gray-900 text-gray-300 hover:bg-gray-800"
              >
                <CiFilter className="h-4 w-4 mr-2 text-yellow-300" />
                Filters
              </button>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none text-gray-200 block w-full pl-3 pr-10 py-2 border border-gray-600 rounded-md text-sm leading-5 focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-900"
                >
                  <option value="relevance">Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <HiMiniArrowsUpDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {showFilters && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Price Range</h3>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="0"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-28 border border-gray-300 rounded-md p-2 text-sm"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      min="0"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 0])}
                      className="w-28 border border-gray-300 rounded-md p-2 text-sm"
                      placeholder="Max"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Sources</h3>
                  <div className="grid grid-cols-2 gap-2">
                  {Array.from(new Set(products.map((p) => p.source))).map((source) => (
                      <div key={source} className="flex items-center">
                        <input
                          type="checkbox"
                          id={source}
                          checked={selectedSources.includes(source)}
                          onChange={(e) => {
                            setSelectedSources((prev) =>
                              e.target.checked
                                ? [...prev, source]
                                : prev.filter((s) => s !== source)
                            );
                          }}
                          className="h-4 w-4 text-blue-600"
                        />
                        <label htmlFor={source} className="ml-2 text-sm text-gray-200">
                          {source}
                        </label>
                      </div>
                    ))}

                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>

    
    <div>
      <ul className="flex flex-wrap gap-12 mb-2 max-h-[64vh] overflow-y-scroll pb-8">
        {filteredProducts.map((product, index) => (
          <li key={index} className="relative flex flex-col gap-3 bg-gray-900 p-4 max-w-[320px]">
            <img
              src={product.image || 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'}
              alt={product.name}
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
                <span className={`rounded-lg py-1 px-3 text-sm ${getSourceTagColor(product.source)}`}>
                  {product.source}
                </span>
                <span className="flex items-start gap-1"><IoMdStar size={20} /><span>{product.rating}</span></span>
            </div>
            <Link to={`/product/${product.id}`} className="text-lg font-semibold text-gray-200 hover:text-gray-300">{product.name}</Link>
            <div className="flex justify-between items-center">
              <h1 className="text-yellow-300 font-black text-xl">Ksh {product.price}</h1>
              <a href={product.url} target="_blank" rel="noreferrer">
                <LiaExternalLinkAltSolid size={30} className="text-blue-300 hover:text-yellow-300" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}

export default SearchResults;
