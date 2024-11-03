import { useState } from "react";
import icons from "../assets/icons";
import "../css/sortProduct.css";

function FilterProduct() {
  const [showFilterSize, setShowFilterSize] = useState(false);
  const [showFilterColor, setShowFilterColor] = useState(false);
  const [showFilterPrice, setShowFilterPrice] = useState(false);
  const [minPrice, setMinPrince] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000000);

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
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="w-[270px] relative">
      {/* Sort by SIZE */}
      <div
        onClick={toggleFilterSize}
        className="flex justify-between py-3 items-center cursor-pointer"
      >
        <span>SIZE</span>
        <img className="w-4 h-4" src={icons.iconPlus} alt="" />
      </div>
      {showFilterSize && (
        <div className="flex flex-wrap items-center justify-between w-full mt-2 slide-down">
          <div className="font-sans font-light text-sm border px-2 rounded-md">
            S
          </div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">
            M
          </div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">
            L
          </div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">
            XL
          </div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">
            XXL
          </div>
        </div>
      )}
      <div className="h-[1px] bg-slate-100 w-full"></div>

      {/* Sort by Color */}
      <div
        onClick={toggleFilterColor}
        className="flex justify-between py-3 items-center cursor-pointer"
      >
        <span>MÀU SẮC</span>
        <img className="w-4 h-4" src={icons.iconPlus} alt="" />
      </div>
      {showFilterColor && (
        <div className="flex flex-wrap leading-normal gap-x-4 gap-y-2 slide-down">
          <div className="w-[16px] h-[16px] bg-black rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-white rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-blue-600 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-yellow-400 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-pink-400 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-red-900 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-green-800 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-violet-700 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-orange-400 rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-black rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-black rounded-full border border-stone-400"></div>
          <div className="w-[16px] h-[16px] bg-black rounded-full border border-stone-400"></div>
        </div>
      )}
      <div className="h-[1px] bg-slate-100 w-full"></div>
      {/* Sort by Price */}
      <div
        onClick={toggleFilterPrice}
        className="flex justify-between py-3 items-center cursor-pointer"
      >
        <span>KHOẢNG GIÁ</span>
        <img className="w-4 h-4" src={icons.iconPlus} alt="" />
      </div>
      {showFilterPrice && (
        <div className="flex flex-col mx-4 slide-down">
          <div className="flex justify-between items-center py-2">
            <span className="">Từ</span>
            <div className="border-b border-b-slate-400">
              <input
                className="w-28 h-6  border-none focus:border-slate-400 focus:outline-none "
                type="text"
              />
            </div>
          </div>
          <div className="flex justify-between items-center py-2">
            <span>Đến</span>
            <div className="border-b border-b-slate-400">
              <input
                className="w-28 h-6  border-none focus:border-slate-400 focus:outline-none "
                type="text"
              />
            </div>
          </div>
        </div>
      )}

      {/* Button filter product */}
      <div className="w-full h-full flex justify-center p-4">
        <button className="flex items-center justify-center bg-black text-white w-32 h-10 rounded-2xl">
          LỌC
        </button>
      </div>
    </div>
  );
}

export default FilterProduct;
