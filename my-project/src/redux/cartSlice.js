import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        getProductFromCart: {
            isFetching: false,
            currentCart: null,
            error: false,
            success: false,
        },
    },
    reducers: {
        addProductToCartStart: (state) => {
            state.getProductFromCart.isFetching = true;
        },
        addProductToCartSuccess: (state, action) => {
            state.getProductFromCart.isFetching = false;
            state.getProductFromCart.error = false;
            state.getProductFromCart.success = true;
            state.getProductFromCart.currentCart = action.payload;
        },
        addProductToCartFailed: (state) => {
            state.getProductFromCart.isFetching = false;
            state.getProductFromCart.error = true;
            state.getProductFromCart.success = false;
        },
    },
});

export const { addProductToCartStart, addProductToCartSuccess, addProductToCartFailed } = cartSlice.actions;

export default cartSlice.reducer;
