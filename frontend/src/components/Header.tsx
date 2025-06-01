
const Header = () => {
  return (
    <header className="bg-white shadow-md z-10 relative">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
          {/* <span className="text-2xl font-bold text-[#8976FD]">MMOLogin</span> */}
        </div>

        {/* Navigation menu */}
        <nav className="flex space-x-6 items-center">
          {/* Dropdown item */}
          <a href="/" className="text-gray-700 hover:text-[#8976FD]">Home</a>
          <Dropdown label="Services" items={["Submenu 1", "Submenu 2"]} />
          <Dropdown label="Download" items={["Windows", "MacOS", "Linux"]} />
          <Dropdown label="Blog" items={["Tech", "Design", "Marketing"]} />
          <a href="#" className="text-gray-700 hover:text-[#8976FD]">Contact Us</a>
        </nav>

        {/* Action buttons */}
        <div className="space-x-4 mt-4 md:mt-0">
          <a href="/login" className="px-4 py-2 text-[#8976FD] border border-[#8976FD] rounded-lg hover:bg-[#8976FD] hover:text-white transition">Login</a>
          <a href="/register" className="px-4 py-2 bg-[#8976FD] text-white rounded-lg hover:bg-[#7058E3] transition">Register</a>
        </div>
      </div>
    </header>
  );
};

const Dropdown = ({ label, items }: { label: string; items: string[] }) => (
  <div className="relative group">
    <a href="#" className="text-gray-700 hover:text-[#8976FD]">{label}</a>
    <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-40 mt-2 z-20">
      {items.map((item, idx) => (
        <a
          key={idx}
          href="/"
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {item}
        </a>
      ))}
    </div>
  </div>
);

export default Header;
