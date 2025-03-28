import SearchBar from "./SearchBar"
import SearchResults from "./SearchResults"

function SearchContainter() {

  return (
    <div className="col-span-9 p-4 relative h-[80vh]">
        <SearchResults />
        <SearchBar />
    </div>
  )
}

export default SearchContainter