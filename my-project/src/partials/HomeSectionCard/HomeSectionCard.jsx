import { useEffect, useState } from "react";
import icons from "../../assets/icons";
import ModalAddCart from "../../modal/ModalAddCart/ModalAddCart";

function HomeSectionCard() {
  const [showModalAddCard, setShowModalAddCard] = useState(false);

  const toggleShowModalAddCard = () => {
    setShowModalAddCard((prev) => !prev)
  }
  useEffect(() => {
    console.log(showModalAddCard)
  },[showModalAddCard])


  return (
    <div className="w-[246px] h-[490px] bg-white">
      <div className="cursor-pointer h-[369px]">
        <img className="h-full w-full object-cover" src="/images/maunu1.webp" alt="" />
      </div>
      <div className="">
        <div className="flex justify-between mt-5">
          <div className="flex space-x-2">
            <div className="w-[18px] h-[18px] rounded-full bg-black"></div>
            <div className="w-[18px] h-[18px] rounded-full bg-yellow-400"></div>
            <div className="w-[18px] h-[18px] rounded-full bg-red-600"></div>
          </div>
          <div>
            <img className="w-5 h-5 bg-white" src={icons.iconFavorite} alt="" />
          </div>
        </div>
        <div className="font-sans font-light text-[18px] mb-2">Chân váy bút chì</div>
        <div className="flex items-center justify-between">
          <span className="font-sans font-semibold text-xl">299.000 đ</span>
          <div className="relative">
            <span className="font-medium opacity-50 text-sm">1.000.000đ</span>
            <div className="h-[1px] w-full bg-black opacity-40 absolute z-5 top-1/2"></div>
          </div>
          <div className="relative">
          <img onClick={toggleShowModalAddCard} className="w-10 h-10  cursor-pointer" src={icons.iconAddCart} alt="" />
          {showModalAddCard && <ModalAddCart showModalAddCard={showModalAddCard}/>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeSectionCard;
