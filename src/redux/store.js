import { configureStore } from "@reduxjs/toolkit";
import artikelSlice from "@/redux/reducers/artikelSlice";
import authSlice from "@/redux/reducers/authSlice";
import teamSlice from "@/redux/reducers/teamSlice";

export const store = configureStore({
	reducer: {
		artikel: artikelSlice,
		auth: authSlice,
		team: teamSlice,
	},
});
