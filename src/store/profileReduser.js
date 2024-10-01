import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (userID, thunkApi) => {
        try {
            if (!userID) {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`);
                if (!response.ok) {
                    throw new Error('Something go wrong')
                }
                return await response.json();
                
            }
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);
            if (!response.ok) {
                throw new Error('Something go wrong')
            }
            return await response.json();
        } catch (error) {
            return thunkApi.rejectWithValue(error.message)
        }
    })

const initialState = {
    user: [],
    loading: false,
    error: null,
}
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers:
        (builder) => {
            builder
                .addCase(fetchUser.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                })
                .addCase(fetchUser.fulfilled, (state, action) => {
                    state.loading = false;
                    state.user = action.payload;
                })
                .addCase(fetchUser.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload;

                })
        }
});

export const { fetchUserFailure, fetchUserSuccess, fetchUserRequest } = userSlice.actions;
export default userSlice.reducer;