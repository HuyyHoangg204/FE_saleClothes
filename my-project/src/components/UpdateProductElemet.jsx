import React, { useEffect, useRef, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


function UpdateProductElement({
    colors,
    colorID,
    listSize,
    stock,
    openAddImageModal,
    variant_id,
    handleChangeVariantID,
    handleRemoveTypeProduct,
    indexTypeProduct,
    productVariant,
    handleAddProductVariantData
}) {
    const [selectedColor, setSelectedColor] = useState({});
    const [showAllColor, setShowAllColor] = useState(false);
    const [showAllSize, setShowAllSize] = useState(false);
    const [selectedSize, setSelectedSize] = useState('S');
    const [listSizes, setListSizes] = useState([]);
    const [stockQuantity, setStockQuantity] = useState(null);
    const sizes = ['S', 'M', 'L', 'XL', '2XL'];

    const toggleColor = () => {
        setShowAllColor((prevState) => !prevState);
    };
    const toggleModalSize = () => {
        setShowAllSize((prev) => !prev);
    };
    const handleSelectSize = (size) => {
        setSelectedSize(size);
        setShowAllSize(false);
        setListSizes([...listSizes, size]);
        // handleDataChange();
    };
    

    useEffect(() => {
        // Kiểm tra nếu có sự thay đổi thực sự
        if (selectedColor?.colorID || listSizes.length > 0 || stockQuantity !== null) {
            handleAddProductVariantData(indexTypeProduct, selectedColor?.colorID, listSizes, Number(stockQuantity), selectedColor?.colorCode, selectedColor?.colorName);
        }
    }, [selectedColor, listSizes, stockQuantity]); // Lắng nghe sự thay đổi của các state này
    
  
   


    const handleRemoveSize = (index) => {
        const newListSizes = [...listSizes]; // Tạo bản sao của mảng listSizes
        newListSizes.splice(index, 1); // Xóa phần tử tại vị trí index
        setListSizes(newListSizes); // Cập nhật lại state với mảng mới
        // handleDataChange();
    };
    useEffect(() => {
       if(listSize !== undefined) {
        setListSizes(listSize);
       }
    }, [listSize]);
    useEffect(() => {
        setSelectedColor(colors?.find((c) => c.colorID === colorID));
    }, [colorID, colors]);
    useEffect(() => {
        setStockQuantity(stock);
    }, [stock]);

    return (
        <div className="w-full bg-[#f9fafc] h-32 flex items-center space-x-6 relative">
            {/* Select color product */}
            <div onClick={toggleColor} className="relative w-32">
                {/* Nút hiển thị lựa chọn */}
                <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex items-center p-2 cursor-pointer">
                    {productVariant?.color_id ? (
                        <>
                            <span
                                className="w-4 h-4 rounded-full mr-2"
                                style={{ backgroundColor: productVariant?.colorCode }}
                            ></span>
                            <span>{productVariant?.colorName}</span>
                            <KeyboardArrowDownIcon />
                        </>
                    ) : (
                        <div  className="flex justify-between">
                            <span>Chọn màu</span>
                            <KeyboardArrowDownIcon />
                        </div>
                    )}
                </div>

                {/* Dropdown */}
                {showAllColor && (
                    <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full shadow-lg">
                        {colors.map((item, index) => (
                            <li
                                key={index}
                                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                    setSelectedColor(item);
                                }}
                            >
                                <span
                                    className="w-4 h-4 rounded-full mr-2"
                                    style={{ backgroundColor: item.colorCode }}
                                ></span>
                                {item.colorName}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="relative cursor-pointer">
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
                                onClick={() => {
                                    handleSelectSize(item);
                                    // handleDataChange();
                                }}
                            >
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {/*  */}
            {listSizes?.map((item, index) => (
                <div className="relative" key={index}>
                    <div className="flex justify-center border border-gray-300 w-10 h-10 rounded-lg items-center">
                        <span>{item}</span>
                    </div>

                    <CloseIcon
                        onClick={() => {
                            handleRemoveSize(index);
                            // handleDataChange();
                        }}
                        fontSize="small"
                        className="text-red-500  absolute top-[-4px] right-[-4px] cursor-pointer"
                    />
                </div>
            ))}
            <CloseIcon
                onClick={() => {
                    handleRemoveTypeProduct(productVariant);
                }}
                className="text-red-500 absolute top-0 right-0 cursor-pointer"
            />
            <input
                onChange={(e) => {
                    setStockQuantity(e.target.value);
                   
                    // handleDataChange();
                }}
                className="w-20 rounded-lg border border-gray-300"
                placeholder="Stock"
                type="number"
                value={stockQuantity}
            />
            <div
                onClick={() => {
                    handleChangeVariantID(variant_id);
                    openAddImageModal();
                }}
                className="flex items-center justify-between px-4 bg-primary-700 h-10 rounded-lg cursor-pointer"
            >
                <AddPhotoAlternateIcon />
                <span className="text-white">Thêm ảnh</span>
            </div>
        </div>
    );
}

export default UpdateProductElement;
