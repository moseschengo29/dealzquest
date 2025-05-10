import ProductCard from "./ProductCard";

const ProductGrid = ({ 
  products, 
  favorites = [],
  title,
  emptyMessage = "No products found" 
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      {title && (
        <h2 className="text-2xl font-bold text-gray-300 mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            isFavorite={favorites.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
