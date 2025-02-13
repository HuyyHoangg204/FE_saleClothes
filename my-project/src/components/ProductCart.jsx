import { useState, useEffect } from 'react';
import icons from '../assets/icons';
import {
    addProductToCart,
    addProductToCartRedis,
    deleteProductInCart,
    deleteProductInCartAfterlogin,
    getProductFromCart,
    getProductFromCartRedis,
    getProductInCart,
} from '../redux/apiRequest';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProductCart({ item, handleTotalPrice, handleRemovePrice }) {
    const key = item[0].split('_');
    const [priceTemp, setPriceTemp] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        productName: '',
        price: 0,
        colorName: '',
        imageUrl: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProductInCart(key[0], key[2]);
            const price = result?.result.base_price;
            const quantity = item[1];
            setPriceTemp(price);

            setProductData({
                productName: result.result.name,
                price: price,
                colorName: result.result.colorName,
                imageUrl: result.result.variants.imageUrl,
            });

            handleTotalPrice(price * quantity);
        };

        fetchData();
    }, []); // useEffect chỉ chạy 1 lần khi component mount

    // handle delete product in cart
    const handleDeleteProductInCart = async () => {
    
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                try {
                    const response = refreshtoken(accessToken);
                    const username = jwtDecode(response?.result?.token).sub;
                    await deleteProductInCartAfterlogin(username,key[0],key[2], key[1])
                    await getProductFromCart(dispatch, username);
                    handleRemovePrice(priceTemp);
                } catch (error) {
                    localStorage.removeItem('token');
                    toast.error('Vui lòng đăng nhập lại!');
                    navigate('/login');
                }
            }
            const username = decodedToken.sub;
            await deleteProductInCartAfterlogin(username,key[0],key[2], key[1])
            await getProductFromCart(dispatch, username);
            handleRemovePrice(priceTemp);
        } else {
            const keys = item[0].split('_');
            await deleteProductInCart(keys[0], keys[1], keys[2]);
            await getProductFromCartRedis(dispatch);
            handleRemovePrice(priceTemp);
        }
    };

    // handle add 1 product in cart
    const handleAddProductToCart = async () => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                try {
                    const response = refreshtoken(accessToken);
                    const username = jwtDecode(response?.result?.token).sub;
                    await addProductToCart(username, key[0], key[2], key[1], 1);
                    await getProductFromCart(dispatch, username);
                    handleTotalPrice(priceTemp);
                } catch (error) {
                    localStorage.removeItem('token');
                    toast.error('Vui lòng đăng nhập lại!');
                    navigate('/login');
                }
            }
            const username = decodedToken.sub;
            await addProductToCart(username, key[0], key[2], key[1], 1);
            await getProductFromCart(dispatch, username);
            handleTotalPrice(priceTemp);
        } else {
            const keys = item[0].split('_');
            await addProductToCartRedis(keys[0], keys[2], keys[1], 1);
            await getProductFromCartRedis(dispatch);
            handleTotalPrice(priceTemp);
        }
    };

    return (
        <div>
            <div className="w-full h-[1px] bg-black bg-opacity-20 my-6"></div>
            <div className="flex">
                <div>
                    <img className="w-[72px] h-[96px]" src={productData.imageUrl[0]} alt="" />
                </div>
                <div className="flex flex-col justify-between w-full ml-6">
                    <div>
                        <div className="flex justify-between w-full items-center font-sans font-medium text-[18px]">
                            <span>{productData.productName}</span>
                            <img src={icons.iconMore} alt="" />
                        </div>
                        <div className="space-x-3">
                            <span className="font-light font-sans text-[16px]">
                                Màu sắc:
                                <span className="font-normal font-sans text-[16px] ml-1">{productData.colorName}</span>
                            </span>
                            <span className="font-light font-sans text-[16px]">
                                Size:
                                <span className="font-normal font-sans text-[16px] ml-1">{key[1]}</span>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-sans font-medium text-[18px]">
                            {productData.price.toLocaleString('vi-VN')}đ
                        </span>
                        <div className="flex items-center">
                            <div
                                onClick={handleDeleteProductInCart}
                                className="flex items-center justify-center border w-[32px] h-[32px] cursor-pointer"
                            >
                                <img src={icons.iconRemove} alt="" />
                            </div>
                            <div className="flex items-center justify-center border w-[32px] h-[32px]">{item[1]}</div>
                            <div
                                onClick={handleAddProductToCart}
                                className="flex items-center justify-center border w-[32px] h-[32px] cursor-pointer"
                            >
                                <img src={icons.iconAdd} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;
