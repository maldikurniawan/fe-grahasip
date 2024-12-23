import { createSlice } from "@reduxjs/toolkit";

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    getTeamResult: false,
    getTeamLoading: false,
    getTeamError: false,
    addTeamResult: false,
    addTeamLoading: false,
    deleteTeamResult: false,
  },
  reducers: {
    teamReducers: (state, action) => {
      const { type, payload } = action.payload;
      switch (type) {
        case "GET_TEAM":
          return {
            ...state,
            getTeamResult: payload.data,
            getTeamLoading: payload.loading,
            getTeamError: payload.error,
          };
        case "ADD_TEAM":
          return {
            ...state,
            addTeamResult: payload.data,
            addTeamLoading: payload.loading,
          };
        case "DELETE_TEAM":
          return {
            ...state,
            deleteTeamResult: payload.data,
          };
        default:
          return state;
      }
    },
  },
});

export const { teamReducers } = teamSlice.actions;

export default teamSlice.reducer;
