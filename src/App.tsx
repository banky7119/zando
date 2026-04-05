import { useState } from 'react';
import './index.css';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import ProductGrid from './features/catalog/ProductGrid';
import CartDrawer from './features/cart/CartDrawer';
import PaymentPage from './features/checkout/PaymentPage';
import AuthPage from './features/auth/AuthPage';
import type { Product, CartItem } from './types/product';

function App() {
 
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('zando_user_email') || '';
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('zando_user_email');
  });

 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [view, setView] = useState<'store' | 'payment'>('store');

  // --- HANDLERS ---
  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    // Save to browser storage
    localStorage.setItem('zando_user_email', email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCartItems([]); 
    // Remove from browser storage
    localStorage.removeItem('zando_user_email');
    setView('store');
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
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handlePaymentSuccess = () => {
    alert(`🎉 Success! Confirmation sent to ${userEmail}`);
    setCartItems([]);
    setView('store');
  };

  const totalUnits = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // --- AUTH SHIELD ---
  if (!isLoggedIn) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col relative overflow-x-hidden font-sans">
      <Navbar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        cartCount={totalUnits} 
        onCartClick={() => setIsCartOpen(true)} 
        userEmail={userEmail}
        onLogout={handleLogout}
      />
      
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => { setIsCartOpen(false); setView('payment'); }} 
      />

      {view === 'store' ? (
        <main className="container mx-auto p-2 md:p-4 max-w-7xl flex flex-col lg:flex-row gap-4 flex-1">
          <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
          <div className="flex-1">
            <ProductGrid 
              searchTerm={searchTerm} 
              sortBy={sortBy} 
              setSortBy={setSortBy} 
              onAddToCart={handleAddToCart}
              selectedCategory={selectedCategory}
            />
          </div>
        </main>
      ) : (
        <main className="container mx-auto p-4 flex-1">
          <PaymentPage 
            items={cartItems} 
            onBack={() => setView('store')}
            onSuccess={handlePaymentSuccess}
          />
        </main>
      )}

      <footer className="py-8 bg-white border-t text-center text-gray-400 text-[10px] uppercase tracking-widest mt-auto">
        <p>&copy; 2026 ZANDO Marketplace | User: {userEmail}</p>
      </footer>
    </div>
  );
}

export default App;