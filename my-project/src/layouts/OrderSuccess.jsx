import React, { useEffect } from 'react';
import MainHeader from '../partials/MainHeader/MainHeader';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import icons from '../assets/icons';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate()

    return (
        <div>
            {/* Header */}
            <MainHeader />
            <div className="h-24"></div>

            {/* Progress bar */}
            <div className="flex items-center justify-center mt-[30px] mb-[70px]">
                <div className="w-[20px] h-[20px] rounded-full bg-black relative">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Giỏ hàng</div>
                </div>
                <div className="w-[200px] h-[4px] bg-black"></div>
                <div className="w-[20px] h-[20px] rounded-full bg-black relative">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Đặt hàng</div>
                </div>
                <div className="w-[200px] h-[4px] bg-black"></div>
                <div className="w-[20px] h-[20px] rounded-full relative bg-black border border-[#cdcdcd]">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Thanh Toán</div>
                </div>
                <div className="w-[200px] h-[4px] bg-black"></div>
                <div className="w-[20px] h-[20px] rounded-full relative bg-black border border-[#cdcdcd]">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Hoàn tất</div>
                </div>
            </div>

            {/* Modal order success */}
            <div>
                <div className="flex justify-center items-center">
                    <CheckCircleIcon sx={{ fontSize: 100, color: 'green' }} />
                </div>
                <div className="flex justify-center items-center">
                    <p className="font-bold text-[28px]">Đặt hàng thành công!</p>
                </div>
                <div className="flex justify-center mt-4">
                    <div className="max-w-[600px] text-center">
                        <p className="font-medium text-[14px]">
                            🔔 Cảm ơn bạn đã đặt hàng, bộ phận chăm sóc khách hàng của chúng tôi sẽ liên hệ với bạn
                            trong vòng 24h để xác nhận, hãy để ý điện thoại bạn nhé!
                        </p>
                    </div>
                </div>
                <div className="flex justify-center space-x-6 mt-4">
                    <button onClick={() => navigate('/')} className="w-[210px] h-[40px] rounded-lg border border-black font-semibold text-[16px] hover:bg-black hover:text-white transition duration-300">
                        Quay về trang chủ
                    </button>
                    <button onClick={() => navigate('/danh-muc/nam/ao-thun')} className="w-[210px] h-[40px] rounded-lg border border-black font-semibold text-[16px] hover:bg-black hover:text-white transition duration-300">
                        Xem sản phẩm khác
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center mt-8">
                    <div className="text-[16px] font-medium mb-2">Theo dõi chúng tôi trên</div>
                    <div className="flex items-center space-x-4">
                        <a href="https://www.facebook.com/huyy.hoang.2304" target="_blank" rel="noopener noreferrer">
                            <FacebookIcon fontSize="large" sx={{ color: '#1877F2' }} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <InstagramIcon fontSize="large" sx={{ color: '#C13584' }} />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <YouTubeIcon fontSize="large" sx={{ color: '#FF0000' }} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
