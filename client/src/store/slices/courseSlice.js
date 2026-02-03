import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    category: null,
    priceRange: { min: 0, max: 100000 },
    level: null, // 'beginner', 'intermediate', 'advanced'
    rating: null, // minimum rating
    sortBy: "newest", // 'newest', 'popular', 'price-low', 'price-high', 'rating'
  },
  searchQuery: "",
  selectedCategory: null,
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    setLevel: (state, action) => {
      state.filters.level = action.payload;
    },
    setRating: (state, action) => {
      state.filters.rating = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
  },
});

export const {
  setFilters,
  resetFilters,
  setSearchQuery,
  setSelectedCategory,
  setPriceRange,
  setLevel,
  setRating,
  setSortBy,
} = courseSlice.actions;

export default courseSlice.reducer;
