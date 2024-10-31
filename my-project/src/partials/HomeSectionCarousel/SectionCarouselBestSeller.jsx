import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import React, { useRef, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import ButtonSeeMore from "../../components/ButtonSeeMore";
import icons from "../../assets/icons";

function SectionCarouselBestSeller() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5 },
  };
  const items = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((item) => (
    <HomeSectionCard />
  ));

  const prevActive = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };
  const nextActive = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };
  const syncAcitve = ({ item }) => {
    setActiveIndex(item);
  };
  return (
    <div className="relative  lg:px-10 mt-8">
      <div className="flex justify-center">
        <span className="text-3xl font-sans font-medium py-4">
          Sản phẩm bán chạy nhất
        </span>
      </div>
      <div className="relative p-4">
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          controlsStrategy="alternate"
          infinite
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          activeIndex={activeIndex}
          onSlideChanged={syncAcitve}
        />
      </div>
      {activeIndex !== 0 && (
        <div className="z-1">
          <img
            onClick={prevActive}
            className="absolute left-0 top-64 cursor-pointer"
            src={icons.iconArrowLeft}
            alt=""
          />
        </div>
      )}
      {activeIndex !== items.length - 5 && (
        <div className="z-1">
          <img
            onClick={nextActive}
            className="absolute right-0 top-64 cursor-pointer"
            src={icons.iconArrowRight}
            alt=""
          />
        </div>
      )}
      <div className="flex justify-center mt-6">
        <ButtonSeeMore />
      </div>
    </div>
  );
}

export default SectionCarouselBestSeller;
