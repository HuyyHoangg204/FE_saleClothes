import icons from "../../assets/icons";

function Footer() {
  return (
    <div className="py-4">
      <div className="h-[1px] w-full bg-slate-400"></div>
      <div className="flex justify-around my-4 mx-3">
        <div className="flex flex-col justify-center items-center space-y-4">
          <div className="font-sans font-medium text-2xl flex justify-center">
            Mạng xã hội
          </div>
          <div className="flex justify-between items-center">
            <a href="https://www.facebook.com/huyy.hoang.2304">
              <img
                className="w-[40px] object-cover"
                src={icons.iconFaceBook}
                alt=""
              />
            </a>

            <div>
              <img
                className="w-24 object-cover"
                src={icons.iconGoogle}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-12 object-cover"
                src={icons.iconInstagram}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-12 object-cover mx-6"
                src={icons.iconTikTok}
                alt=""
              />
            </div>
            <div>
              <img
                className="w-10 object-cover"
                src={icons.iconYoutube}
                alt=""
              />
            </div>
          </div>
          <div className="flex flex-col w-[250px] h-70px bg-black text-white justify-center items-center rounded-2xl py-1">
            <span>Liên hệ hỗ trợ</span>
            <span>0965 523 100</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-sans font-medium text-2xl mb-2">Chính sách</div>
          <div className="flex flex-col space-y-1">
            <span className="font-sans font-light text-[16px]">
              Chính sách điều khoản
            </span>
            <span className="font-sans font-light text-[16px]">
              Chính sách thanh toán
            </span>
            <span className="font-sans font-light text-[16px]">
              Chính sách bảo hành
            </span>
            <span className="font-sans font-light text-[16px]">
              Chính sách giao nhận, vận chuyển
            </span>
            <span className="font-sans font-light text-[16px]">
              Chính sách thẻ thành viên
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="font-sans font-medium text-2xl mb-2">Hỗ trợ</div>
          <div className="flex flex-col space-y-1">
            <span className="font-sans font-light text-[16px]">
              Hướng dẫn mua hàng
            </span>
            <span className="font-sans font-light text-[16px]">
              Gợi ý tìm size
            </span>
            <span className="font-sans font-light text-[16px]">Tuyển dụng</span>
            <span className="font-sans font-light text-[16px]">
              Hệ thống cửa hàng
            </span>
            <span className="font-sans font-light text-[16px]">Q&A</span>
          </div>
        </div>
        <div>
          <div className="font-sans font-medium text-2xl mb-2">
            Tải ứng dụng
          </div>
          <div className="w-[180px]">
            <img
              className="w-full object-cover my-2"
              src="images/googleplay.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="w-full object-cover"
              src="images/appstore.png"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="font-sans font-light text-[18px] flex justify-center mt-8">
        @Copyright by HuyHoang
      </div>
    </div>
  );
}

export default Footer;
