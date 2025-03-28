
import { LiaSearchengin } from "react-icons/lia"

function SearchBar() {

  return (
    <div className="absolute bottom-1 flex items-center w-[700px] transition-all duration-300 hover:w-[900px] focus-within:w-[900px]">
      {/* Search Icon */}
      <div className="bg-black rounded-full absolute left-4">
        
      <LiaSearchengin className=" text-[#FFF94F] text-xl" />
      </div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for a product..."
        className="w-full bg-transparent placeholder:text-[#FFF94F] text-[#FFF94F] outline-none border border-blue-300 focus:border-[#32CD32] transition-all duration-300 px-12 py-2 rounded-full"
       
      />
    </div>
  )
}

export default SearchBar