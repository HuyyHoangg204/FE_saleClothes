import { useEffect, useState } from 'react';
import { getTotalPriceInCart } from '../../redux/apiRequest';

function OrderDetail({ handleFeatOrder }) {
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await getTotalPriceInCart();

            setTotalPrice(res);
        };
        fetchData();
    }, []);

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
                    <div className="font-semibold">{totalPrice?.toLocaleString('vi-VN')}đ</div>
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
