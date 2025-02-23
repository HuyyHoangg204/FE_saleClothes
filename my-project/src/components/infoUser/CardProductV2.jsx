import { useEffect, useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import icons from '../../assets/icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import {
    addProductToCartRedis,
    addProductToCart,
    getProductFromCart,
    getProductFromCartRedis,
} from '../../redux/apiRequest';

function CardProductV2({ product }) {
    const [chooseVariant, setChooseVariant] = useState(product.variants[0]);
    const [selectedSize, setSelectedSize] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        setChooseVariant(product.variants[0]);
    }, [product]);

    //Handle add product to cart
    const handleAddCart = async () => {
        if (selectedSize == null) {
            toast.warn('Vui lòng chọn 1 size!');
        } else {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                if (decodedToken.exp * 1000 <= Date.now()) {
                    try {
                        const response = refreshtoken(accessToken);
                        const username = jwtDecode(response?.result?.token).sub;
                        await addProductToCart(username, product.productId, chooseVariant?.color_id, selectedSize, 1);
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
                        await addProductToCart(username, product.productId, chooseVariant?.color_id, selectedSize, 1);
                        await getProductFromCart(dispatch, username);
                        toast.success('Thêm vào giỏ hàng thành công!');
                    } catch (error) {
                        console.log(error);
                        toast.error('Thêm vào giỏ hàng thất bại');
                    }
                }
            } else {
                try {
                    await addProductToCartRedis(product.productId, chooseVariant?.color_id, selectedSize, 1);
                    await getProductFromCartRedis(dispatch);
                    toast.success('Thêm vào giỏ hàng thành công!');
                } catch (error) {
                    console.log(error);
                    toast.error('Thêm vào giỏ hàng thất bại');
                }
            }
        }
    };
    // Danh sách các size
    const sizes = ['S', 'M', 'L', 'XL', '2XL'];

    const handleNavigateDetailProduct = () => {
        navigate(`/product/${product?.productId }-${product?.name}`);
    };
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleSelectColor = (variant) => {
        setChooseVariant(variant);
    };
    useEffect(() => {
        console.log(chooseVariant?.imageUrl[0]);
    }, []);
    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="relative">
                <img
                    src={chooseVariant?.imageUrl[0]}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-md cursor-pointer"
                    onClick={handleNavigateDetailProduct}
                />
                <button className="absolute top-2 right-2 text-gray-700 hover:text-red-500">
                    <FaHeart />
                </button>
            </div>
            <div className="mt-4">
                {/* Color */}
                <div className="flex items-center space-x-2">
                    {product?.variants?.map((variant, index) => (
                        <div
                            key={index}
                            className={`w-4 h-4 rounded-full relative cursor-pointer`}
                            style={{ backgroundColor: variant.colorCode }}
                            onClick={() => handleSelectColor(variant)}
                        >
                            {chooseVariant === variant && (
                                <img src={icons.iconDone} alt="done" className="absolute inset-0 w-full h-full" />
                            )}
                        </div>
                    ))}
                </div>
                {/* Size */}
                <div className="mt-2 flex items-center space-x-2">
                    {sizes.map((size) => {
                        const isAvailable = chooseVariant?.size?.includes(size);
                        return (
                            <div
                                key={size}
                                className={`w-10 h-8 flex justify-center items-center border
                                        ${isAvailable ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} 
                                        ${
                                            isAvailable
                                                ? selectedSize === size
                                                    ? 'bg-black text-white hover:bg-white hover:text-black'
                                                    : 'bg-white text-black hover:bg-black hover:text-white'
                                                : 'bg-gray-200 text-gray-400 hover:bg-gray-200' // Không đổi màu khi hover
                                        }`}
                                onClick={() => isAvailable && handleSizeSelect(size)} // Chỉ gọi hàm nếu size có sẵn
                            >
                                <span>{size}</span>
                            </div>
                        );
                    })}
                </div>
                <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                <p className="text-gray-900 font-bold">{product.basePrice.toLocaleString('vi-VN')}đ</p>
            </div>
            <button
                onClick={handleAddCart}
                className="mt-4 w-full flex items-center justify-center space-x-2 bg-black text-white py-2 rounded hover:bg-gray-800"
            >
                <FaShoppingCart />
                <span>Thêm vào giỏ hàng</span>
            </button>
        </div>
    );
}

export default CardProductV2;
