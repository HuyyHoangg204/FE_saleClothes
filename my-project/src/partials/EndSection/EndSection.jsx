import slide3 from "~/assets/images/slide3.webp";

function EndSection() {
  return (
    <div className="py-4 mt-4">
      <div className="flex justify-center items-center">
        <span className="text-3xl font-sans font-medium py-4 my-4">
          DEAL ĐỘC QUYỀN - CHỈ CÓ TẠI HARIOUS STORE
        </span>
      </div>
      <div className="w-full h-[622px]">
        <img className="h-full w-full object-cover" src={slide3} alt="" />
      </div>
      <div>
        <div className="flex justify-center items-center">
          <span className="text-3xl font-sans font-medium py-4 my-4">
            THƯƠNG HIỆU
          </span>
        </div>
        <div className="h-[165px] flex justify-around px-20 py-4 my-4 items-center">
          <div>
            <img
              className="w-[267px] h-[115px] object-cover"
              src="images/Harious-store.png"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-[165px] object-cover"
              src="images/Louis_Vuitton_logo_and_wordmark.svg.png"
              alt=""
            />
          </div>
          <div>
            <img className="h-full object-cover" src="images/dior.png" alt="" />
          </div>
          <div>
            <img
              className="h-full object-cover"
              src="images/hermes.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EndSection;
