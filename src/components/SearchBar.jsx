import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaSearchengin } from "react-icons/lia";

function SearchBar({ setSearchQuery}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setSearchQuery(query)
    e.preventDefault(); // Prevents page reload
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    setQuery('')
  };

  return (
    <div className="bg-n-7 py-4 absolute bottom-1 w-full z-10 h-16">
    <form
      onSubmit={handleSubmit}
      className=" flex items-center mb-2 w-[700px] transition-all duration-300 hover:w-[900px] focus-within:w-[900px]"
    >
      {/* Search Icon */}
      <div className=" rounded-full absolute left-4">
        <LiaSearchengin className=" text-[#FFF94F] text-xl" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a product..."
        className="w-full bg-transparent placeholder:text-gray-300 text-[#FFF94F] outline-none border border-gray-600 focus:border-gray-400 transition-all duration-300 px-12 py-2 rounded-full"
      />
    </form>
    </div>
  );
}

export default SearchBar;
