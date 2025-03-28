import SearchContainter from "../components/SearchContainter"
import SearchSidebar from "../components/SearchSidebar"
import Section from "../components/Section"

function Search() {
  return (
    <Section>
        <div className=" grid grid-cols-12">
            <SearchSidebar />
            <SearchContainter />
        </div>
    </Section>
  )
}

export default Search