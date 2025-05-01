import { useState } from "react"
import SearchContainter from "../components/SearchContainter"
import SearchSidebar from "../components/SearchSidebar"
import Section from "../components/Section"

function Search() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <Section>
        <div className=" grid grid-cols-12">
            <SearchSidebar setSearchQuery={setSearchQuery}/>
            <SearchContainter searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
    </Section>
  )
}

export default Search