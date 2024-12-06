import React, { useRef, useState } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';

import StarIcon from '@mui/icons-material/Star';
// import 'swiper/css';
import icons from '../../assets/icons';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveIcon from '@mui/icons-material/Remove';

import InfoSizeModal from '~/modal/InfoSizeModal/InfoSizeModal.jsx';
import '~/css/sortProduct.css';

function InfoProduct() {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Lưu chỉ số ảnh đã chọn
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState(null);
    const [openModalSize, setOpenModalSize] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [fade, setFade] = useState(false); // Trạng thái để điều khiển hiệu ứng fade
    const [showDescription, setShowDescription] = useState(false);

    // Handler khi chọn màu
    const handleColorSelect = (color) => {
        setSelectedColor(color);
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

    const handleClick = () => {
        setIsFavorite(!isFavorite); // Đổi trạng thái khi click
    };

    const toggleShowDescription = () => {
        setShowDescription(!showDescription);
    };

    const items = [
        '/images/maunu1.webp',
        '/images/maunu2.webp',
        '/images/maunu1.webp',
        '/images/maunu2.webp',
        '/images/maunu1.webp',
        '/images/maunu1.webp',
        '/images/maunu2.webp',
        '/images/maunu1.webp',
        '/images/maunu2.webp',
        '/images/maunu1.webp',
    ];
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
                <h2 className="font-sans font-semibold text-[26px]">Áo sơ mi Regular Linen Cotton</h2>
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
                {/* price */}
                <div className="my-6">
                    <span className="font-sans font-semibold text-[24px]">127.000 đ</span>
                    <div className="flex space-x-6 items-center">
                        <span className="font-sans font-light text-[18px] relative w-auto">
                            300.000 đ<div className="h-[1px] bg-black absolute w-full top-1/2"></div>
                        </span>
                        <span className="w-auto p-1 bg-red-700 text-white font-sans font-medium text-[14px]">-30%</span>
                    </div>
                </div>
                {/* color */}
                <div>
                    <span className="font-sans font-semibold text-[20px]">Màu sắc: Ghi sáng</span>
                    <div className="flex space-x-4 mt-2">
                        <div
                            className="bg-white w-[30px] h-[30px] border flex justify-center items-center cursor-pointer"
                            onClick={() => handleColorSelect('black')}
                        >
                            <div className="relative">
                                <div className="bg-black w-[20px] h-[20px] rounded-full"></div>
                                {selectedColor === 'black' && (
                                    <img src={icons.iconDone} alt="done" className="absolute inset-0 w-full h-full" />
                                )}
                            </div>
                        </div>
                        <div
                            className="bg-white w-[30px] h-[30px] border flex justify-center items-center cursor-pointer"
                            onClick={() => handleColorSelect('red')}
                        >
                            <div className="relative">
                                <div className="bg-red-700 w-[20px] h-[20px] rounded-full"></div>
                                {selectedColor === 'red' && (
                                    <img src={icons.iconDone} alt="done" className="absolute inset-0 w-full h-full" />
                                )}
                            </div>
                        </div>
                        <div
                            className="bg-white w-[30px] h-[30px] border flex justify-center items-center cursor-pointer"
                            onClick={() => handleColorSelect('yellow')}
                        >
                            <div className="relative">
                                <div className="bg-yellow-600 w-[20px] h-[20px] rounded-full"></div>
                                {selectedColor === 'yellow' && (
                                    <img src={icons.iconDone} alt="done" className="absolute inset-0 w-full h-full" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Size */}
                <div className="mt-8">
                    <div className="flex justify-between items-center">
                        <span className="font-sans font-semibold text-[20px]">Size:</span>
                        <div onClick={handleOpenModalSize} className="flex space-x-1 items-center cursor-pointer">
                            <img src={icons.iconRuler} alt="" />
                            <span className="underline">Gợi ý tìm size</span>
                        </div>
                    </div>
                    <div className="flex space-x-4 mt-3">
                        {sizes.map((size) => (
                            <div
                                key={size}
                                className={`w-10 h-8 flex justify-center items-center border cursor-pointer ${
                                    selectedSize === size
                                        ? 'bg-black text-white hover:bg-white hover:text-black'
                                        : 'bg-white text-black hover:bg-black hover:text-white'
                                }`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                <span>{size}</span>
                            </div>
                        ))}
                    </div>
                    {openModalSize && <InfoSizeModal handleCloseModalSize={handleCloseModalSize} />}
                </div>
                <div className="mt-8 flex flex-col">
                    <div className="flex space-x-10">
                        <button className="flex justify-center items-center border border-black bg-black text-white w-[200px] h-[56px] rounded-2xl font-sans font-semibold text-[20px] hover:bg-white hover:text-black">
                            THÊM VÀO GIỎ
                        </button>
                        <button className="flex justify-center items-center bg-white text-black w-[150px] h-[56px] rounded-2xl font-sans font-semibold text-[20px] border border-black hover:bg-black hover:text-white">
                            MUA HÀNG
                        </button>
                        <div
                            onClick={handleClick}
                            className="h-[56px] flex justify-center items-center border border-black w-[60px] rounded-2xl cursor-pointer hover:bg-black hover:text-white"
                        >
                            {/* Nếu đã yêu thích, hiển thị icon đầy (FavoriteIcon) và màu hồng */}
                            {isFavorite ? <FavoriteIcon className="text-pink-600" /> : <FavoriteBorderIcon />}
                        </div>
                    </div>
                    <span className="font-sans font-light underline text-[14px] cursor-pointer mt-4">
                        Tìm tại cửa hàng
                    </span>
                </div>
                {/* Description */}
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
                        <div className="slide-down">
                            Áo khoác gió nữ hai lớp có mũ. Phom dáng rộng vừa, phù hợp với thời tiết gió, mưa nhẹ.
                        </div>
                    )}
                    <div className="h-[1px] w-full bg-black opacity-55"></div>
                    <div className="flex justify-between cursor-pointer">
                        <span className="font-sans font-medium text-[16px]">Chất liệu</span>
                        <img className="w-[20px] h-5" src={icons.iconPlus} alt="" />
                    </div>
                    <div className="h-[1px] w-full bg-black opacity-55"></div>
                    <div className="flex justify-between cursor-pointer">
                        <span className="font-sans font-medium text-[16px]">Hướng dãn sử dụng</span>
                        <img className="w-[20px] h-5" src={icons.iconPlus} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoProduct;
