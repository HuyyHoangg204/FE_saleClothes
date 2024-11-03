import { useEffect, useState } from "react";
import icons from "../assets/icons";
import '../css/Cart.css'

function Cart({toggleHideCart}) {
  const [isClosing, setIsClosing] = useState(false); // Trạng thái cho hiệu ứng đóng
  

 
  const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

  const handleCloseCart = () => {
    setIsClosing(true); // Bắt đầu hiệu ứng đóng
    setTimeout(() => {
      toggleHideCart(); // Sau khi hiệu ứng hoàn thành, gọi hàm để ẩn giỏ hàng
    }, 300); // Thời gian chờ nên tương ứng với thời gian hiệu ứng CSS
  };

  return (
    <div className="fixed inset-0 flex justify-end z-10 w-full h-full bg-black bg-opacity-50">
      <div className={`z-11 w-[480px] h-full bg-white flex flex-col justify-between pb-4 cart-container animate-cart ${isClosing ? "cart-hide" : "animate-cart"}`}>
        <div className="px-6 pb-4">
          <div className="flex justify-between mt-6 font-sans font-bold text-lg ">
            <span>Giỏ hàng (1)</span>
            <img onClick={handleCloseCart} className="w-[24px] h-[24px] cursor-pointer" src={icons.iconClose} alt="" />
          </div>
          <div className="font-light font-sans mt-2">
            Hãy gọi là Hoàng đẹp trai để có được những ưu đãi ❤️
          </div>
        </div>

        {/* Product in cart */}
        <div
          className={`max-h-[480px] overflow-y-auto pl-6 ${
            items <= 3 ? "pr-6" : ""
          } `}
        >
          {items.map((item,index) => (
            <div key={index}>
              <div className="w-full h-[1px] bg-black bg-opacity-20 my-6"></div>
              <div className="flex">
                <div>
                  <img
                    className="w-[72px] h-[96px]"
                    src="/images/maunu1.webp"
                    alt=""
                  />
                </div>
                <div className="flex flex-col justify-between w-full ml-6">
                  <div>
                    <div className="flex justify-between w-full items-center font-sans font-medium text-[18px]">
                      <span>Combo 2 khăn mặt</span>
                      <img src={icons.iconMore} alt="" />
                    </div>
                    <div className="space-x-3">
                      <span className="font-light font-sans text-[16px]">
                        Màu sắc:
                        <span className="font-normal font-sans text-[16px] ml-1">
                          Hồng
                        </span>
                      </span>
                      <span className="font-light font-sans text-[16px]">
                        Size:
                        <span className="font-normal font-sans text-[16px] ml-1">
                          XL
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-sans font-medium text-[18px]">
                      79.000 đ
                    </span>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center border w-[32px] h-[32px] cursor-pointer">
                        <img src={icons.iconRemove} alt="" />
                      </div>
                      <div className="flex items-center justify-center border w-[32px] h-[32px]">
                        1
                      </div>
                      <div className="flex items-center justify-center border w-[32px] h-[32px] cursor-pointer">
                        <img src={icons.iconAdd} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment modal */}

        <div className="px-6 space-y-2">
          <div className="flex items-center justify-end">
            <span className="font-sans font-light text-[18px]">
              Tạm tính:
              <span className="font-sans font-semibold text-[18px] ml-1">
                300.000đ
              </span>
            </span>
          </div>
          <div className="flex justify-center">
            <button className="w-full h-[58px] bg-black text-white text-center">
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
