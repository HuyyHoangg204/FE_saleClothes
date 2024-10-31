import { Fragment, useEffect } from "react";
import Header from "../../partials/Header";
import Product from "../../layouts/Product";
import SuccessMessage from "../../components/SuccessMessage";
import MainHeader from "../../partials/MainHeader/MainHeader";
import MainCarosel from "../../partials/MainCarousel/MainCarousel";
import IntroduceWeb from "../../components/IntroduceWeb";
import Voucher from "../../components/Voucher";
import HomeVoucher from "../../partials/HomeVoucher/HomeVoucher";
import HomeSectionCard from "../../partials/HomeSectionCard/HomeSectionCard";
import SectionCaroselNewProduct from "../../partials/HomeSectionCarousel/SectionCarouselNewProduct";
import SectionCarouselBestSeller from "../../partials/HomeSectionCarousel/SectionCarouselBestSeller";
import SectionCarouselFlashSale from "../../partials/HomeSectionCarousel/SectionCarouselFlashSale";
import EndSection from "../../partials/EndSection/EndSection";
import Footer from "../../partials/Footer/Footer";

function Home() {
   

    
    return ( 
        <Fragment>
        <MainHeader/>
        <MainCarosel/>
        <IntroduceWeb/>
        <HomeVoucher/>
        <SectionCaroselNewProduct/>
        <SectionCarouselBestSeller/>
        <SectionCarouselFlashSale/>
        <EndSection/>
        <Footer/>
        </Fragment>
     );
}

export default Home;