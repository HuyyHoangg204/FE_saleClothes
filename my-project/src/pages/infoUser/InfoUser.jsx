import React, { useEffect, useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import BreadCrumb from '../../components/BreadCrumb.jsx';
import MainHeader from '../../partials/MainHeader/MainHeader.jsx';
import SlidebarUser from '../../components/infoUser/SlidebarUser.jsx';
import SlideInfoUser from '../../components/infoUser/SlideInfoUser.jsx';
import SlideOrderManager from '../../components/infoUser/SlideOrderManager.jsx';
import SlideAddressUser from '../../components/infoUser/SlideAddressUser.jsx';
import SlideFavoriteUser from '../../components/infoUser/SlideFavoriteUser.jsx';
import SlideViewedUser from '../../components/infoUser/SlideViewedUser.jsx';
import SlideVoucherUser from '../../components/infoUser/SlideVoucherUser.jsx';
import SlideOrderDetail from '../../components/infoUser/SlideOrderDetail.jsx';
import Footer from '../../partials/Footer/Footer.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../../redux/apiRequest.js';

function InfoUser({ breadcrumb }) {
    // State để quản lý trang hiện tại
    const [currentPage, setCurrentPage] = useState('infoUser');
    const [viewingOrder, setViewingOrder] = useState(null);

    const dispatch = useDispatch()

    const user = useSelector((state) => state?.user?.user?.user);
    const loading = useSelector((state) => state?.user?.user?.isFetching);

    useEffect(() => {
        const accessToken = localStorage.getItem('token')
        const decodedToken = jwtDecode(accessToken)
        const fetchData = async () => {
            await getUserById(decodedToken.sub,accessToken,dispatch)
        }
        fetchData()
    },[])




    // Hàm để xử lý việc hiển thị các trang khác nhau
    const handleNavigation = (page) => {
        setCurrentPage(page);
        setViewingOrder(null); // Đặt lại đơn hàng đang xem về null khi chuyển trang khác
    };

    // Hàm để xem chi tiết đơn hàng
    const handleViewDetails = (orderId) => {
        setViewingOrder(orderId);
        setCurrentPage('orderDetail');
    };

    // Hàm để quay lại danh sách đơn hàng
    const handleBackToList = () => {
        setViewingOrder(null);
        setCurrentPage('orderManager');
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-[100%] bg-[#f5f5f5]">
            {/* Header */}
            <MainHeader />
            <div className="h-24"></div>
            <BreadCrumb breadcrumb={breadcrumb} />

            {/* Content */}
            <div className="flex px-[120px] mt-[40px]">
                {/* slide bar */}
                <SlidebarUser
                    username={user?.khUserName}
                    currentPage={currentPage}
                    handleClickInfoUser={() => handleNavigation('infoUser')}
                    handleClickOrderManager={() => handleNavigation('orderManager')}
                    handleClickAddressUser={() => handleNavigation('addressUser')}
                    handleClickFavoriteUser={() => handleNavigation('favoriteUser')}
                    handleClickViewedUser={() => handleNavigation('viewedUser')}
                    handleClickVoucherUser={() => handleNavigation('voucherUser')}
                />

                {/* Render các thành phần theo trạng thái của currentPage */}
                {currentPage === 'infoUser' && <SlideInfoUser user={user}/>}
                {currentPage === 'orderManager' && (
                    <SlideOrderManager onViewDetails={handleViewDetails} />
                )}
                {currentPage === 'orderDetail' && viewingOrder && (
                    <SlideOrderDetail orderId={viewingOrder} onBack={handleBackToList} />
                )}
                {currentPage === 'addressUser' && <SlideAddressUser />}
                {currentPage === 'favoriteUser' && <SlideFavoriteUser />}
                {currentPage === 'viewedUser' && <SlideViewedUser />}
                {currentPage === 'voucherUser' && <SlideVoucherUser />}
            </div>
            <div className="h-24"></div>
            {/* Footer */}
            <Footer/>
        </div>
    );
}

export default InfoUser;
