import React, { useState } from 'react';
import VoucherCard from './VoucherCard';
import { useDispatch } from 'react-redux';
import { addVoucher, createVoucher } from '../../redux/voucherSlice';
import { toast } from 'react-toastify';
const AddVoucher = ({ ren }) => {
    const dispatch = useDispatch()
    
    const [voucher, setVoucher] = useState({
        description: '',
        discountType: 'percentage',
        discountValue: null,
        endDate: null,
        startDate: null,
        usageLimit: null,
        minOrderAmount: null,
    });
    const handleAddVoucher = () => {
        for(let key in voucher){
            if(voucher[key] === null || voucher[key] === ''){
                toast.error("Có vẻ bạn đã thiếu dữ liệu rồi kìa!!")
                return
            }
        }
        
        dispatch(createVoucher(voucher))
        toast.success()
    }
    return (
        <div className="fixed flex flex-col overflow-y-scroll h-full w-full">
            <div className="bg-primary-600 h-[60px] flex lg: items-center rounded-[10px] m-1">
                <h1 className="text-white font-semibold font-sans text-xl p-6">Add new voucher</h1>
            </div>
            <div className="m-5 px-10 font-semibold">
                <div>
                    Thông tin cơ bản
                    <hr className="p-[0.5px] bg-gray-500 mt-1" />
                </div>
                <div className="flex flex-row justify-between">
                    <div className="mt-5 w-[35%]">
                        <div className="w-full">
                            <h4 className="font-medium">Mô tả voucher *</h4>
                            <input
                                className="rounded-[7px] mt-4 h-8 text-nowrap w-full font-normal"
                                type="text"
                                value={voucher?.description || ""}
                                onChange={(e) => {
                                    setVoucher((prev) => ({ ...prev, description: e.target.value }));
                                }}
                                placeholder="Nhập tên mô tả voucher"
                            />
                        </div>
                        <div className="flex flex-row mt-5 justify-between font-medium text-[13px] text-nowrap gap-9 w-full">
                            <div>
                                <h4>Loại giảm giá*</h4>
                                <select
                                    className="rounded-[7px] mt-4 h-8 text-nowrap w-full font-normal p-2 text-xs"
                                    value={voucher?.discountType}
                                    onChange={(e) => setVoucher((prev) => ({...prev, discountType: e.target.value}))}
                                >
                                    <option value="percentage">Phần trăm(%)</option>
                                    <option value="fixed_amount">theo VNĐ</option>
                                </select>
                            </div>
                            <div>
                                <h4>Giá trị *</h4>
                                <input
                                    className="rounded-[7px] mt-4 h-8 text-nowrap w-full font-extralight text-xs p-3"
                                    type="text"
                                    placeholder="Ex: 20"
                                    value={voucher.discountValue || ""}
                                    onChange={(e) => {
                                        setVoucher((prev) => ({ ...prev, discountValue: e.target.value }));
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[45%] mt-5 font-medium mr-2">
                        <h3>Xem trước voucher</h3>
                        <VoucherCard />
                    </div>
                </div>
                <div className="mt-7">
                    Thời gian hiệu lực
                    <hr className="p-[0.5px] mt-1  bg-gray-500 " />
                </div>
                <div className="flex flex-row justify-between w-full mt-5 font-medium">
                    <div className="w-[40%]">
                        <div>Ngày bắt đầu *</div>
                        <input
                            type="date"
                            className="w-full mt-3 font-normal"
                            value={voucher.startDate || ""}
                            onChange={(e) => {
                                setVoucher((prev) => ({ ...prev, startDate: e.target.value }));
                            }}
                        />
                    </div>
                    <div className="w-[40%]">
                        <div>Ngày kết thúc *</div>
                        <input
                            type="date"
                            className="w-full mt-3 font-normal"
                            value={voucher.endDate || ""}
                            onChange={(e) => {
                                setVoucher((prev) => ({ ...prev, endDate: e.target.value }));
                            }}
                        />
                    </div>
                </div>
                <div className="mt-7">
                    Điều kiện sử dụng
                    <hr className="p-[0.5px] mt-1  bg-gray-500 " />
                </div>
                <div className="flex flex-row mt-4 justify-between w-full">
                    <div className="w-[40%]">
                        <div className="font-medium">Đơn hàng tối thiểu</div>
                        <input
                            className="rounded-[7px] mt-4 h-8 text-nowrap w-full font-normal"
                            type="text"
                            placeholder="Ex: 200.000đ"
                            value={voucher.minOrderAmount || ""}
                            onChange={(e) => {
                                setVoucher((prev) => ({ ...prev, minOrderAmount: e.target.value }));
                            }}
                        />
                    </div>
                    <div className="w-[40%]">
                        <div className="font-medium">Số lượng phát hành</div>
                        <input
                            className="rounded-[7px] mt-4 h-8 text-nowrap w-full font-normal"
                            type="text"
                            placeholder="Ex: 10"
                            value={voucher.usageLimit || ""}
                            onChange={(e) => {
                                setVoucher((prev) => ({ ...prev, usageLimit: e.target.value }));
                            }}
                        />
                    </div>
                </div>
                <div className="flex flex-row w-full mt-7 ">
                    <div className="w-[50%]"></div>
                    <div className="flex flex-row justify-evenly w-full">
                        <button 
                            className="px-4 py-2 w-[35%] bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                            onClick={handleAddVoucher}
                        >
                            Add voucher
                        </button>
                        <button
                            onClick={ren}
                            className="px-4 py-2 w-[35%] bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-400 hover:text-gray-700 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddVoucher;
