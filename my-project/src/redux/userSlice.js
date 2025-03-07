import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        user: {
            user: null,
            isFetching: false,
            error: false,
        },
        msg: '',
        address: {
            isFetching: false,
            allAddress: null,
            error: false,
            success: false,
        },
    },
    reducers: {
        // get all user
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        //get user
        getUserStart: (state) => {
            state.user.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.user = action.payload;
        },
        getUserFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        deleteUserStart: (state) => {
            state.user.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.user.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state, action) => {
            state.user.isFetching = false;
            state.user.error = true;
            state.msg = action.payload;
        },
        // Get address
        getAddressStart: (state) => {
            state.address.isFetching = true;
        },
        getAddressSuccess: (state, action) => {
            state.address.isFetching = false;
            state.address.success = true;
            state.address.error = false;
            state.address.allAddress = action.payload;
        },
        getAddressFailed: (state) => {
            state.address.isFetching = false;
            state.address.error = true;
            state.address.success = false;
        },
    },
});
export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    getUserStart,
    getUserSuccess,
    getUserFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    getAddressFailed,
    getAddressStart,
    getAddressSuccess,
} = userSlice.actions;

export default userSlice.reducer;
