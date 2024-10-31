import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { homeCaroselData } from "./MainCaroselData";

function MainCarosel() {
  const items = homeCaroselData.map((item, index) => (
      <div className='h-[618px]'>
        <img src={item.image} className="w-full h-full  object-cover" />
      </div>
  ));

  return (
    <div className="z-1">
       <div className="h-24"></div> {/* Phần tử trống để giữ vị trí */}
      <AliceCarousel
        mouseTracking
        items={items}
        controlsStrategy="alternate"
        disableButtonsControls
        disableDotsControls
        autoPlay
        autoPlayInterval={2300}
        infinite
      />
    </div>
  );
}

export default MainCarosel;
