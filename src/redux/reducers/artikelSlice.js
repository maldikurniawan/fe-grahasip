import { createSlice } from "@reduxjs/toolkit";

export const artikelSlice = createSlice({
  name: "artikel",
  initialState: {
    getArtikelResult: false,
    getArtikelLoading: false,
    getArtikelError: false,
    addArtikelResult: false,
    addArtikelLoading: false,
    deleteArtikelResult: false,
  },
  reducers: {
    artikelReducers: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "GET_ARTIKEL":
          return {
            ...state,
            getArtikelResult: payload.data,
            getArtikelLoading: payload.loading,
            getArtikelError: payload.error,
          };
        case "ADD_ARTIKEL":
          return {
            ...state,
            addArtikelResult: payload.data,
            addArtikelLoading: payload.loading,
          };
        case "DELETE_ARTIKEL":
          return {
            ...state,
            deleteArtikelResult: payload.data,
          };
        default:
          return state;
      }
    },
  },
});

export const { artikelReducers } = artikelSlice.actions;

export default artikelSlice.reducer;
