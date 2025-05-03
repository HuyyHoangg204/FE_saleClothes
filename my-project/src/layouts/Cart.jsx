import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icons from '../assets/icons';
import '../css/Cart.css';
import ProductCart from '../components/ProductCart';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Cart({ toggleHideCart }) {
    const [isClosing, setIsClosing] = useState(false); // Trạng thái cho hiệu ứng đóng
    const [quantityProduct, setQuantityProduct] = useState(0);
    const [items, setItem] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        let guestCartId = localStorage.getItem('guestCartId');

        if (!guestCartId) {
            guestCartId = `guest_${Date.now()}`;
            localStorage.setItem('guestCartId', guestCartId);
        }
    }, []);
    const productFromCart = useSelector((state) => state.cart?.getProductFromCart?.currentCart);

    useEffect(() => {
        console.log(productFromCart);

        if (!productFromCart?.result) {
            setQuantityProduct(0); // Nếu không có dữ liệu, đặt quantity về 0
            return;
        }

        const quantity = Object.values(productFromCart?.result).reduce((acc, value) => acc + value, 0);
        setQuantityProduct(quantity);
        setItem(Object.entries(productFromCart.result));
    }, [productFromCart]);

    const handleCloseCart = () => {
        setIsClosing(true); // Bắt đầu hiệu ứng đóng
        setTimeout(() => {
            toggleHideCart(); // Sau khi hiệu ứng hoàn thành, gọi hàm để ẩn giỏ hàng
        }, 300); // Thời gian chờ nên tương ứng với thời gian hiệu ứng CSS
    };

    const handleTotalPrice = (price) => {
        setTotalPrice(prevTotal => prevTotal + price);
    };

    const handleRemovePrice = (price) => {
        setTotalPrice(prevTotal => prevTotal - price)
    }

    // Handle click event payment
    const handleClickPayment = () => {
        if(items?.length <= 0) {
            toast.warn("Chưa có sản phẩm nào trong giỏ hàng!!");
        } else {
            navigate("/order")
        }
        
    }

    return (
        <div className="fixed inset-0 flex justify-end z-10 w-full h-full bg-black bg-opacity-50">
            <div
                className={`z-11 w-[480px] h-full bg-white flex flex-col justify-between pb-4 cart-container animate-cart ${
                    isClosing ? 'cart-hide' : 'animate-cart'
                }`}
            >
                <div className="px-6 pb-4">
                    <div className="flex justify-between mt-6 font-sans font-bold text-lg ">
                        <span>Giỏ hàng ({quantityProduct})</span>
                        <img
                            onClick={handleCloseCart}
                            className="w-[24px] h-[24px] cursor-pointer"
                            src={icons.iconClose}
                            alt=""
                        />
                    </div>
                    <div className="font-light font-sans mt-2">
                        Hãy gọi cho Hoàng đẹp trai để có được những ưu đãi ❤️
                    </div>
                </div>

                {/* Product in cart */}
                <div className={`max-h-[480px] overflow-y-auto pl-6 ${items <= 3 ? 'pr-6' : ''} `}>
                    {items?.map((item, index) => (
                        <ProductCart key={index} item={item} handleTotalPrice={handleTotalPrice} handleRemovePrice = {handleRemovePrice} />
                    ))}
                </div>

                {/* Payment modal */}

                <div className="px-6 space-y-2">
                    <div className="flex items-center justify-end">
                        <span className="font-sans font-light text-[18px]">
                            Tạm tính:
                            <span className="font-sans font-semibold text-[18px] ml-1">{totalPrice.toLocaleString('vi-VN')}đ</span>
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full h-[58px]">
                            <button onClick={handleClickPayment} className="w-full h-[58px] bg-black text-white text-center">THANH TOÁN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
