import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { deleteVoucher } from '../../redux/voucherSlice';
import { toast } from 'react-toastify';
const VoucherCard = ({ children }) => {
    const dispatch = useDispatch();
    
    const isExpired = useMemo(() => {
        const now = new Date();
        const expiry = new Date(children?.endDate);
        const timeDiff = expiry - now;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        if (daysDiff > 0) {
            if (daysDiff >= 2) {
                return 'active';
            } else return 'expired';
        } else return 'disabled';
    }, [children?.endDate]);
    const background = useMemo(() => {
        const exp = isExpired;
        if (exp === 'active') return 'bg-green-600 text-white';
        else if (exp === 'expired') return 'bg-yellow-300 text-white';
        else return 'bg-red-500 text-white';
    }, [isExpired]);

    const handleDeleteVoucher = (voucher) => {
        const mid = () => {
            dispatch(deleteVoucher(voucher))
        }
        toast.warn(
            <div>
                <p>Bạn có chắc chắn muốn xóa voucher này không?</p>
                <button 
                    onClick={() => mid(toast.dismiss())} 
                    style={{ marginRight: 10, padding: "5px 10px", backgroundColor: "red", color: "white", border: "none", cursor: "pointer" }}
                >
                    Xác nhận
                </button>
                <button 
                    onClick={() => toast.dismiss()} 
                    style={{ padding: "5px 10px", backgroundColor: "gray", color: "white", border: "none", cursor: "pointer" }}
                >
                    Hủy
                </button>
            </div>
        ), 
        { 
            position: "top-center",
            autoClose: false,
        } 
    };
    return (
        <div className="w-full flex flex-row gap-4 mt-4 h-full">
            <div className="relative h-full w-[10%]">
                <div className={` relative w-[90%] h-full  ${background} rounded-xl`}>
                    <div className="absolute bottom-0 left-1/2 w-full h-6 bg-white rounded-full -translate-x-1/2"></div>
                </div>
            </div>
            <div className="w-[90%] pb-1">
                <div className="flex flex-row justify-between w-[90%]">
                    <div className="font-semibold">
                        {children?.discountValue ? `Giảm ${children.discountValue}` : 'Giảm 99% (Default value)'}
                        {children?.discountType && (children.discountType === 'percentage' ? '%' : 'đ')}
                    </div>
                    <div className={`rounded-[10px]  text-xs ${background} w-[20%] flex items-center justify-center`}>
                        <p>{isExpired}</p>
                    </div>
                </div>
                <hr className="p-[0.5px] bg-gray-500 mt-1" />
                <div className="mt-2 text-xs flex flex-col font-normal">
                    <div className="mt-2">
                        {children?.description ? children.description : 'Giảm 99% từ đơn 1k (Default value)'}
                    </div>
                    <div className="mt-2">
                        {children?.usageLimit ? `Limit: ${children.usageLimit}` : 'Limit: 25 (Default value)'}
                    </div>
                    <div className="mt-2">
                        {children?.minOrderAmount
                            ? `Đơn hàng tối thiểu: ${children.minOrderAmount}VNĐ`
                            : 'Đơn hàng tối thiểu 100k(Default value)'}
                    </div>
                    <div className="mt-2">
                        {children?.endDate ? `HSD: ${children.endDate}` : 'HSD: 25/10/2023 (Default value)'}
                    </div>
                </div>
                <div className="flex flex-row justify-between items-center h-[13%] mt-5">
                    <button className="flex flex-row justify-evenly h-full w-[25%] rounded-lg font-semibold text-[11px] items-center bg-green-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth="1"
                            fill="none"
                            stroke="currentColor"
                            className="size-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                        Preview
                    </button>

                    <button className="flex flex-row justify-evenly h-full w-[25%] rounded-lg font-semibold text-[11px] items-center bg-yellow-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                        Update
                    </button>

                    <button
                        className="flex flex-row justify-evenly h-full w-[25%] rounded-lg font-semibold text-[11px] items-center bg-red-600"
                        onClick={() => handleDeleteVoucher(children)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-3"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                        </svg>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
export default VoucherCard;
