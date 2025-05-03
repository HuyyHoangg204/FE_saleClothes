import HomeSectionCard from '../HomeSectionCard/HomeSectionCard';
import React, { useRef, useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ButtonSeeMore from '../../components/ButtonSeeMore';
import icons from '../../assets/icons';
import { getFlashSaleProduct } from '~/redux/apiRequest';
import AnimatedCarouselItem from '../../components/motion/AnimatedCarouselItem';
import FadeInSection from '../../components/motion/FadeInSection';

function SectionCarouselFlashSale() {
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [flashSaleProduct, setFlashSaleProduct] = useState(null);
    const responsive = {
        0: { items: 1 },
        720: { items: 3 },
        1024: { items: 5 },
    };
    useEffect(() => {
        callApiGetNewProduct();
    }, []);

    const callApiGetNewProduct = async () => {
        const res = await getFlashSaleProduct();
        if (res) {
            setFlashSaleProduct(res);
        }
    };

    const items = flashSaleProduct?.map((item, index) => (
        <AnimatedCarouselItem key={item.id || index} item={item} index={index} activeIndex={activeIndex} />
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
            <div className="flex justify-center items-center">
                <span className="text-3xl font-sans font-medium py-4">FLASHSALE hôm nay</span>
                <img className="h-14" src={icons.iconLightningBolt} alt="" />
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
            <FadeInSection>
                {activeIndex !== 0 && (
                    <div className="z-1">
                        <img
                            onClick={prevActive}
                            className="absolute left-4 top-64 cursor-pointer w-[40px]"
                            src={icons.iconArrowLeft}
                            alt=""
                        />
                    </div>
                )}
            </FadeInSection>
            <FadeInSection>
                {activeIndex !== items?.length - 5 && (
                    <div className="z-1">
                        <img
                            onClick={nextActive}
                            className="absolute right-7 top-64 cursor-pointer w-[40px]"
                            src={icons.iconArrowRight}
                            alt=""
                        />
                    </div>
                )}
            </FadeInSection>
            <FadeInSection>
                <div className="flex justify-center mt-6">
                    <ButtonSeeMore />
                </div>
            </FadeInSection>
        </div>
    );
}

export default SectionCarouselFlashSale;
