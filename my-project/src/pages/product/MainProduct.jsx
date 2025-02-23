import { Fragment, useEffect, useState } from 'react';
import MainHeader from '../../partials/MainHeader/MainHeader';
import Footer from '../../partials/Footer/Footer';
import InfoProduct from './InfoProduct';
import IntroduceWeb from '../../components/IntroduceWeb';
import SectionCarouselWatchedProductr from './SectionCarouselWatchedProductr';
import SectionCarouselRecommendProduct from './SectionCarouselRecommendProduct.jsx';
import BreadCrumb from '../../components/BreadCrumb.jsx';
import { useLocation, useParams } from 'react-router-dom';
import { getListProductByIds, getProductDetail } from '../../redux/apiRequest.js';

function MainProduct() {
    const { name } = useParams();

    // Tách ID từ chuỗi "48-Áo vest Tweed Kose"
    const productId = name?.split("-")[0]; // Lấy "48"
    
    const [dataProduct, setDataProduct] = useState({});
    const [dataProductWatched, setDataProductWatched] = useState(null)
    const [loading, setLoading] = useState(true); // ✅ Thêm trạng thái loading
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductDetail(productId)
                const res1 = await getListProductByIds();

                setDataProduct(res);
                setDataProductWatched(res1);
                saveProductIdToCookie(res.product_id);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [productId]);



    // Hàm lưu vào cookie
    const setCookie = (name, value, days) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${JSON.stringify(value)}; path=/; expires=${expires.toUTCString()}`;
    };
    const getCookie = (name) => {
        const cookies = document.cookie.split("; ").find(row => row.startsWith(name + "="));
        return cookies ? JSON.parse(cookies.split("=")[1]) : [];
    };
    const saveProductIdToCookie = (id) => {
        let productIds = getCookie("productIds"); // Lấy danh sách từ cookie
        if (!productIds.includes(id)) {
            productIds.push(id); // Thêm ID mới vào danh sách
            setCookie("productIds", productIds, 7); // Lưu vào cookie (hết hạn sau 7 ngày)
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div className="">
            <MainHeader />
            <div className="h-24"></div>
            <BreadCrumb breadcrumb={['Trang chủ', dataProduct?.gender, dataProduct?.name]} />
            <div className="px-[114px]">
                <InfoProduct dataProduct={dataProduct} />
                <IntroduceWeb />
                <SectionCarouselWatchedProductr dataProductWatched ={dataProductWatched}/>
                <SectionCarouselRecommendProduct />
            </div>
            <Footer />
        </div>
    );
}

export default MainProduct;
