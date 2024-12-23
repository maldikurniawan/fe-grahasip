import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        loginUserResult: false,
        loginUserLoading: false,
        logoutUserResult: false,
    },
    reducers: {
        authReducer: (state, action) => {
            const { type, payload } = action.payload;
            switch (type) {
                case "LOGIN_USER":
                    return {
                        ...state,
                        loginUserResult: payload.data,
                        loginUserLoading: payload.loading,
                    };
                case "LOGOUT_USER":
                    return {
                        ...state,
                        logoutUserResult: payload.data,
                    };
                default:
                    return state;
            }
        },
    },
});

export const { authReducers } = authSlice.actions;

export default authSlice.reducer;
