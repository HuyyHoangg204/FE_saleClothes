import icons from "../assets/icons";

function IntroduceWeb() {
  return (
    <div className="w-full h-auto flex justify-around py-8">
      <div className="flex space-x-4 items-center">
        <img className="w-12 h-14" src={icons.iconTranSit} alt="" />
        <div className="flex flex-col justify-center space-y-1">
          <span className="font-sans font-semibold">
            Miễn phí giao hàng toàn quốc
          </span>
          <span className="font-light">Áp dụng với đơn hàng trên 100.000đ</span>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <img className="w-12 h-14" src={icons.iconLike} alt="" />
        <div className="flex flex-col justify-center space-y-1">
          <span className="font-sans font-semibold">Hàng chính hãng 100%</span>
          <span className="font-light">An tâm về chất lượng sản phẩm</span>
        </div>
      </div>
      <div className="flex space-x-4 items-center">
        <img className="w-12 h-14" src={icons.iconSell} alt="" />
        <div className="flex flex-col justify-center space-y-1">
          <span className="font-sans font-semibold">Đổi hàng miễn phí</span>
          <span className="font-light">Trong 15 ngày kể từ ngày mua</span>
        </div>
      </div>
    </div>
  );
}

export default IntroduceWeb;
