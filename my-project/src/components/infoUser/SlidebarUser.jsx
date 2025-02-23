import icon from '../../assets/icons/index.jsx';
import { useState } from 'react';
import { useNavigate } from "react-router";
import PersonIcon from '@mui/icons-material/Person';

function SlidebarUser({
    currentPage,
    handleClickInfoUser,
    handleClickOrderManager,
    handleClickAddressUser,
    handleClickFavoriteUser,
    handleClickViewedUser,
    handleClickVoucherUser,
    username
}) {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate("/login")
    }
    return (
        <div className="w-[320px] bg-white mr-[25px] h-[730px]">
            {/* img */}
            <div className="w-full flex flex-col items-center mt-5 mb-10">
            <PersonIcon style={{ fontSize: "50px" }} />

                <div className="mt-2 font-semibold w-[90%] text-center truncate">{username}</div>
            </div>
            <ul className="cursor-pointer">
                <li
                    onClick={handleClickInfoUser}
                    className={`flex items-center h-[52px] hover:bg-[#eaebf6] ${
                        currentPage === 'infoUser' ? 'bg-[#eaebf6]' : 'bg-white'
                    } pl-5`}
                >
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconAccount} alt="" />
                    </div>
                    <div className="">Thông tin tài khoản</div>
                </li>
                <li
                    onClick={handleClickOrderManager}
                    className={`flex items-center h-[52px] hover:bg-[#eaebf6] ${
                        currentPage === 'orderManager' || currentPage === 'orderDetail' ? 'bg-[#eaebf6]' : 'bg-white'
                    } pl-5`}
                >
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconProduct} alt="" />
                    </div>
                    <div className="">Quản lý đơn hàng</div>
                </li>
                <li
                    onClick={handleClickAddressUser}
                    className={`flex items-center h-[52px] hover:bg-[#eaebf6] ${
                        currentPage === 'addressUser' ? 'bg-[#eaebf6]' : 'bg-white'
                    } pl-5`}
                >
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconAddress} alt="" />
                    </div>
                    <div className="">Số địa chỉ</div>
                </li>
                <li
                    onClick={handleClickFavoriteUser}
                    className={`flex items-center h-[52px] hover:bg-[#eaebf6] ${
                        currentPage === 'favoriteUser' ? 'bg-[#eaebf6]' : 'bg-white'
                    } pl-5`}
                >
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconFavorite} alt="" />
                    </div>
                    <div className="">Yêu thích</div>
                </li>
                <li
                    onClick={handleClickViewedUser}
                    className={`flex items-center h-[52px] hover:bg-[#eaebf6] ${
                        currentPage === 'viewedUser' ? 'bg-[#eaebf6]' : 'bg-white'
                    } pl-5`}
                >
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconEye} alt="" />
                    </div>
                    <div className="">Đã xem gần đây</div>
                </li>
                <li
                    onClick={handleClickVoucherUser}
                    className={`flex items-center h-[52px] hover:bg-[#eaebf6] ${
                        currentPage === 'voucherUser' ? 'bg-[#eaebf6]' : 'bg-white'
                    } pl-5`}
                >
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconMoveTicket} alt="" />
                    </div>
                    <div className="">Mã ưu đãi</div>
                </li>
                <li onClick={handleLogout} className="flex items-center h-[52px] hover:bg-[#eaebf6] pl-5">
                    <div className="mr-3">
                        <img className="w-[30px] h-[30px]" src={icon.iconLogout} alt="" />
                    </div>
                    <div className="">Đăng xuất</div>
                </li>
            </ul>
        </div>
    );
}

export default SlidebarUser;
