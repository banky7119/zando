import { ShoppingCart, Plus } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatNaira } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  // This now matches the Grid's function exactly
  onAddToCart: (product: Product) => void; 
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-xl p-3 border border-gray-100 flex flex-col relative shadow-sm hover:shadow-md transition-all h-full">
      
      {/* MOBILE BUTTON */}
      <button 
        onClick={() => onAddToCart(product)} // Pass the specific product back up
        aria-label={`Add ${product.name} to cart`}
        title="Add to Cart"
        className="md:hidden absolute top-2 right-2 bg-[#f89c20] text-white p-2 rounded-full z-10 shadow-lg active:scale-90 flex items-center justify-center"
      >
        <Plus size={18} strokeWidth={3} />
      </button>

      <div className="aspect-square bg-gray-50 rounded-lg mb-3 flex items-center justify-center overflow-hidden p-2">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
        />
      </div>

      <div className="flex-1 px-1 text-left">
        <h3 className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter truncate">
          {product.category}
        </h3>
        <h2 className="text-[11px] font-black text-gray-900 leading-tight mb-1 line-clamp-2 h-8">
          {product.name}
        </h2>
        <p className="text-[#f89c20] font-black text-sm">
          {formatNaira(product.price)}
        </p>
      </div>

      {/* DESKTOP BUTTON */}
      <button 
        onClick={() => onAddToCart(product)} // Pass the specific product back up
        aria-label={`Add ${product.name} to cart`}
        className="hidden md:flex items-center justify-center gap-2 w-full mt-4 bg-[#282828] text-white py-3 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#f89c20] transition-all"
      >
        <ShoppingCart size={14} />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;