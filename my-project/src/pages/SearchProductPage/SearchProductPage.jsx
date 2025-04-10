
import { Fragment, useEffect, useState } from 'react';
import MainHeader from '../../partials/MainHeader/MainHeader';
import FilterProduct from '../../components/FilterProduct';
import Footer from '../../partials/Footer/Footer';
import { useLocation, useParams } from 'react-router-dom';
import ProductSearch from '../../components/search/ProductSearch';


function SearchProductPage() {
    const [dataFilter, setDataFilter] = useState({
        size: '',
        color: 0,
        minPrice: 0,
        maxPrice: 0,
        filter: false
    });
    const { query } = useParams();

    
    const handleChangeDataFilter = (data) => {
        setDataFilter(data);
    };

    return (
        <Fragment>
            <MainHeader />
            <div className="h-24"></div> {/* Phần tử trống để giữ vị trí */}
            <div className="flex px-[112px] mt-14">
                <FilterProduct handleChangeDataFilter={handleChangeDataFilter} />
                <ProductSearch dataFilter={dataFilter} title={query} />
            </div>
            <Footer />
        </Fragment>
    );
}

export default SearchProductPage;