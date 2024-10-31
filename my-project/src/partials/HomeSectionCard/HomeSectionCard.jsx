import icons from "../../assets/icons";

function HomeSectionCard() {
  return (
    <div className="w-[246px] h-[490px] bg-white">
      <div className="cursor-pointer h-[369px]">
        <img className="h-full w-full object-cover" src="images/maunu1.webp" alt="" />
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
          <img className="w-10 h-10  cursor-pointer" src={icons.iconAddCart} alt="" />
        </div>
      </div>
    </div>
  );
}

export default HomeSectionCard;
