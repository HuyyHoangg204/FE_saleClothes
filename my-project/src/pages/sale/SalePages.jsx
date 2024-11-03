import { Fragment } from "react";
import MainHeader from "../../partials/MainHeader/MainHeader";
import BreadCrumb from "../../components/BreadCrumb";
import FilterProduct from "../../components/FilterProduct";
import MainProduct from "../../components/MainProduct";
import Footer from "../../partials/Footer/Footer";

function SalePages({breadcrumb}) {
    return ( 
        <Fragment>
            <MainHeader/>
            <div className="h-24"></div> {/* Phần tử trống để giữ vị trí */}
            <BreadCrumb breadcrumb = {breadcrumb}/>
            <div className="flex px-[112px] mt-14">
                <FilterProduct/>
                <MainProduct title={'ÁO SƠ MI NAM'}/>
            </div>
            <Footer/>
        </Fragment>
     );
}

export default SalePages;