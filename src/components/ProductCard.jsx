import { useState } from 'react';
import { Heart, ExternalLink, Star, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import useFavourites from '../features/Favourites/useFavourites';
import { getTokensInCookies } from '../features/auth/authCookies';
import { useRemoveFavourite } from '../features/Favourites/useRemoveFavourite';

const ProductCard = ({ product }) => {
    const queryClient = useQueryClient();
  const {isLoading:isLoadingFavourites, favourites} = useFavourites()
  const [localFavourites, setLocalFavourites] = useState({});

  const baseUrl = import.meta.env.VITE_API_URL;
    const {accessToken} = getTokensInCookies()

  
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

    if(isLoadingFavourites) return <Loader />
  
  return (
    <div>
      <Link to={`/product/${product.id}`}>
        <div className="relative h-48 overflow-hidden bg-gray-700">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={() => toggleFavorite(product)}
            className={`absolute top-2 right-2 p-2 rounded-full ${
                localFavourites[product.id] ? 'bg-red-500 text-white' : 'bg-white text-gray-600'
            } shadow hover:shadow-md transition-all duration-200`}
            disabled={isDeleting}
          >
            <Heart className={`h-5 w-5 ${localFavourites[product.id] ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
              {product.source}
            </span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-300">{product.rating.toFixed(1)}</span>
            </div>
          </div>

          <h3 className="text-lg font-medium text-gray-300 mb-2 line-clamp-2" title={product.name}>
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-4">
            <span className="text-xl font-bold text-gray-400">KSh {product.price.toLocaleString()}</span>
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-blue-600 hover:text-blue-800"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
