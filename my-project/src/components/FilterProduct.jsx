import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import icons from '../assets/icons';
import '../css/sortProduct.css';
import { filterListProductByCategory, getAllColorProduct } from '../redux/apiRequest';
import { categories } from '../pages/sale/categoryData';

function FilterProduct({handleChangeDataFilter}) {
    const [showFilterSize, setShowFilterSize] = useState(false);
    const [showFilterColor, setShowFilterColor] = useState(false);
    const [showFilterPrice, setShowFilterPrice] = useState(false);
    const [chooseColor, setChooseColor] = useState(0);
    const [chooseSize, setChooseSize] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [colorData, setColorData] = useState([]);
    const [dataFilter, setDataFilter] = useState({
      size: '',
      color: 0,
      minPrice: 0,
      maxPrice: 0,
      filter: false
  });

    const { categorySlug, gender } = useParams();


    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllColorProduct();
            setColorData(res);
        };
        fetchData();
    }, [showFilterColor]);

    useEffect(() => {
        setChooseSize('');
    }, [showFilterSize]);
    useEffect(() => {
        setChooseColor(0);
    }, [showFilterColor]);

    const handleFilter = () => {
      const numericMinPrice = Number(String(minPrice).replace(/[^\d]/g, '')); // Kiểm tra và chuyển minPrice thành chuỗi
      const numericMaxPrice = Number(String(maxPrice).replace(/[^\d]/g, '')); // Kiểm tra và chuyển maxPrice thành chuỗi
        const data = {
            size: chooseSize,
            color: chooseColor,
            minPrice: numericMinPrice,
            maxPrice: numericMaxPrice,
            filter: true
        };
        setDataFilter(data);
    };
    useEffect(() => {
        handleChangeDataFilter(dataFilter)
    }, [dataFilter]);

    const toggleFilterSize = () => {
        setShowFilterSize((prev) => !prev);
    };
    const toggleFilterColor = () => {
        setShowFilterColor((prev) => !prev);
    };
    const toggleFilterPrice = () => {
        setShowFilterPrice((prev) => !prev);
    };

    const handleMinChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, ''); // Loại bỏ các ký tự không phải số

        // Định dạng lại giá trị với dấu chấm
        if (value) {
            value = Number(value).toLocaleString(); // Thêm dấu phân cách ngàn
        }

        setMinPrice(value); // Cập nhật giá trị
    };
    const handleMaxChange = (e) => {
        let value = e.target.value.replace(/[^\d]/g, ''); // Loại bỏ các ký tự không phải số

        // Định dạng lại giá trị với dấu chấm
        if (value) {
            value = Number(value).toLocaleString(); // Thêm dấu phân cách ngàn
        }

        setMaxPrice(value); // Cập nhật giá trị
    };

    const handleChooseColor = (idColor) => {
        setChooseColor(idColor);
    };
    const handleChooseSize = (size) => {
        setChooseSize(size);
    };

    return (
        <div className="w-[270px] relative">
            {/* Sort by SIZE */}
            <div onClick={toggleFilterSize} className="flex justify-between py-3 items-center cursor-pointer">
                <span>SIZE</span>
                <img className="w-4 h-4" src={icons.iconPlus} alt="" />
            </div>
            {showFilterSize && (
                <div className="flex flex-wrap items-center justify-between w-full mt-2 slide-down">
                    <div
                        onClick={() => handleChooseSize('S')}
                        className={`font-sans font-light text-sm border px-2 rounded-md cursor-pointer ${
                            chooseSize === 'S' ? 'bg-black text-white' : ''
                        }`}
                    >
                        S
                    </div>
                    <div
                        onClick={() => handleChooseSize('M')}
                        className={`font-sans font-light text-sm border px-2 rounded-md cursor-pointer ${
                            chooseSize === 'M' ? 'bg-black text-white' : ''
                        }`}
                    >
                        M
                    </div>
                    <div
                        onClick={() => handleChooseSize('L')}
                        className={`font-sans font-light text-sm border px-2 rounded-md cursor-pointer ${
                            chooseSize === 'L' ? 'bg-black text-white' : ''
                        }`}
                    >
                        L
                    </div>
                    <div
                        onClick={() => handleChooseSize('XL')}
                        className={`font-sans font-light text-sm border px-2 rounded-md cursor-pointer ${
                            chooseSize === 'XL' ? 'bg-black text-white' : ''
                        }`}
                    >
                        XL
                    </div>
                    <div
                        onClick={() => handleChooseSize('XXL')}
                        className={`font-sans font-light text-sm border px-2 rounded-md cursor-pointer ${
                            chooseSize === 'XXL' ? 'bg-black text-white' : ''
                        }`}
                    >
                        XXL
                    </div>
                </div>
            )}
            <div className="h-[1px] bg-slate-100 w-full"></div>

            {/* Sort by Color */}
            <div onClick={toggleFilterColor} className="flex justify-between py-3 items-center cursor-pointer">
                <span>MÀU SẮC</span>
                <img className="w-4 h-4" src={icons.iconPlus} alt="" />
            </div>
            {showFilterColor && (
                <div className="flex flex-wrap leading-normal gap-x-4 gap-y-2 slide-down">
                    {colorData?.map((item, index) => (
                        <div
                            key={index} // Đảm bảo mỗi phần tử trong map có key duy nhất
                            onClick={() => handleChooseColor(item.colorID)}
                            className={`w-[16px] h-[16px] rounded-full border relative cursor-pointer ${
                                item.colorID === chooseColor ? 'border-black' : ''
                            }`}
                            style={{ backgroundColor: item.colorCode }}
                        >
                            {item.colorID === chooseColor && (
                                <img src={icons.iconDone} alt="done" className="absolute inset-0 w-full h-full" />
                            )}
                        </div>
                    ))}
                </div>
            )}
            <div className="h-[1px] bg-slate-100 w-full"></div>
            {/* Sort by Price */}
            <div onClick={toggleFilterPrice} className="flex justify-between py-3 items-center cursor-pointer">
                <span>KHOẢNG GIÁ</span>
                <img className="w-4 h-4" src={icons.iconPlus} alt="" />
            </div>
            {showFilterPrice && (
                <div className="flex flex-col mx-4 slide-down">
                    <div className="flex justify-between items-center py-2">
                        <span className="">Từ</span>
                        <div className="border-b border-b-slate-400">
                            <input
                                onChange={handleMinChange}
                                className="w-28 h-6  border-none focus:border-slate-400 focus:outline-none "
                                type="text"
                                placeholder="Nhập giá"
                                value={minPrice}
                            />
                        </div>
                        <span className="ml-2">đ</span> {/* Hiển thị đơn vị "đ" */}
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span>Đến</span>
                        <div className="border-b border-b-slate-400">
                            <input
                                onChange={handleMaxChange}
                                className="w-28 h-6  border-none focus:border-slate-400 focus:outline-none "
                                type="text"
                                placeholder="Nhập giá"
                                value={maxPrice}
                            />
                        </div>
                        <span className="ml-2">đ</span> {/* Hiển thị đơn vị "đ" */}
                    </div>
                </div>
            )}

            {/* Button filter product */}
            <div className="w-full h-full flex justify-center p-4">
                <button
                    onClick={handleFilter}
                    className="flex items-center justify-center bg-black text-white w-32 h-10 rounded-2xl"
                >
                    LỌC
                </button>
            </div>
        </div>
    );
}

export default FilterProduct;
