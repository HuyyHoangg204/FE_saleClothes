import { useEffect, useRef, useState } from 'react';
import icons from '../../assets/icons';
import CloseIcon from '@mui/icons-material/Close';
import { getSuggestion } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

function MainSearch({ handleCloseMainSearch }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const inputRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current?.focus(); // Focus vào input khi component mount
    }, []);

    // Handle show suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length >= 1) {
                try {
                    const res = await getSuggestion(query);
                    console.log(res);
                    setSuggestions(res);
                    setShowSuggestions(true);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setShowSuggestions(false);
                setSuggestions([]);
            }
        };
        const timeOutId = setTimeout(fetchSuggestions, 500);
        return () => clearTimeout(timeOutId);
    }, [query]);
    // handle click search product
    const handleClickSearchProduct = (id) => {
        console.log(id);
        handleCloseMainSearch();
        navigate(`/product/${id}`);
    };
    // handle enter search product
    const handleEnterSearchProduct = (e) => {
        if (e.key !== 'Enter') return;   // chỉ xử lý Enter
        if (query.trim().length > 0) {
          navigate(`/tim-kiem/${encodeURIComponent(query.trim())}`);
          handleCloseMainSearch()
        } else {
          handleCloseMainSearch();
        }
      };
      
    // handle change data search
    const handleChangeInputSearch = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <div className="top-0 z-10 w-full h-[100px] flex bg-white justify-between items-center px-28 font-sans text-l border-b shadow">
                {/* Ô tìm kiếm */}
                <div className="flex items-center w-[1096px] h-10 border border-[#daf1f7] rounded-3xl px-3">
                    <img className="w-7 h-6 mr-2" src={icons.iconSearch} alt="" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={handleChangeInputSearch}
                        onKeyDown={handleEnterSearchProduct}
                        placeholder="TÌM KIẾM SẢN PHẨM"
                        className="w-full opacity-60 p-1 outline-none border-none focus:outline-none focus:ring-0 focus:border-none h-[40px]"
                    />
                    <span onClick={() => setQuery('')} className="cursor-pointer text-gray-500 hover:text-black">
                        Xóa
                    </span>
                </div>
                {/* Hủy tìm kiếm */}
                <div
                    onClick={() => handleCloseMainSearch()}
                    className="w-[48px] h-[48px] rounded-full bg-[#fafafa] flex items-center justify-center cursor-pointer"
                >
                    <CloseIcon />
                </div>
            </div>
            {showSuggestions && suggestions?.length > 0 && (
                <div className="px-28">
                    {suggestions.map((suggestion, index) => {
                        if (!suggestion[1]) return null; // Kiểm tra nếu phần tử bị undefined

                        // Hàm chuyển chuỗi có dấu thành không dấu
                        const removeAccents = (str) => {
                            return str
                                .normalize('NFD')
                                .replace(/[\u0300-\u036f]/g, '')
                                .replace(/đ/g, 'd')
                                .replace(/Đ/g, 'D');
                        };

                        // Tạo phiên bản không dấu để tìm kiếm
                        const plainText = removeAccents(suggestion[1]);
                        const plainQuery = removeAccents(query);

                        if (!plainQuery.trim())
                            return (
                                <div key={index} className="py-2 font-medium">
                                    {suggestion[1]}
                                </div>
                            ); // Nếu query rỗng, không làm gì

                        // Tìm vị trí khớp trong chuỗi không dấu
                        const positions = [];
                        const regex = new RegExp(plainQuery, 'gi');
                        let match;
                        while ((match = regex.exec(plainText)) !== null) {
                            positions.push({ start: match.index, end: match.index + plainQuery.length });
                        }

                        // Highlight trong chuỗi gốc có dấu
                        let highlightedText = suggestion[1];
                        let offset = 0;

                        positions.forEach((pos) => {
                            const beforeHighlight = highlightedText.substring(0, pos.start + offset);
                            const toHighlight = highlightedText.substring(pos.start + offset, pos.end + offset);
                            const afterHighlight = highlightedText.substring(pos.end + offset);

                            highlightedText = `${beforeHighlight}<span class="font-bold text-black">${toHighlight}</span>${afterHighlight}`;
                            offset += '<span class="font-bold text-black">'.length + '</span>'.length;
                        });

                        return (
                            <div
                                key={index}
                                className="py-2 font-medium cursor-pointer"
                                dangerouslySetInnerHTML={{ __html: highlightedText }}
                                onClick={() => handleClickSearchProduct(suggestion[0])}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default MainSearch;
