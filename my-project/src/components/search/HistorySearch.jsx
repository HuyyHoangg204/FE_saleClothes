import { useNavigate } from 'react-router-dom';

function HistorySearch({ historySearch, handleDeleteHistorySearch, handleCloseMainSearch }) {
    const navigate = useNavigate();
    const handleClickSearchByHistory = (query) => {
        navigate(`/tim-kiem/${encodeURIComponent(query)}`);
        handleCloseMainSearch();
    };

    return (
        <div className="mt-[30px] px-28 ">
            <div className="space-x-4">
                <span className="font-semibold text-[22px]">Lịch sử tìm kiếm</span>
                <span onClick={() => handleDeleteHistorySearch()} className="text-red-400 font-semibold cursor-pointer">
                    Xóa
                </span>
            </div>
            <div className="flex space-x-5 mt-2">
                {historySearch.map((search) => (
                    <div
                        onClick={() => handleClickSearchByHistory(search.search)}
                        className="px-[16px] py-[7px] rounded-full border border-[#edf1f5] hover:bg-[#74869b] cursor-pointer"
                    >
                        {search.search}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HistorySearch;
