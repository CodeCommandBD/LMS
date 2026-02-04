import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  searchHistory: [],
  filters: {
    category: "",
    level: "",
    price: "",
  },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      // Add to search history if not empty and not already in history
      if (action.payload && !state.searchHistory.includes(action.payload)) {
        state.searchHistory = [
          action.payload,
          ...state.searchHistory.slice(0, 9),
        ]; // Keep last 10 searches
      }
    },
    clearSearchQuery: (state) => {
      state.searchQuery = "";
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { ...initialState.filters };
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    removeFromHistory: (state, action) => {
      state.searchHistory = state.searchHistory.filter(
        (item) => item !== action.payload,
      );
    },
  },
});

export const {
  setSearchQuery,
  clearSearchQuery,
  setFilters,
  clearFilters,
  clearSearchHistory,
  removeFromHistory,
} = searchSlice.actions;

export default searchSlice.reducer;
