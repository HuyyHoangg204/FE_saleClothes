import slide3 from "~/assets/images/slide3.webp";
import FadeInSection from "../../components/motion/FadeInSection";

function EndSection() {
  return (
    <div className="py-4 mt-4">
     <FadeInSection>
     <div className="flex justify-center items-center">
        <span className="text-3xl font-sans font-medium py-4 my-4">
          DEAL ĐỘC QUYỀN - CHỈ CÓ TẠI HARIOUS STORE
        </span>
      </div>
     </FadeInSection>
     <FadeInSection>
     <div className="w-full h-[622px]">
        <img className="h-full w-full object-cover" src={slide3} alt="" />
      </div>
     </FadeInSection>
      <div>
        <FadeInSection>
        <div className="flex justify-center items-center">
          <span className="text-3xl font-sans font-medium py-4 my-4">
            THƯƠNG HIỆU
          </span>
        </div>
        </FadeInSection>
        <div className="h-[165px] flex justify-around px-20 py-4 my-4 items-center">
          <FadeInSection delay={0.2}>
          <div>
            <img
              className="w-[267px] h-[115px] object-cover"
              src="images/Harious-store.png"
              alt=""
            />
          </div>
          </FadeInSection>
          <FadeInSection delay={0.2}>
          <div>
            <img
              className="h-[165px] object-cover"
              src="images/Louis_Vuitton_logo_and_wordmark.svg.png"
              alt=""
            />
          </div>
          </FadeInSection>
          <FadeInSection delay={0.3}>
          <div>
            <img className="h-full object-cover" src="images/dior.png" alt="" />
          </div>
          </FadeInSection>
          <FadeInSection delay={0.3}>
          <div>
            <img
              className="h-full object-cover"
              src="images/hermes.png"
              alt=""
            />
          </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}

export default EndSection;
