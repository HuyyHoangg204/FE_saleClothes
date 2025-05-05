import { useEffect, useState } from 'react';
import MainSearch from '~/components/search/MainSearch.jsx';
import HistorySearch from '../components/search/HistorySearch';
function Search({handleCloseMainSearch}) {
    const [historySearch, setHistorySearch] = useState([]);
    const [isHistorySearch, setIsHistorySearch] = useState(false);

    useEffect(() => {
        const dataHistorySearch = localStorage.getItem('shop/user/searchQuery/header');

        if (dataHistorySearch) {
            const parsedData = JSON.parse(dataHistorySearch);

            // Lọc bỏ các phần tử rỗng
            const filteredData = parsedData.filter((item) => item.search.trim() !== '');

            if (filteredData.length > 0) {
                setIsHistorySearch(true);
            } else {
                setIsHistorySearch(false);
            }

            setHistorySearch(filteredData);
        }
    }, []);
    //delete data history searched 
    const handleDeleteHistorySearch = () => {
        setHistorySearch([])
        setIsHistorySearch(false)
        localStorage.setItem("shop/user/searchQuery/header", [])
    }

    return (
        <div className="w-full h-screen bg-white fixed z-10">
            <MainSearch handleCloseMainSearch={handleCloseMainSearch}/>
            {isHistorySearch && <HistorySearch handleCloseMainSearch={handleCloseMainSearch} handleDeleteHistorySearch={handleDeleteHistorySearch} historySearch={historySearch} />}
        </div>
    );
}

export default Search;
