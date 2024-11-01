import { useState } from "react";
import icons from "../assets/icons";
import filterProduct from "../css/filterProduct.css";

function FilterProduct() {
  const [showFilterSize, setShowFilterSize] = useState(false);

  const toggleFilterSize = () => {
    setShowFilterSize((prev) => !prev);
  };

  return (
    <div className="w-[270px] relative">
      <div
        onClick={toggleFilterSize}
        className="flex justify-between py-3 items-center cursor-pointer"
      >
        <span>SIZE</span>
        <img className="w-4 h-4" src={icons.iconPlus} alt="" />
      </div>

      {/* Khối giữ không gian cho modal */}
      <CSSTransition
        in={showFilterSize}
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <div className="flex flex-wrap items-center justify-between w-full mt-2">
          <div className="font-sans font-light text-sm border px-2 rounded-md">S</div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">M</div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">L</div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">XL</div>
          <div className="font-sans font-light text-sm border px-2 rounded-md">XXL</div>
        </div>
      </CSSTransition>

      <div className="flex justify-between py-3 items-center">
        <span>MÀU SẮC</span>
        <img className="w-4 h-4" src={icons.iconPlus} alt="" />
      </div>
      <div className="flex justify-between py-3 items-center">
        <span>KHOẢNG GIÁ</span>
        <img className="w-4 h-4" src={icons.iconPlus} alt="" />
      </div>
    </div>
  );
}

export default FilterProduct;
