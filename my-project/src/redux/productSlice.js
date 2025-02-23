import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    addProduct: {
      isFetching: false,
      currentProduct: null,
      error: false,
      success: false,
    },
    getAllProduct: {
      isFetching: false,
      currentAllProduct: null,
      error: false,
      success: false,
    },
    getImageProduct: {
      isFetching: false,
      currentImageProduct: null,
      error: false,
      success: false,
    },
    getAllImageProduct: {
      isFetching: false,
      currentAllImageProduct: null,
      error: false,
      success: false,
    },
    getAllFavoriteProduct: {
      isFetching: false,
      currentAllProduct: null,
      error: false,
      success: false,
    },
  },
  reducers: {
    addProductStart: (state) => {
      state.addProduct.isFetching = true;
    },
    addProductSuccess: (state, action) => {
      state.addProduct.isFetching = false;
      state.addProduct.error = false;
      state.addProduct.success = true;
      state.addProduct.currentProduct = action.payload;
    },
    addProductFailed: (state) => {
      state.addProduct.isFetching = false;
      state.addProduct.error = true;
      state.addProduct.success = false;
    },
    getAllProductStart: (state) => {
      state.getAllProduct.isFetching = true;
    },
    getAllProductSuccess: (state, action) => {
      state.getAllProduct.isFetching = false;
      state.getAllProduct.error = false;
      state.getAllProduct.success = true;
      state.getAllProduct.currentAllProduct = action.payload;
    },
    getAllProductFailed: (state) => {
      state.getAllProduct.isFetching = false;
      state.getAllProduct.error = true;
      state.getAllProduct.success = false;
    },
    getImageProductStart: (state) => {
      state.getImageProduct.isFetching = true;
    },
    getImageProductSuccess: (state, action) => {
      state.getImageProduct.isFetching = false;
      state.getImageProduct.error = false;
      state.getImageProduct.success = true;
      state.getImageProduct.currentImageProduct = action.payload;
    },
    getImageProductFailed: (state) => {
      state.getImageProduct.isFetching = false;
      state.getImageProduct.error = true;
      state.getImageProduct.success = false;
    },
    getAllImageProductStart: (state) => {
      state.getAllImageProduct.isFetching = true;
    },
    getAllImageProductSuccess: (state, action) => {
      state.getAllImageProduct.isFetching = false;
      state.getAllImageProduct.error = false;
      state.getAllImageProduct.success = true;
      state.getAllImageProduct.currentAllImageProduct = action.payload;
    },
    getAllImageProductFailed: (state) => {
      state.getAllImageProduct.isFetching = false;
      state.getAllImageProduct.error = true;
      state.getAllImageProduct.success = false;
    },
    //Product favorites
    getAllProductFavoriteStart: (state) => {
      state.getAllFavoriteProduct.isFetching = true;
    },
    getAllProductFavoriteSuccess: (state, action) => {
      state.getAllFavoriteProduct.isFetching = false;
      state.getAllFavoriteProduct.error = false;
      state.getAllFavoriteProduct.success = true;
      state.getAllFavoriteProduct.currentAllProduct = action.payload;
    },
    getAllProductFavoriteFailed: (state) => {
      state.getAllFavoriteProduct.isFetching = false;
      state.getAllFavoriteProduct.error = true;
      state.getAllFavoriteProduct.success = false;
    },
  },
});

export const {
  addProductStart,
  addProductSuccess,
  addProductFailed,
  getAllProductStart,
  getAllProductFailed,
  getAllProductSuccess,
  getImageProductFailed,
  getImageProductStart,
  getImageProductSuccess,
  getAllImageProductFailed,
  getAllImageProductStart,
  getAllImageProductSuccess,
  getAllProductFavoriteFailed,
  getAllProductFavoriteStart,
  getAllProductFavoriteSuccess
} = productSlice.actions;

export default productSlice.reducer;
