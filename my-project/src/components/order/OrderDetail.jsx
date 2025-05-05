import { useEffect, useState } from 'react';
import { getTotalPriceInCart } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';

function OrderDetail({ handleFeatOrder, handleGetShippingFee, handleGetTotalAmount }) {
    const shippingFeeENV = parseInt(import.meta.VITE_SHIPPING_FEE);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingFee, setShippingFee] = useState(shippingFeeENV);
    const [cost, setCost] = useState(0);

    const productFromCart = useSelector((state) => state.cart?.getProductFromCart?.currentCart);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getTotalPriceInCart();
            setCost(res);

            if (res >= 500000) {
                setShippingFee(0);
            }

            handleGetTotalAmount(res); //Get totalAmout to Order.jsx
        };
        fetchData();
    }, [productFromCart]);
    useEffect(() => {
        handleGetShippingFee(shippingFee); // Get shippingFee to Order.jsx
    }, [shippingFee]);

    useEffect(() => {
        setTotalPrice(cost - shippingFee);
    }, [cost, shippingFee]);

    return (
        <div>
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
                    <div className="font-semibold">{cost?.toLocaleString('vi-VN')}đ</div>
                </div>
                <div className="text-base flex justify-between items-center mb-[25px]">
                    <div className="">Phí vận chuyển</div>
                    <div className="font-semibold">{shippingFee?.toLocaleString('vi-VN')}đ</div>
                </div>
                <div className="w-full h-[1px] bg-[#cdcdcd] mb-[25px]"></div>
                <div className="text-base font-semibold flex justify-between items-start mb-[40px]">
                    <div className="">
                        Tổng tiền thanh toán <br />
                        <div className="font-light text-[14px]">(Đã bao gồm thuế VAT)</div>
                    </div>
                    <div className="">{totalPrice?.toLocaleString('vi-VN')}đ</div>
                </div>
                <button
                    onClick={() => handleFeatOrder()}
                    className="btn bg-black text-[20px] text-white rounded-none w-full mb-[25px]"
                >
                    THANH TOÁN
                </button>
            </div>
        </div>
    );
}

export default OrderDetail;
