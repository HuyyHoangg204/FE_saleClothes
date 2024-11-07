import React from 'react';
import { useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import MainHeader from '../../partials/MainHeader/MainHeader.jsx';
import Footer from '../../partials/Footer/Footer.jsx';


function Order() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (

        <div className="w-[100%] bg-[#f5f5f5]">
            {/* Header */}
            <MainHeader />
            <div className="h-24"></div>

            {/* Progress bar */}
            <div className="flex items-center justify-center mt-[50px] mb-[70px]">
                <div className="w-[20px] h-[20px] rounded-full bg-black relative">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Giỏ hàng</div>
                </div>
                <div className="w-[200px] h-[4px] bg-black"></div>
                <div className="w-[20px] h-[20px] rounded-full bg-black relative">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Đặt hàng</div>
                </div>
                <div className="w-[200px] h-[4px] bg-[#d8d8d8]"></div>
                <div className="w-[20px] h-[20px] rounded-full relative bg-[#f2f0f0] border border-[#cdcdcd]">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Hoàn tất</div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full flex justify-between px-[105px]">
                {/* Content */}
                <div className="w-full flex justify-between px-[105px]">
                    {/* left */}
                    <div className="flex-1 mr-[34px]">
                        {/* delivery information */}
                        <div className="bg-white w-full p-[19px] mb-[34px]">
                            <div className="flex justify-between items-center mb-[25px]">
                                <div className="flex items-center">
                                    <div className="w-[40px] object-cover text-center mr-2">
                                        <img src={icon.iconAddress} alt="" />
                                    </div>
                                    <div className="text-lg font-semibold">Thông tin giao hàng</div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-[40px] object-cover text-center mr-2">
                                        <img src={icon.iconBookAndPencil} alt="" />
                                    </div>
                                    <div className="text-lg font-semibold">Thay đổi</div>
                                </div>
                            </div>

                            {/* form input */}
                            <form action="">
                                <div className="mb-[25px]">
                                    <label htmlFor="name" className="mb-[10px] text-base">
                                        Họ tên
                                    </label>
                                    <input type="text" name="name" id="name" className="w-full h-[38px]" />
                                </div>
                                <div className="mb-[25px]">
                                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="number"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        className="w-full h-[38px]"
                                    />
                                </div>
                                <div className="mb-[25px]">
                                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                                        Tỉnh/thành phố
                                    </label>
                                    <select name="" id="" className="w-full h-[38px]">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div className="mb-[25px]">
                                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                                        Quận/Huyện
                                    </label>
                                    <select name="" id="" className="w-full h-[38px]">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div className="mb-[25px]">
                                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                                        Phường/Xã
                                    </label>
                                    <select name="" id="" className="w-full h-[38px]">
                                        <option value=""></option>
                                    </select>
                                </div>
                                <div className="mb-[25px]">
                                    <label htmlFor="detailAdress" className="mb-[10px] text-base">
                                        Nhập địa chỉ
                                    </label>
                                    <input
                                        type="text"
                                        name="detailAdress"
                                        id="detailAdress"
                                        className="w-full h-[38px]"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Delivery method */}
                        <div className="bg-white w-full p-[19px] mb-[34px]">
                            <div className="flex items-center mb-[37px]">
                                <div className="w-[40px] object-cover flex justify-center mr-2">
                                    <img src={icon.iconTranSit} alt="" className="w-[30px] h-[20px] object-cover" />
                                </div>
                                <div className="text-lg font-semibold">Phương thức giao hàng</div>
                            </div>

                            {/* form input */}
                            <form action="" className="flex">
                                <div className="flex">
                                    <label className="inline-flex">
                                        <input
                                            type="radio"
                                            name="delivery_method"
                                            value="fast"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mt-[5px] mr-1 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="">
                                            <div className="text-base font-semibold">Chuyển phát nhanh</div>
                                            <div className="text-[13px]">
                                                Thời gian giao hàng dự kiến: Thứ 4, 06/11/2024
                                            </div>
                                        </div>
                                    </label>
                                    <label className="inline-flex ml-5">
                                        <input
                                            type="radio"
                                            name="delivery_method"
                                            value="express"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mt-[5px] mr-1 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="">
                                            <div className="text-base font-semibold">Giao hàng hỏa tốc</div>
                                            <div className="text-[13px]">
                                                Thời gian giao hàng dự kiến: Thứ 4, 06/11/2024
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* Payment method */}
                        <div className="bg-white w-full p-[19px] mb-[34px]">
                            <div className="flex items-center mb-1">
                                <div className="w-[40px] object-cover text-center mr-2">
                                    <img src={icon.iconPay} alt="" />
                                </div>
                                <div className="text-lg font-semibold">Phương thức thanh toán</div>
                            </div>
                            <div className="text-[14px] mb-5">
                                Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giỡ được
                                dữ lại.
                            </div>

                            {/* form input */}
                            <form action="">
                                <div className="flex flex-col">
                                    <label className="inline-flex items-center mb-5">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="delivery-by-cash"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="text-base">Thanh toán khi nhận hàng</div>
                                    </label>
                                    <label className="inline-flex items-center mb-5">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="delivery-by-momo"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="text-base">Thanh toán bằng Momo</div>
                                    </label>
                                    <label className="inline-flex items-center mb-5">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="delivery-by-atm"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="text-base">Thanh toán bằng ATM</div>
                                    </label>
                                    <label className="inline-flex items-center mb-5">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="delivery-by-credit-card"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="text-base">Thanh toán bằng thẻ tín dụng</div>
                                    </label>
                                    <label className="inline-flex items-center mb-5">
                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="delivery-by-vnpay"
                                            className="hidden peer focus:outline-none"
                                            onChange={handleChange}
                                        />
                                        <span className="flex items-center justify-center w-4 h-4 mr-2 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                                            <img src={icon.iconDone} alt="" />
                                        </span>
                                        <div className="text-base">Thanh toán bằng ví VNPAY</div>
                                    </label>
                                </div>
                            </form>
                        </div>

                        {/* Product list */}
                        <div className="bg-white w-full p-[19px] mb-[34px]">
                            <div className="flex items-center mb-6">
                                <div className="w-[40px] object-cover text-center mr-2">
                                    <img src={icon.iconBasket} alt="" />
                                </div>
                                <div className="text-lg font-semibold">Sản phẩm (6)</div>
                            </div>

                            {/* list */}
                            <div className="p-[10px] mb-[45px]">
                                {/* item */}
                                <div className="flex py-3">
                                    <div className="w-[72px] h-[96px]">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="http://localhost:5173/images/maunu1.webp"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 ml-5">
                                        <div className="w-full flex justify-between">
                                            <div className="text-[18px]">Áo khoác gió</div>
                                            <div className="text-base font-semibold">499.000đ</div>
                                            <div className="text-base">Số lượng: 1</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-[16px] h-[16px] rounded-full bg-red-500"></div>
                                            <div className="bulk w-[1px] h-[16px] bg-[#cdcdcd] mx-2"></div>
                                            <div className="size">XL</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex border-t border-[#cdcdcd] py-3">
                                    <div className="w-[72px] h-[96px]">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="http://localhost:5173/images/maunu1.webp"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 ml-5">
                                        <div className="w-full flex justify-between">
                                            <div className="text-[18px]">Áo khoác gió</div>
                                            <div className="text-base font-semibold">499.000đ</div>
                                            <div className="text-base">Số lượng: 1</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-[16px] h-[16px] rounded-full bg-red-500"></div>
                                            <div className="bulk w-[1px] h-[16px] bg-[#cdcdcd] mx-2"></div>
                                            <div className="size">XL</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex border-t border-[#cdcdcd] py-3">
                                    <div className="w-[72px] h-[96px]">
                                        <img
                                            className="w-full h-full object-cover"
                                            src="http://localhost:5173/images/maunu1.webp"
                                            alt=""
                                        />
                                    </div>
                                    <div className="flex-1 ml-5">
                                        <div className="w-full flex justify-between">
                                            <div className="text-[18px]">Áo khoác gió</div>
                                            <div className="text-base font-semibold">499.000đ</div>
                                            <div className="text-base">Số lượng: 1</div>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-[16px] h-[16px] rounded-full bg-red-500"></div>
                                            <div className="bulk w-[1px] h-[16px] bg-[#cdcdcd] mx-2"></div>
                                            <div className="size">XL</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* btn */}
                            <div className="w-full text-center mb-10">
                                <div className="btn bg-black text-white rounded-none px-10">TIẾP TỤC MUA SẮM</div>
                            </div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="w-[390px]">
                        {/* coupon code */}
                        <div className="bg-white w-full h-[78px] p-[25px] mb-5 flex justify-between items-center">
                            <div className="font-semibold text-[18px]">Mã ưu đãi</div>
                            <select name="" id="" className="border-none text-[14px] outline-none">
                                <option value="">Chọn hoặc nhập mã</option>
                            </select>
                        </div>

                        {/* Order details */}
                        <div className="bg-white w-full p-[25px]">
                            <div className="text-[18px] font-semibold mb-[20px]">Chi tiết đơn hàng</div>
                            <div className="text-base flex justify-between items-center mb-[20px]">
                                <div className="">Giá trị đơn hàng</div>
                                <div className="font-semibold">1.700.000đ</div>
                            </div>
                            <div className="text-base flex justify-between items-center mb-[25px]">
                                <div className="">Phí vận chuyển</div>
                                <div className="font-semibold">0đ</div>
                            </div>
                            <div className="w-full h-[1px] bg-[#cdcdcd] mb-[25px]"></div>
                            <div className="text-base font-semibold flex justify-between items-start mb-[40px]">
                                <div className="">
                                    Tổng tiền thanh toán <br />
                                    <div className="font-light text-[14px]">(Đã bao gồm thuế VAT)</div>
                                </div>
                                <div className="">0đ</div>
                            </div>
                            <button className="btn bg-black text-[20px] text-white rounded-none w-full mb-[25px]">
                                THANH TOÁN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Order;
