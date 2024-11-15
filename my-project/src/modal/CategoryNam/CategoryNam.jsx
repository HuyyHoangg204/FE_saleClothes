import { Link } from "react-router-dom";


function CategoryNam() {
    return ( 
    <div style={{width: '1312px',height: '296px'}} className="bg-white z-10 cursor-default border flex justify-between px-10 pt-4 absolute bottom-[-296px] left-0 rounded-sm shadow font-sans">
        <div>
            <ul>
                <li className="font-semibold pb-2">Áo</li>
                <li className="font-light cursor-pointer hover:font-medium ">Áo thun</li>
                <li className="font-light cursor-pointer hover:font-medium">Áo khoác</li>
                <li className="font-light cursor-pointer hover:font-medium">Áo polo</li>
                <li className="font-light cursor-pointer hover:font-medium">
                    <Link to="/nam/ao-so-mi">Áo sơ mi</Link>
                </li>
                <li className="font-light cursor-pointer hover:font-medium">Áo len</li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="font-semibold pb-2">Quần</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần jean</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần short</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần dài</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần kaki</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần thể thao</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần âu</li>

            </ul>
        </div>
        <div>
            <ul>
                <li className="font-semibold pb-2">Giày</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày sneaker</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày boot nam</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày da</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày đế bệt</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày derby</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày oxford</li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="font-semibold pb-2">Phụ kiện</li>
                <li className="font-light cursor-pointer hover:font-medium">Thắt lưng</li>
                <li className="font-light cursor-pointer hover:font-medium">Túi đeo</li>
                <li className="font-light cursor-pointer hover:font-medium">Mũ nam</li>
                <li className="font-light cursor-pointer hover:font-medium">Cà vạt</li>
            </ul>
        </div>
        <div className="flex justify-around space-x-3">
           <div className="flex h-full items-center">
           <img className="object-cover h-[267px] w-[201px]" src="/images/maunam1.jpg" alt="" />
           <img className="object-cover h-[267px] w-[201px]" src="/images/maunam2.jpg" alt="" />
           </div>
        </div>
    </div> );
}

export default CategoryNam;