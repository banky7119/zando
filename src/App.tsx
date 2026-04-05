import { useState } from 'react';
import './index.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ProductGrid from './features/catalog/ProductGrid';
import CartDrawer from './features/cart/CartDrawer';
import PaymentPage from './features/checkout/PaymentPage';
import AuthPage from './features/auth/AuthPage';
import { ShoppingCart } from 'lucide-react';
import type { Product, CartItem } from './types/product';

function App() {
  // --- AUTH & PERSISTENCE ---
  const [userEmail, setUserEmail] = useState(() => localStorage.getItem('zando_user_email') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('zando_user_email'));

  // --- STORE & TOAST STATE ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'store' | 'payment'>('store');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // New Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    localStorage.setItem('zando_user_email', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('zando_user_email');
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // TRIGGER POPUP
    setToastMessage(`${product.name} added!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  if (!isLoggedIn) return <AuthPage onLogin={handleLogin} />;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative overflow-x-hidden">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={(id, d) => setCartItems(prev => prev.map(i => i.id === id ? {...i, quantity: Math.max(1, i.quantity + d)} : i))}
        onRemove={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
        onCheckout={() => { setIsCartOpen(false); setView('payment'); }} 
      />

      <main className="container mx-auto p-4 flex-1">
        {view === 'store' ? (
          <div className="flex flex-col lg:flex-row gap-4">
            <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <ProductGrid 
              searchTerm={searchTerm} 
              onAddToCart={handleAddToCart}
              selectedCategory={selectedCategory}
              setSortBy={() => {}} // Placeholder
              sortBy="newest"
            />
          </div>
        ) : (
          <PaymentPage items={cartItems} onBack={() => setView('store')} onSuccess={() => { alert("Paid!"); setCartItems([]); setView('store'); }} />
        )}
      </main>

      {/* --- FLOATING TOAST POPUP --- */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#282828] text-white px-6 py-3 rounded-full shadow-2xl border border-[#f89c20] flex items-center gap-3">
            <ShoppingCart size={16} className="text-[#f89c20]" />
            <span className="text-[10px] font-black uppercase tracking-widest">{toastMessage}</span>
          </div>
        </div>
      )}

      <footer className="p-8 text-center text-gray-400 text-[10px] uppercase tracking-widest">
        &copy; 2026 ZANDO NIGERIA
      </footer>
    </div>
  );
}

export default App;