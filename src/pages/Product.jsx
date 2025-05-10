import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import ProductGrid from '../components/ProductGrid';
import { getTokensInCookies } from '../features/auth/authCookies';
import useFavourites from '../features/Favourites/useFavourites';
import { useQueryClient } from '@tanstack/react-query';
import { useRemoveFavourite } from '../features/Favourites/useRemoveFavourite';

const Produuct = () => {
  const { product_id } = useParams();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();
  const {isLoading:isLoadingFavourites, favourites} = useFavourites()
  const [localFavourites, setLocalFavourites] = useState({});

  const baseUrl = import.meta.env.VITE_API_URL;
  const {accessToken} = getTokensInCookies()


  console.log(product_id)

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true);
        console.log(user)
  
        // Set up headers with Authorization if user is logged in
        const headers = user
          ? {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`, // Adjust to match your auth structure
            }
          : {
              'Content-Type': 'application/json',
            };
  
        // Fetch product details
        const productRes = await fetch(`${baseUrl}/api/products/${product_id}/`, {
          headers,
        });
        if (!productRes.ok) throw new Error('Failed to fetch product details');
        const productData = await productRes.json();
        setProduct(productData);
  
        // Fetch similar products
        const similarRes = await fetch(`${baseUrl}/api/products/similar/${product_id}/`, {
          headers,
        });
        if (!similarRes.ok) throw new Error('Failed to fetch similar products');
        const similarData = await similarRes.json();
        setSimilarProducts(similarData);
  
        // Fetch favorites if user is logged in
        
      } catch (error) {
        console.error(error);
        setError('Failed to load product details');
      } finally {
        setIsLoading(false);
      }
    };
  
    if (product_id) {
      fetchProductDetails();
    }
  }, [product_id, user]);
  

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

  const productImages = product ? [
    product?.image,
    product?.image?.replace('?tr=w-400', '?tr=w-400&angle=30'),
    product?.image?.replace('?tr=w-400', '?tr=w-400&angle=60')
  ] : [];

  console.log(productImages)

  if (isLoading || isLoadingFavourites) {
    return (
        <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 border border-red-200 text-red-300 px-4 py-3 rounded">
          {error || 'Product not found'}
        </div>
        <Link to="/search" className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to search results
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-n-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/search" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" /> Back to search results
        </Link>

        <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            <div>
              <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <div/>
              </div>

              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-20 h-20 rounded-md overflow-hidden border-2 flex-shrink-0 ${
                      currentImageIndex === index ? 'border-blue-500' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt={`Product view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div>
                <img src={productImages[1]} alt="Image" className='w-[450px] h-[500px] mt-4' />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {product.source}
                </span>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-white">{product.rating.toFixed(1)}</span>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-gray-300 mb-4">{product.name}</h1>
              <div className="text-3xl font-bold text-gray-400 mb-6">
                KSh {product.price.toLocaleString()}
              </div>

              {product.description && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-white">{product.description}</p>
                </div>
              )}

              {product.specs && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="col-span-2">
                        <dt className="text-sm font-medium text-gray-500">{key}</dt>
                        <dd className="text-sm text-gray-300">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              <div className="flex space-x-4 mt-8">
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  View on {product.source}
                </a>
                <button
                  onClick={() => toggleFavorite(product)}
                  className={`p-3 rounded-md border ${
                    localFavourites[product.id]
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                  disabled={isDeleting}
                >
                  <Heart className={`h-5 w-5 ${localFavourites[product.id] ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {similarProducts.length > 0 && (
          <div className="mt-12">
            <ProductGrid
              products={similarProducts.slice(0, 4)}
              title="Similar Products You Might Like"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Produuct;
