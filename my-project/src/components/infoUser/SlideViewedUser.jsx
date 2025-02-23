import { useEffect, useState, useRef } from 'react';
import { getListProductByIds } from '../../redux/apiRequest.js';
import CardProductV2 from './CardProductV2.jsx';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import icons from '../../assets/icons/index.jsx';

function SlideViewedUser({ handleChange }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const responsive = {
        0: { items: 0 },
        720: { items: 1 },
        1024: { items: 2 },
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getListProductByIds();
            setData(res);
            setLoading(false);
        };
        fetchData();
    }, []);
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

    const items = data?.map((product) => <CardProductV2 product={product} />);
    

    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">ĐÃ XEM GẦN ĐÂY</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                <div className="relative w-full md:w-[800px] ">
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
                            className="absolute left-[484px]  top-[450px] cursor-pointer w-[40px]"
                            src={icons.iconArrowLeft}
                            alt=""
                        />
                    </div>
                )}
                {activeIndex !== items?.length - 2 && (
                    <div className="z-1">
                        <img
                            onClick={nextActive}
                            className="absolute right-36 top-[450px] cursor-pointer w-[40px]"
                            src={icons.iconArrowRight}
                            alt=""
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SlideViewedUser;
