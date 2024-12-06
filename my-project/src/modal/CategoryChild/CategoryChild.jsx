import '~/css/header.css';

function CategoryChild() {
    return ( 
        <div style={{width: '1312px',height: '310px', top: "6rem", left: "50%", transform: "translate(-50%, 0)"}} 
        className="top36rem bg-white z-10 cursor-default border flex justify-between px-10 pt-4 fixed rounded-sm shadow font-sans">
        <div>
            <ul>
                <li className="font-semibold pb-2">Bé nam</li>
                <li className="font-light cursor-pointer hover:font-medium">Áo bé nam</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần bé nam</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày bé nam</li>
                <li className="font-light cursor-pointer hover:font-medium">Phụ kiện bé nam</li>
            </ul>
        </div>
        <div>
            <ul>
                <li className="font-semibold pb-2">Bé nữ</li>
                <li className="font-light cursor-pointer hover:font-medium">Áo bé nữ</li>
                <li className="font-light cursor-pointer hover:font-medium">Quần bé nữ</li>
                <li className="font-light cursor-pointer hover:font-medium">Váy bé nữ</li>
                <li className="font-light cursor-pointer hover:font-medium">Chân váy bé nữ</li>
                <li className="font-light cursor-pointer hover:font-medium">Giày bé nữ</li>
                <li className="font-light cursor-pointer hover:font-medium">Phụ kiện bé nữ</li>

            </ul>
        </div>
        <div className="flex justify-around space-x-3">
            <div className="flex h-full items-center space-x-2">
            <img className="object-cover h-[267px] w-[201px]" src="/images/maubenam.webp" alt="" />
            <img className="object-cover h-[267px] w-[201px]" src="/images/maubenam1.webp" alt="" />
            <div style={{width:'1px'}} className=" h-60  bg-black opacity-20 mx-2"></div>
            <img className="object-cover h-[267px] w-[201px]" src="/images/maubenu.webp" alt="" />
            <img className="object-cover h-[267px] w-[201px]" src="/images/maubenu1.webp" alt="" />
            </div>
        </div>
    </div> 
     );
}

export default CategoryChild;