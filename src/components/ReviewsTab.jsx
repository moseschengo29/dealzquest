import { useState } from "react";
// import ProductReviews from "./ProductReviews";
import SystemReviews from "./SystemReviews";



function ReviewsTab({reviews}) {
    const tabs = [
        { name: 'System Reviews', component: <SystemReviews reviews={reviews}/> },
        // { name: 'Product Reviews', component: <ProductReviews reviews={reviews} /> },
       
      ];
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <>

      <div className="mx-auto px-3 py-6 lg:py-4 md:px-2 lg:px-5 rounded-lg shadow-lg">
        {/* Tab Buttons */}
        <div className="py-1 flex space-x-3 items-center justify-center sm:space-x-6 overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 border-b-2 border-n-4 dark:border-form-strokedark">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 font-medium text-sm sm:text-base rounded-t-lg focus:outline-none transition-all ${
                activeTab === tab.name
                  ? 'bg-gray-900 text-gray-400' 
                  : 'bg-n-7 text-gray-700 hover:bg-gray dark:hover:bg-black dark:bg-graydark'
              }`}
              onClick={() => setActiveTab(tab.name)}
              aria-controls={`tab-${index}`}
              aria-selected={activeTab === tab.name}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="py-4 sm:py-6 bg-gray-50 dark:bg-gray-800 rounded-b-lg">
          {tabs.map((tab, index) => (
            <div
              key={index}
              id={`tab-${index}`}
              className={`transition-opacity duration-500 ease-in-out ${
                activeTab === tab.name ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              }`}
            >
              {tab.component}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ReviewsTab;
