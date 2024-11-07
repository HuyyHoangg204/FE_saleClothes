import icon from '../../assets/icons/index.jsx';
import { useState } from 'react';

function SlidebarUser({
    currentPage,
    handleClickInfoUser,
    handleClickOrderManager,
    handleClickAddressUser,
    handleClickFavoriteUser,
    handleClickViewedUser,
    handleClickVoucherUser
}) {
    return (
        <div className="w-[320px] bg-white mr-[25px] h-[730px]">
            {/* img */}
            <div className="w-full flex flex-col items-center mt-5 mb-10">
                <img
                    className="w-[90px] h-[90px] rounded-full object-cover"
                    src="https://scontent.fhan12-1.fna.fbcdn.net/v/t39.30808-6/461049159_1068558491586290_3845263124647077920_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeE871c_8NOMyWyK944wYROoJBTiHj56BGMkFOIePnoEY_A_zRRRhJOF-f8juVpd_YuRIxKEMPOP9tVlVBhhD00l&_nc_ohc=LwwVGdvN8twQ7kNvgHfb0IK&_nc_zt=23&_nc_ht=scontent.fhan12-1.fna&_nc_gid=AQfLGWr5v4PDHjXHcqxKeWp&oh=00_AYAAej82-P73Knm9EH8sR2yT018vmmfVD8O57CdSmJgixg&oe=672D08DE"
                    alt=""
                />
                <div className="mt-2 font-semibold">ADMIN</div>
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
                <li className="flex items-center h-[52px] hover:bg-[#eaebf6] pl-5">
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
