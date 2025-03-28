import { searches } from "../constants"

function SearchSidebar() {
  return (
    <div className='col-span-3 border-r border-[#FFF94F] p-4 h-full bg-black'>
        <h2 className="mb-5">Your Recent Searches</h2>
        <ul className='flex flex-col gap-4 mb-2 max-h-[70vh] overflow-y-scroll pb-8'>
                {searches.map((search, index) => 
                (<li key={index} className="p-3 bg-gray-800 hover:bg-gray-900 hover:cursor-pointer">
                    <span>{search.title}</span>
                </li>)
            )}
            </ul>
    </div>
  )
}

export default SearchSidebar