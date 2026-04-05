import ProductCard from '../../components/product/ProductCard';
import type { Product } from '../../types/product'; 
import { MOCK_PRODUCTS } from '../../services/mockData';

interface GridProps {
  searchTerm: string;
  sortBy: string;
  setSortBy: (value: string) => void;
  onAddToCart: (product: Product) => void; // <--- Changed to accept a Product
  selectedCategory: string;
}

const ProductGrid = ({ searchTerm, sortBy, setSortBy, onAddToCart, selectedCategory }: GridProps) => {
  
  // 1. FILTERING LOGIC
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 2. SORTING LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-white p-4 rounded-md shadow-sm min-h-125">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
            {selectedCategory === 'All' ? 'Top Selling Items' : selectedCategory}
          </h2>
          <p className="text-xs text-gray-400">{sortedProducts.length} items found</p>
        </div>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-xs border border-gray-200 rounded p-2 bg-gray-50 outline-none cursor-pointer"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Popularity (Rating)</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={() => onAddToCart(product)} // <--- Passing the object
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-gray-500 font-medium">No items found in "{selectedCategory}"</p>
          <p className="text-gray-400 text-xs">Try a different category or search term.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;