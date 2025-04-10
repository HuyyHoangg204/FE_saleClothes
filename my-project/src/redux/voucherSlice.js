import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REST_API_V1_URL, HEADER, TOKEN} from './constant'
import axiosInstance from "./axiosConfig";

// sử dung redux-thunk 

// lấy tất cả voucher trong database
export const getAllVoucher = createAsyncThunk(
    "vouchers/getAllVoucher",
    async (indexPage) => {
        try {
            const response = await axiosInstance.get(`${REST_API_V1_URL}/khuyen-mai?page=${indexPage}`, HEADER)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
)
// tạo voucher mới
export const createVoucher = createAsyncThunk(
    "vouchers/createVoucher",
    async (voucher) => {
        try{
            const response = await axiosInstance.post(`${REST_API_V1_URL}/khuyen-mai/add`, voucher, HEADER)
            return response.data; 
        }catch(err){
            console.log(err)
        }
    }
)
export const deleteVoucher = createAsyncThunk(
    "vouchers/deleteVoucher",
    async (voucher) => {
        try {
            const response = await axiosInstance.delete(`${REST_API_V1_URL}/khuyen-mai/delete`, {
                headers: { Authorization: `Bearer ${TOKEN}` },
                data: voucher
            })
            return voucher
        } catch (error) {
            console.log(error);
            throw new Error("Lỗi khi xóa voucher này!!")
        }
    }
)
const voucherSlice = createSlice({
    name: "vouchers",
    initialState: {
        loading: false,
        error: null,
        vouchers: [],
    },
    reducers:{
        addVoucher: (state, action) => {
            state.vouchers.push(action.payload);
            state.loading = true
        },
        checkVoucher: (state, action) => {
            const x = state.vouchers.some((voucher) => voucher.id === action.payload.id)
            if(!x) state.loading = false;
        },
        editVoucher: (state, action) => {
            state.vouchers?.map((voucher) => (voucher.id !== action.payload.id) ? voucher : action.payload)
        }

    },
    extraReducers: (builder) => {
        builder
            // xử lý trường hợp lấy tất cả voucher
            // đang tải dữ liệu
            .addCase(getAllVoucher.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // lấy dữ liệu thành công
            .addCase(getAllVoucher.fulfilled, (state, action) => {
                
                state.vouchers = action.payload
                state.loading = false
            })
            // lấy dữ liệu thất bại
            .addCase(getAllVoucher.rejected, (state, action) => {
                state.loading = true
                state.error = "Lỗi khi lấy dữ liệu từ server"
            })
            //Xử lý trường hợp thêm voucher
            // đang tải dữ liệu
            .addCase(createVoucher.pending, (state) => {
                state.loading = true
                state.err = null
            })
            // thành công thêm voucher
            .addCase(createVoucher.fulfilled, (state, action) => {
                state.loading = false
                state.vouchers.push(action.payload)
            })
            // lỗi khi thêm voucher
            .addCase(createVoucher.rejected, (state) => {
                state.error = "add"
                state.loading = true
            })
            // xử lys trường hợp xóa voucher
            //xóa thành công
            .addCase(deleteVoucher.fulfilled, (state, action) => {
                console.log(action.payload.id);
                
                state.vouchers = state.vouchers?.filter((x) => x.id != action.payload.id)
                state.loading = false
            })
            // xóa dữ liệu thất bại
            .addCase(deleteVoucher.rejected, (state) => {
                state.error = "delete"
                state.loading = true
            })
    }
     
})

export const {addVoucher} = voucherSlice.actions;
export default voucherSlice.reducer;