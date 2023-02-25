import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: {}
    },
    reducers: {
        onSuccess: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const { onSuccess } = userSlice.actions
export default userSlice.reducer