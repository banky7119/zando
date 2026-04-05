import ProductCard from '../../components/product/ProductCard';
import type { Product } from '../../types/product'; 
import { MOCK_PRODUCTS } from '../../services/mockData';
import { ShoppingCart } from 'lucide-react';

interface GridProps {
  searchTerm: string;
  sortBy: string;
  setSortBy: (value: string) => void;
  onAddToCart: (product: Product) => void; 
  selectedCategory: string;
}

const ProductGrid = ({ searchTerm, sortBy, setSortBy, onAddToCart, selectedCategory }: GridProps) => {
  
  // 1. FILTERING LOGIC
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // 2. SORTING LOGIC
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm min-h-125 flex-1">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b pb-4 gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-800 uppercase tracking-tight">
            {selectedCategory === 'All' ? 'Marketplace' : selectedCategory}
          </h2>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
            {sortedProducts.length} Products Available
          </p>
        </div>

        <select 
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="text-[10px] font-bold uppercase tracking-widest border-2 border-gray-100 rounded-lg p-2 bg-gray-50 outline-none cursor-pointer focus:border-[#f89c20] transition-colors"
        >
          <option value="newest">Latest Arrivals</option>
          <option value="price-low">Price: Lowest</option>
          <option value="price-high">Price: Highest</option>
        </select>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              // PASSING THE FUNCTION DIRECTLY
              onAddToCart={onAddToCart} 
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
             <ShoppingCart size={40} className="text-gray-300" />
          </div>
          <p className="text-gray-500 font-black uppercase text-xs tracking-widest">No items found</p>
          <p className="text-gray-400 text-[10px] mt-1">Try adjusting your filters or search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;