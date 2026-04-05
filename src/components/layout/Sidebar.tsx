interface SidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

const Sidebar = ({ selectedCategory, setSelectedCategory }: SidebarProps) => {
  const categories = [
    "All", "Phones & Tablets", "Computing", "Electronics", 
    "Fashion", "Supermarket", "Appliances"
  ];

  return (
    // On small screens: Horizontal scroll. On large screens: Vertical sidebar.
    <aside className="w-full lg:w-64 bg-white rounded-md shadow-sm h-fit p-2 border border-gray-100 lg:sticky lg:top-24">
      <h3 className="hidden lg:block text-[10px] font-bold text-gray-400 px-3 py-2 uppercase tracking-widest">
        Categories
      </h3>
      
      <ul className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1 lg:space-y-0.5">
        {categories.map((cat) => (
          <li 
            key={cat} 
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm px-4 py-2 lg:px-3 lg:py-2.5 cursor-pointer rounded transition-all duration-200 shrink-0 flex items-center whitespace-nowrap ${
              selectedCategory === cat 
                ? "bg-orange-100 text-[#f89c20] font-bold shadow-sm" 
                : "text-gray-600 hover:bg-gray-50 hover:text-[#f89c20]"
            }`}
          >
            {cat}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;