import { Fragment, useEffect, useState } from 'react';
import MainHeader from '../../partials/MainHeader/MainHeader';
import BreadCrumb from '../../components/BreadCrumb';
import FilterProduct from '../../components/FilterProduct';
import MainProduct from '../../components/MainProduct';
import Footer from '../../partials/Footer/Footer';
import { useLocation, useParams } from 'react-router-dom';
import { categories } from './categoryData';

function SalePages() {
    const [dataFilter, setDataFilter] = useState({
        size: '',
        color: 0,
        minPrice: 0,
        maxPrice: 0,
        filter: false
    });
    const { categorySlug, gender } = useParams();

    const capitalizeFirstLetter = (str) => {
        if (!str) return ''; // Kiểm tra chuỗi rỗng hoặc undefined
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizeEachWord = (str) => {
        if (!str) return '';
        return str
            .split(' ') // Tách từng từ
            .map((word) => capitalizeFirstLetter(word)) // Viết hoa chữ cái đầu
            .join(' ');
    };

    const handleChangeDataFilter = (data) => {
        setDataFilter(data);
    };


    const categoryList = categories[gender] || [];
    // Tìm danh mục theo slug
    const matchedCategory = categoryList.find((item) => item.slug === categorySlug);
    const name = matchedCategory ? matchedCategory.name.toUpperCase() : 'Danh mục không tồn tại';
    const category = matchedCategory.category;

    return (
        <Fragment>
            <MainHeader />
            <div className="h-24"></div> {/* Phần tử trống để giữ vị trí */}
            <BreadCrumb breadcrumb={['Trang chủ', category, capitalizeEachWord(name)]} />
            <div className="flex px-[112px] mt-14">
                <FilterProduct handleChangeDataFilter={handleChangeDataFilter} />
                <MainProduct dataFilter={dataFilter} title={name} />
            </div>
            <Footer />
        </Fragment>
    );
}

export default SalePages;
