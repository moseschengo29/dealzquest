import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

function SearchContainter({searchQuery, setSearchQuery}) {

  return (
    <div className="col-span-9 p-4 relative h-[80vh]">
        <SearchResults searchQuery={searchQuery} />
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  )
}

export default SearchContainter