import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function AddProductElement({ handleRemoveTypeProduct, index }) {
    const [selectedColor, setSelectedColor] = useState('');
    const [showAllColor, setShowAllColor] = useState(false);
    const [selectedSize, setSelectedSize] = useState('S');
    const [showAllSize, setShowAllSize] = useState(false);
    const [listSizes, setListSizes] = useState([]);

    const colors = [
        { name: 'Đỏ', color: '#FF0000' },
        { name: 'Xanh lá', color: '#00FF00' },
        { name: 'Xanh dương', color: '#0000FF' },
        { name: 'Vàng', color: '#FFFF00' },
    ];
    const sizes = ['S', 'M', 'L', 'XL', '2XL'];

    const handleSelect = (color) => {
        setSelectedColor(color);
    };

    const handleSelectSize = (size) => {
        setSelectedSize(size);
        setShowAllSize(false);
        setListSizes([...listSizes, size]);
    };

    const handleRemoveSize = (index) => {
        const newListSizes = [...listSizes]; // Tạo bản sao của mảng listSizes
        newListSizes.splice(index, 1); // Xóa phần tử tại vị trí index
        setListSizes(newListSizes); // Cập nhật lại state với mảng mới
    };
    const toggleColor = () => {
        setShowAllColor((prevState) => !prevState);
    };
    const toggleModalSize = () => {
        setShowAllSize((prev) => !prev);
    };

    return (
        <div className="w-full bg-[#f9fafc] h-32 flex items-center space-x-6 relative">
            {/* Select color product */}
            <div onClick={toggleColor} className="relative w-32">
                {/* Nút hiển thị lựa chọn */}
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex items-center p-2 cursor-pointer">
                    {selectedColor ? (
                        <>
                            <span
                                className="w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: selectedColor }}
                            ></span>
                            <span>{colors.find((c) => c.color === selectedColor)?.name}</span>
                            <KeyboardArrowDownIcon />
                        </>
                    ) : (
                        <div className="flex justify-between">
                            <span>Chọn màu</span>
                            <KeyboardArrowDownIcon />
                        </div>
                    )}
                </div>

                {/* Dropdown */}
                {showAllColor && (
                    <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-lg">
                        {colors.map((item) => (
                            <li
                                key={item.color}
                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => handleSelect(item.color)}
                            >
                                <span
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{ backgroundColor: item.color }}
                                ></span>
                                {item.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="relative ">
                <div
                    onClick={toggleModalSize}
                    className="w-20 h-10 border flex items-center justify-around px-2 rounded-lg border-gray-300"
                >
                    <span>{selectedSize}</span>
                    <KeyboardArrowDownIcon />
                </div>
                {showAllSize && (
                    <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-lg z-10">
                        {sizes.map((item, index) => (
                            <li
                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                key={index}
                                onClick={() => handleSelectSize(item)}
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/*  */}
            {listSizes.map((item, index) => (
                <div className="relative">
                    <div
                        key={index}
                        className="flex justify-center border border-gray-300 w-10 h-10 rounded-lg items-center"
                    >
                        <span>{item}</span>
                    </div>

                    <CloseIcon
                        onClick={() => handleRemoveSize(index)}
                        fontSize="small"
                        className="text-red-500  absolute top-[-4px] right-[-4px] cursor-pointer"
                    />
                </div>
            ))}
            <CloseIcon
                onClick={() => {
                    handleRemoveTypeProduct(index);
                }}
                className="text-red-500 absolute top-0 right-0 cursor-pointer"
            />
            <div className="flex items-center justify-between px-4 bg-primary-700 h-10 rounded-lg ">
                <AddPhotoAlternateIcon />
                <span className="text-white">Thêm ảnh</span>
            </div>
        </div>
    );
}

export default AddProductElement;
