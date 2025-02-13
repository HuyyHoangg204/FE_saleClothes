import './ModalAddCart.css';
import { Fragment, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import {
    addProductToCartRedis,
    addProductToCart,
    getProductFromCart,
    getProductFromCartRedis,
} from '../../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function ModalAddCart({ showModalAddCard, chooseVariant, productId, toggleShowModalAddCard }) {
    const [token, setToken] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            setToken(accessToken);
        }
    }, []);

    // Danh sách tất cả các size có thể có
    const allSizes = ['S', 'M', 'L', 'XL', 'XXL'];

    const handleAddProductToCart = async (size) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                try {
                    const response = refreshtoken(accessToken);
                    const username = jwtDecode(response?.result?.token).sub;
                    await addProductToCart(username, productId, chooseVariant?.color_id, size, 1);
                    await getProductFromCart(dispatch, username);
                    toast.success('Thêm vào giỏ hàng thành công!');
                } catch (error) {
                    localStorage.removeItem('token');
                    toast.error('Vui lòng đăng nhập lại!');
                    navigate('/login');
                }
            } else {
                try {
                    const username = decodedToken.sub;
                    await addProductToCart(username, productId, chooseVariant?.color_id, size, 1);
                    await getProductFromCart(dispatch, username);
                    toast.success('Thêm vào giỏ hàng thành công!');
                } catch (error) {
                    console.log(error);
                    toast.error('Thêm vào giỏ hàng thất bại');
                }
            }
        } else {
            try {
                await addProductToCartRedis(productId, chooseVariant?.color_id, size, 1);
                await getProductFromCartRedis(dispatch);
                toast.success('Thêm vào giỏ hàng thành công!');
            } catch (error) {
                console.log(error);
                toast.error('Thêm vào giỏ hàng thất bại');
            }
        }
    };

    return (
        <div
            className={`z-5 w-[132px] bg-white absolute bottom-12 right-0 shadow-lg border ${
                showModalAddCard ? 'slide-up' : 'slide-down'
            }`}
        >
            <div className="flex flex-col w-full items-center justify-center font-sans">
                {allSizes.map((size) => {
                    // Kiểm tra xem size có tồn tại trong listSize hay không
                    const isSizeAvailable = chooseVariant?.size.includes(size);

                    return (
                        <button
                            key={size}
                            className={`w-full py-2 ${
                                isSizeAvailable
                                    ? 'hover:bg-slate-300' // Cho phép hover nếu size có sẵn
                                    : 'opacity-50 cursor-not-allowed' // Làm mờ và vô hiệu hóa hover nếu size không có sẵn
                            }`}
                            disabled={!isSizeAvailable} // Vô hiệu hóa nút nếu size không có sẵn
                            onClick={() => handleAddProductToCart(size)}
                        >
                            {size}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default ModalAddCart;
