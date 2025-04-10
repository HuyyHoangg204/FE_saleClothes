import {configureStore} from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import  userReducer  from "./userSlice"
import categoryReducer from "./categorySlice"
import productReducer from "./productSlice"
import cartReducer from "./cartSlice"
import voucher from "./voucherSlice"
export default  configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        category: categoryReducer,
        product: productReducer,
        cart: cartReducer,
        voucher: voucher, 
    }
})