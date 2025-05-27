import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const CompareContext = createContext();

function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState(() => {
    // Load from local storage on initial load
    const stored = localStorage.getItem("compareItems");
    return stored ? JSON.parse(stored) : [];
  });

  // Sync with local storage whenever compareItems change
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  const toggleCompare = (product) => {
    setCompareItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        if (prev.length >= 4) {
          toast.error("You can only select up to 4 items to compare!");
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const contextData = {
    compareItems,
    setCompareItems,
    toggleCompare,
  };

  return (
    <CompareContext.Provider value={contextData}>
      {children}
    </CompareContext.Provider>
  );
}

function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined)
    throw new Error("Compare context used outside CompareProvider");
  return context;
}

export { CompareProvider, useCompare };
