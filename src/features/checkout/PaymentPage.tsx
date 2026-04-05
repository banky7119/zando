
import { formatNaira } from '../../utils/formatCurrency';
import type { Product } from '../../types/product';

interface PaymentProps {
  items: Product[];
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentPage = ({ items, onBack, onSuccess }: PaymentProps) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-8">
      <div className="bg-gray-50 p-6 border-b flex justify-between items-center">
        <button onClick={onBack} className="text-[#f89c20] font-bold text-sm">← Back to Shop</button>
        <h2 className="text-xl font-black uppercase italic">Secure Checkout</h2>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Form */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-gray-400">Shipping Details</h3>
          <input type="text" placeholder="Full Name" className="w-full p-3 border rounded text-sm outline-orange-400" />
          <input type="email" placeholder="Email Address" className="w-full p-3 border rounded text-sm outline-orange-400" />
          <input type="text" placeholder="Delivery Address in Lagos" className="w-full p-3 border rounded text-sm outline-orange-400" />
          
          <h3 className="text-sm font-bold uppercase text-gray-400 mt-6">Payment Method</h3>
          <div className="p-3 border-2 border-orange-400 rounded flex items-center justify-between">
            <span className="text-sm font-bold">Paystack / Card</span>
            <div className="flex gap-1">
              <div className="w-6 h-4 bg-blue-600 rounded-sm"></div>
              <div className="w-6 h-4 bg-red-500 rounded-sm"></div>
            </div>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-gray-50 p-4 rounded-md h-fit">
          <h3 className="text-sm font-bold uppercase text-gray-400 mb-4">Order Summary</h3>
          <div className="max-h-40 overflow-y-auto mb-4 space-y-2">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="truncate w-32">{item.name}</span>
                <span className="font-bold">{formatNaira(item.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-bold">Total</span>
            <span className="text-lg font-black text-[#f89c20]">{formatNaira(total)}</span>
          </div>
          <button 
            onClick={onSuccess}
            className="w-full bg-[#f89c20] text-white py-4 rounded font-black mt-6 hover:bg-orange-600 transition-transform active:scale-95 shadow-lg"
          >
            PAY {formatNaira(total)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;