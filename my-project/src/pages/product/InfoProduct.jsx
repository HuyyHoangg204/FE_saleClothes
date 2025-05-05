import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { jwtDecode } from 'jwt-decode';

import StarIcon from '@mui/icons-material/Star';
import 'swiper/css';
import icons from '../../assets/icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveIcon from '@mui/icons-material/Remove';

import InfoSizeModal from '~/modal/InfoSizeModal/InfoSizeModal.jsx';
import '~/css/sortProduct.css';
import {
    getColorById,
    addProductToCartRedis,
    addProductToCart,
    getProductFromCart,
    getProductFromCartRedis,
    refreshToken,
    addProductToFavoritesProduct,
    getAllProductsFavoriteByUsername,
} from '../../redux/apiRequest';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FadeInSection from '../../components/motion/FadeInSection';

function InfoProduct({ dataProduct }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Lưu chỉ số ảnh đã chọn
    const [chooseVariant, setChooseVariant] = useState(dataProduct.variants[0]);
    const [dataColor, setDataColor] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [openModalSize, setOpenModalSize] = useState(false);

    const [fade, setFade] = useState(false); // Trạng thái để điều khiển hiệu ứng fade
    const [showDescription, setShowDescription] = useState(false);
    const [showMaterial, setShowMaterial] = useState(false);
    const [showIntruction, setShowIntruction] = useState(false);
    const [loading, setLoading] = useState(true); // ✅ Thêm trạng thái loading

    const dispatch = useDispatch();

    const favoriteProduct = useSelector((state) => state?.product?.getAllFavoriteProduct?.currentAllProduct);

    //Select variant first when component mount
    useEffect(() => {
        if (dataProduct && dataProduct.variants && dataProduct.variants.length > 0) {
            setChooseVariant(dataProduct.variants[0]);
            setLoading(false); // ✅ Khi có dữ liệu, tắt loading
            const fetchColor = async () => {
                try {
                    const result = await getColorById(chooseVariant?.color_id);
                    setDataColor(result?.result);
                } catch (error) {
                    console.error('Lỗi khi lấy màu:', error);
                }
            };
            setSelectedColor(chooseVariant?.color_id);
            fetchColor();
        }
    }, [dataProduct]);

    useEffect(() => {
        const fetchColor = async () => {
            try {
                const result = await getColorById(chooseVariant?.color_id);
                setDataColor(result?.result);
            } catch (error) {
                console.error('Lỗi khi lấy màu:', error);
            }
        };
        setSelectedColor(chooseVariant?.color_id);
        fetchColor();
    }, [chooseVariant]);

    // Handle add product to cart
    const handleAddProductToCart = async (size) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                try {
                    const response = refreshtoken(accessToken);
                    const username = jwtDecode(response?.result?.token).sub;
                    if (selectedSize === null) {
                        toast.warning('Vui lòng chọn size!');
                    } else {
                        await addProductToCart(
                            username,
                            dataProduct?.product_id,
                            chooseVariant?.color_id,
                            selectedSize,
                            1,
                        );
                        await getProductFromCart(dispatch, username);
                        toast.success('Thêm vào giỏ hàng thành công!');
                    }
                } catch (error) {
                    localStorage.removeItem('token');
                    toast.error('Vui lòng đăng nhập lại!');
                    navigate('/login');
                }
            } else {
                try {
                    const username = decodedToken.sub;
                    if (selectedSize === null) {
                        toast.warning('Vui lòng chọn size!');
                    } else {
                        await addProductToCart(
                            username,
                            dataProduct?.product_id,
                            chooseVariant?.color_id,
                            selectedSize,
                            1,
                        );
                        await getProductFromCart(dispatch, username);
                        toast.success('Thêm vào giỏ hàng thành công!');
                    }
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

    // Handler khi chọn màu
    const handleColorSelect = (colorId, variant) => {
        setChooseVariant(variant);
        setSelectedColor(colorId);
    };

    // Danh sách các size
    const sizes = ['S', 'M', 'L', 'XL', '2XL'];

    // Handler khi click chọn size
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    // Handler click open modal size
    const handleOpenModalSize = () => {
        setOpenModalSize(true);
    };
    // Handler click close modal size
    const handleCloseModalSize = () => {
        setOpenModalSize(false);
    };

    //Handle favorite product
    const handleClickFavoriteProduct = async () => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                try {
                    const response = refreshToken(accessToken);
                    const username = jwtDecode(response?.result?.token).sub;
                    const message = await addProductToFavoritesProduct(username, dataProduct?.product_id);
                    await getAllProductsFavoriteByUsername(username, dispatch);
                    toast.success(message);
                } catch (error) {
                    localStorage.removeItem('token');
                    toast.error('Bạn cần đăng nhập để dùng được chức năng này!');
                }
            } else {
                try {
                    const username = decodedToken.sub;
                    const message = await addProductToFavoritesProduct(username, dataProduct?.product_id);
                    await getAllProductsFavoriteByUsername(username, dispatch);
                    toast.success(message);
                } catch (error) {
                    console.log(error);
                    toast.error('Thêm sản phẩm vào danh sách thất bại thất bại');
                }
            }
        } else {
            toast.error('Bạn cần đăng nhập để dùng được chức năng này!');
        }
    };

    const toggleShowDescription = () => {
        setShowDescription(!showDescription);
    };
    const toggleShowMaterial = () => {
        setShowMaterial(!showMaterial);
    };
    const toggleShowIntruction = () => {
        setShowIntruction(!showIntruction);
    };

    const items = chooseVariant?.imageUrl;
    const swiperRef = useRef(null);

    const handleImageClick = (index) => {
        setFade(true); // Bắt đầu hiệu ứng fade

        setTimeout(() => {
            setSelectedImageIndex(index); // Cập nhật chỉ số ảnh đã chọn
            setFade(false); // Kết thúc hiệu ứng fade
        }, 200); // Thời gian trễ để đồng bộ với thời gian chuyển tiếp

        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            const totalSlides = items.length;

            // Nếu ảnh được chọn là ảnh cuối cùng, di chuyển về ảnh đầu tiên
            if (index === totalSlides - 1) {
                swiper.slideTo(0); // Quay lại ảnh đầu tiên
            } else {
                swiper.slideTo(index); // Di chuyển đến ảnh đã chọn
            }
        }
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div className="w-full flex mt-6 space-x-16">
            <div className="flex space-x-6">
                <div className="w-[530px] h-[794px] overflow-hidden">
                    {/* Cập nhật ảnh chính khi chọn */}
                    <img
                        className={`w-full h-full object-cover transition-opacity duration-200 ease-in-out ${
                            fade ? 'opacity-0' : 'opacity-100'
                        }`}
                        src={items[selectedImageIndex]}
                        alt="Selected"
                    />
                </div>
                <div className="relative w-[100px] flex items-center">
                    {/* Slide images */}
                    <Swiper
                        ref={swiperRef}
                        style={{ height: '700px' }}
                        direction="vertical"
                        slidesPerView={4}
                        spaceBetween={4} // Khoảng cách giữa các slide
                        loop={true}
                    >
                        {items.map((src, index) => (
                            <SwiperSlide key={index} onClick={() => handleImageClick(index)}>
                                <div
                                    className={`w-[100px] h-[150px] cursor-pointer ${
                                        selectedImageIndex === index ? 'border-2 border-blue-500' : ''
                                    }`}
                                >
                                    <img className="w-full h-full" src={src} alt="" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
            {/* info product */}
            <div className="flex flex-col w-full">
                <FadeInSection>
                    <h2 className="font-sans font-semibold text-[26px]">{dataProduct?.name}</h2>
                    <div className="flex items-center ">
                        <span className="font-sans font-light text-[14px] mr-10">Mã sp: 3IT24W001</span>
                        <div className="flex items-center">
                            <StarIcon sx={{ color: '#FFD700' }} />
                            <StarIcon sx={{ color: '#FFD700' }} />
                            <StarIcon sx={{ color: '#FFD700' }} />
                            <StarIcon sx={{ color: '#FFD700' }} />
                            <StarIcon color="disabled" />
                            <span className="font-sans font-light text-[14px] ml-1">(9 lượt đánh giá)</span>
                        </div>
                    </div>
                </FadeInSection>
                {/* price */}
                <FadeInSection delay={0.1}>
                    <div className="my-6">
                        <span className="font-sans font-semibold text-[24px]">
                            {dataProduct?.base_price?.toLocaleString('vi-VN')}đ
                        </span>
                        <div className="flex space-x-6 items-center">
                            <span className="font-sans font-light text-[18px] relative w-auto">
                                {dataProduct?.oldPrice?.toLocaleString('vi-VN')}đ
                                <div className="h-[1px] bg-black absolute w-full top-1/2"></div>
                            </span>
                            <span className="w-auto p-1 bg-red-700 text-white font-sans font-medium text-[14px]">
                                -{dataProduct?.discount_percentage}%
                            </span>
                        </div>
                    </div>
                </FadeInSection>
                {/* color */}
                <FadeInSection delay={0.1}>
                    <div>
                        <span className="font-sans font-semibold text-[20px]">Màu sắc: {dataColor?.colorName} </span>
                        <div className="flex space-x-4 mt-2">
                            {dataProduct?.variants.map((variant, index) => (
                                <div
                                    key={index}
                                    className={`bg-white w-[30px] h-[30px] border flex justify-center items-center cursor-pointer 
                                ${selectedColor === variant.color_id ? 'border-black' : ''}`}
                                    onClick={() => handleColorSelect(variant.color_id, variant)}
                                >
                                    <div className="relative">
                                        <div
                                            className="w-[20px] h-[20px] rounded-full"
                                            style={{ backgroundColor: variant.colorCode }}
                                        ></div>
                                        {selectedColor === variant.color_id && (
                                            <img
                                                src={icons.iconDone}
                                                alt="done"
                                                className="absolute inset-0 w-full h-full"
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeInSection>
                {/* Size */}
                <FadeInSection delay={0.2}>
                    <div className="mt-8">
                        <div className="flex justify-between items-center">
                            <span className="font-sans font-semibold text-[20px]">Size:</span>
                            <div onClick={handleOpenModalSize} className="flex space-x-1 items-center cursor-pointer">
                                <img src={icons.iconRuler} alt="" />
                                <span className="underline">Gợi ý tìm size</span>
                            </div>
                        </div>
                        <div className="flex space-x-4 mt-3">
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
                        {openModalSize && <InfoSizeModal handleCloseModalSize={handleCloseModalSize} />}
                    </div>
                </FadeInSection>
                <FadeInSection delay={0.2}>
                    <div className="mt-8 flex flex-col">
                        <div className="flex space-x-10">
                            <button
                                onClick={handleAddProductToCart}
                                className="flex justify-center items-center border border-black bg-black text-white w-[200px] h-[56px] rounded-2xl font-sans font-semibold text-[20px] hover:bg-white hover:text-black"
                            >
                                THÊM VÀO GIỎ
                            </button>
                            <button className="flex justify-center items-center bg-white text-black w-[150px] h-[56px] rounded-2xl font-sans font-semibold text-[20px] border border-black hover:bg-black hover:text-white">
                                MUA HÀNG
                            </button>
                            <div
                                onClick={handleClickFavoriteProduct}
                                className="h-[56px] flex justify-center items-center border border-black w-[60px] rounded-2xl cursor-pointer hover:bg-black hover:text-white"
                            >
                                {/* Nếu đã yêu thích, hiển thị icon đầy (FavoriteIcon) và màu hồng */}
                                {favoriteProduct?.some((product) => product.productId === dataProduct?.product_id) ? (
                                    <FavoriteIcon className="text-pink-600" />
                                ) : (
                                    <FavoriteBorderIcon />
                                )}
                            </div>
                        </div>
                        <span className="font-sans font-light underline text-[14px] cursor-pointer mt-4">
                            Tìm tại cửa hàng
                        </span>
                    </div>
                </FadeInSection>
                {/* Description */}
                <FadeInSection delay={0.3}>
                    <div className="mt-8 space-y-3">
                        <div className="h-[1px] w-full bg-black opacity-55"></div>
                        <div onClick={toggleShowDescription} className="flex justify-between cursor-pointer">
                            <span className="font-sans font-medium text-[16px]">Mô tả</span>
                            {showDescription ? (
                                <RemoveIcon /> // Hiển thị icon Remove khi mô tả mở
                            ) : (
                                <img
                                    className={`w-[20px] h-5 transition-transform duration-500 ease-in-out ${
                                        showDescription ? 'rotate-180' : 'rotate-0'
                                    }`}
                                    src={icons.iconPlus} // Hiển thị iconPlus khi mô tả đóng
                                    alt="icon"
                                />
                            )}
                        </div>
                        {/* Description */}
                        {showDescription && (
                            <div className="slide-down" style={{ whiteSpace: 'pre-line' }}>
                                {dataProduct?.description}
                            </div>
                        )}
                        <div className="h-[1px] w-full bg-black opacity-55"></div>
                        <div onClick={toggleShowMaterial} className="flex justify-between cursor-pointer">
                            <span className="font-sans font-medium text-[16px]">Chất liệu</span>
                            {showMaterial ? (
                                <RemoveIcon /> // Hiển thị icon Remove khi mô tả mở
                            ) : (
                                <img
                                    className={`w-[20px] h-5 transition-transform duration-500 ease-in-out ${
                                        showMaterial ? 'rotate-180' : 'rotate-0'
                                    }`}
                                    src={icons.iconPlus} // Hiển thị iconPlus khi mô tả đóng
                                    alt="icon"
                                />
                            )}
                        </div>
                        {/* Material */}
                        {showMaterial && (
                            <div className="slide-down" style={{ whiteSpace: 'pre-line' }}>
                                {dataProduct?.material}
                            </div>
                        )}
                        <div className="h-[1px] w-full bg-black opacity-55"></div>
                        <div onClick={toggleShowIntruction} className="flex justify-between cursor-pointer">
                            <span className="font-sans font-medium text-[16px]">Hướng dãn sử dụng</span>
                            {showIntruction ? (
                                <RemoveIcon /> // Hiển thị icon Remove khi mô tả mở
                            ) : (
                                <img
                                    className={`w-[20px] h-5 transition-transform duration-500 ease-in-out ${
                                        showIntruction ? 'rotate-180' : 'rotate-0'
                                    }`}
                                    src={icons.iconPlus} // Hiển thị iconPlus khi mô tả đóng
                                    alt="icon"
                                />
                            )}
                        </div>
                        {/* Material */}
                        {showIntruction && (
                            <div className="slide-down" style={{ whiteSpace: 'pre-line' }}>
                                {dataProduct?.instruction}
                            </div>
                        )}
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
}

export default InfoProduct;
