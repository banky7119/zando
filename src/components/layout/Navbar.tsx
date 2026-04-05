import { Search, ShoppingCart, LogOut } from 'lucide-react'; // Added LogOut icon

interface NavbarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  cartCount: number;
  onCartClick: () => void;
  userEmail: string;   // <--- Add this
  onLogout: () => void; // <--- Add this
}

const Navbar = ({ 
  searchTerm, 
  setSearchTerm, 
  cartCount, 
  onCartClick, 
  userEmail, 
  onLogout 
}: NavbarProps) => {
  return (
    <nav className="bg-[#282828] text-white p-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Logo & User Greeting */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter text-[#f89c20]">
            ZANDO
          </h1>
          <div className="hidden lg:block h-6 w-px bg-gray-600 mx-2"></div>
          <p className="hidden lg:block text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Welcome, <span className="text-white">{userEmail.split('@')[0]}</span>
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-1/2 group">
          <input
            type="text"
            placeholder="Search for electronics, phones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#3a3a3a] rounded-full py-2 px-10 outline-none focus:ring-2 focus:ring-[#f89c20] transition-all text-sm"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 group-focus-within:text-[#f89c20]" size={18} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Cart Icon */}
          <button 
            onClick={onCartClick} 
            className="relative p-2 hover:bg-[#3a3a3a] rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#f89c20] text-[#282828] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#282828]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Logout Button */}
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;