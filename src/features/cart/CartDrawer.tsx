import type { CartItem } from '../../types/product';
import { formatNaira } from '../../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const CartDrawer = ({ isOpen, onClose, items, onUpdateQuantity, onRemove, onCheckout }: CartDrawerProps) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/60 z-60 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div className={`fixed right-0 top-0 h-full w-full max-w-sm bg-white z-70 shadow-2xl transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        <div className="p-4 border-b flex justify-between items-center bg-[#f89c20] text-white">
          <h2 className="font-black uppercase italic tracking-tight">My Cart ({items.length})</h2>
          <button onClick={onClose} className="text-2xl hover:rotate-90 transition-transform">&times;</button>
        </div>

        <div className="p-4 overflow-y-auto h-[calc(100vh-220px)] scrollbar-hide">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-300">
              <span className="text-6xl mb-4">🛒</span>
              <p className="text-xs font-bold uppercase tracking-widest">Basket Empty</p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 border-b border-gray-50 pb-4 items-start">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain bg-gray-50 p-1 rounded" />
                  <div className="flex-1">
                    <h4 className="text-[10px] font-bold text-gray-800 uppercase leading-tight mb-1">{item.name}</h4>
                    <p className="text-sm text-[#f89c20] font-black">{formatNaira(item.price * item.quantity)}</p>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center border rounded bg-white hover:bg-gray-100 font-bold"
                      >-</button>
                      <span className="text-xs font-black min-w-5 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center border rounded bg-white hover:bg-gray-100 font-bold"
                      >+</button>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="text-[9px] text-red-500 font-black uppercase p-1"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 bg-gray-50 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="text-[10px] font-black text-gray-400 uppercase">Subtotal</span>
            <span className="text-2xl font-black text-gray-900">{formatNaira(subtotal)}</span>
          </div>
          
          <button 
            onClick={onCheckout}
            disabled={items.length === 0}
            className="w-full bg-black text-white py-4 rounded font-black text-xs uppercase tracking-[0.2em] hover:bg-[#f89c20] transition-all disabled:bg-gray-300"
          >
            Checkout Now
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;