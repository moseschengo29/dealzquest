import { BsTrash } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import useSearches from "../features/Searches/useSearches"
import Loader from "./Loader"
import { useState } from "react";
import { FaXmark } from "react-icons/fa6";
import ClearSearchesModal from "../features/Searches/ClearSearchesModal";
import RemoveSearchItem from "../features/Searches/RemoveSearchItem";
import { useSearchParams } from "react-router-dom";

function SearchSidebar({setSearchQuery}) {
  const { user } = useAuth(); 
  const { searches, isLoading } = useSearches();
  const [showConfirmClearSearches, setShowConfirmClearSearches] = useState(false)
  const [showRemoveSearch, setShowRemoveSearch] = useState(false)
  const [selectedSearchId, setSelectedSearchId] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  



  function handleShowClearSearchesModal(){
    setShowConfirmClearSearches(true)
  }

  function handleCloseClearSearchesModal(){
    setShowConfirmClearSearches(false)
  }

  function handleShowRemoveSearchItemModal(){
    setShowRemoveSearch(true)
  }

  function handleCloseRemoveSearchItemModal(){
    setShowRemoveSearch(false)
  }

  if (isLoading) return <div className='col-span-3 border-r border-[#FFF94F] p-4 h-full bg-black'>
    <Loader />
  </div>;

  let content;

  if (!user) {
    content = <p className="text-gray-400">Log into your account to show the recent searches.</p>;
  } else if (!searches || searches.length === 0) {
    content = <p className="text-gray-400">No recent searches available.</p>;
  } else {
    content = (
      <ul className='flex flex-col gap-4 mb-2 max-h-[70vh] overflow-y-scroll pb-8'>
        {Array.from(new Map(searches.map(s => [s.query.toLowerCase(), s])).values()).map((search, index) => (
          <li
              onClick={() => {
                setSearchParams({ q: search.query });
                setSearchQuery(search?.query);
              }}
              key={index} className="p-3 flex justify-between items-center bg-gray-800 text-gray-300 hover:bg-gray-950 hover:cursor-pointer">
            <span>
              {search.query.toUpperCase()}
            </span>
            <FaXmark
              onClick={() => {
                setSelectedSearchId(search.id);
                handleShowRemoveSearchItemModal();
              }}
              className="text-white hover:text-red-500"
            />
          </li>
        ))}
      </ul>
    );
    
  }

  return (
    <>
    {showConfirmClearSearches && <ClearSearchesModal close={handleCloseClearSearchesModal} />}
    {showRemoveSearch && <RemoveSearchItem close={handleCloseRemoveSearchItemModal} id={selectedSearchId} />}
    <div className='col-span-3 border-r border-[#FFF94F] p-4 h-full bg-gray-900'>
      <div className="flex items-center justify-between mb-5">
        <h2 className>Your Recent Searches</h2>
          <button onClick={handleShowClearSearchesModal} className="text-gray-400 flex items-center gap-1 text-sm">
            <span> Clear your searches</span>
            <BsTrash />
          </button>
      </div>
      {content}
    </div>
    </>
  );
}

export default SearchSidebar;
