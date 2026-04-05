import type { Product } from '../../types/product';
import { formatNaira } from '../../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  return (
    <div className="group relative border border-gray-100 rounded-sm p-2 hover:shadow-lg transition-all bg-white flex flex-col h-full">
      {product.discountPercentage && (
        <span className="absolute top-2 right-2 bg-orange-100 text-[#f89c20] text-[10px] font-bold px-1.5 py-0.5 rounded-sm z-10">
          -{product.discountPercentage}%
        </span>
      )}

      <div className="w-full aspect-square flex items-center justify-center mb-2 overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h3 className="text-xs text-gray-800 line-clamp-2 mb-1 leading-tight group-hover:text-[#f89c20]">
          {product.name}
        </h3>
        
        <div className="mt-auto">
          <span className="text-base font-bold block">{formatNaira(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through">
              {formatNaira(product.originalPrice)}
            </span>
          )}
        </div>
        
        <div className="flex items-center mt-1 text-[10px] text-gray-400">
          <div className="flex text-yellow-400 mr-1">
            {"★".repeat(Math.floor(product.rating))}
          </div>
          <span>({product.reviewsCount})</span>
        </div>
      </div>

      <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart();
          }}
          className="w-full bg-[#f89c20] text-white py-2 rounded shadow-md text-[10px] font-black hover:bg-orange-600 active:scale-95 transition-all"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;