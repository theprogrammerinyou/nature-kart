import { useContext, useReducer, createContext } from "react";

export const FilterContext = createContext({
  sortBy: null,
  rating: "5Stars",
  category: [],
});

export const FiltersProvider = ({ children }) => {
  const filtersReducerFn = (filtersPrevState, action) => {
    switch (action.type) {
      case "SORT_BY":
        return { ...filtersPrevState, sortBy: action.payload };
      case "RATING":
        return { ...filtersPrevState, rating: action.payload };
      case "CATEGORY":
        return {
          ...filtersPrevState,
          category: filtersPrevState.category.includes(action.payload)
            ? filtersPrevState.category.filter((v) => v !== action.payload)
            : [...filtersPrevState.category, action.payload],
        };
      default:
        return { sortBy: null, rating: "5Stars", category: [] };
    }
  };

  const [filtersState, filtersDispatchFn] = useReducer(filtersReducerFn, {});

  return (
    <FilterContext.Provider value={{ filtersState, filtersDispatchFn }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFiltersContext = () => useContext(FilterContext);
