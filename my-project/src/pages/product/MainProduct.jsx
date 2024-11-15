import { Fragment } from 'react';
import MainHeader from '../../partials/MainHeader/MainHeader';
import Footer from '../../partials/Footer/Footer';
import InfoProduct from './InfoProduct';
import IntroduceWeb from '../../components/IntroduceWeb';
import SectionCarouselWatchedProductr from './SectionCarouselWatchedProductr';
import SectionCarouselRecommendProduct from './SectionCarouselRecommendProduct.jsx';
import BreadCrumb from '../../components/BreadCrumb.jsx';

function MainProduct() {
    return (
        <div className="">
            <MainHeader />
            <div className="h-24"></div>
            <BreadCrumb breadcrumb={['Trang chủ', 'Nữ', 'Áo sơ mi Regular Linen Cotton']} />
            <div className="px-[114px]">
                <InfoProduct />
                <IntroduceWeb />
                <SectionCarouselWatchedProductr />
                <SectionCarouselRecommendProduct />
            </div>
            <Footer />
        </div>
    );
}

export default MainProduct;
