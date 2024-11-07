import icon from '../../assets/icons/index.jsx';

function SlideVoucherUser({ handleChange }) {
    const coupons = [
        {
            id: 1,
            title: 'Giảm 15%',
            description: 'Voucher giảm 15% cho đơn từ 299k',
            expiry: '2024-10-31',
        },
        {
            id: 2,
            title: 'Giảm 15%',
            description: 'Voucher giảm 15% cho đơn từ 299k',
            expiry: '2024-10-31',
        },
        {
            id: 3,
            title: 'Giảm 15%',
            description: 'Voucher giảm 15% cho đơn từ 299k',
            expiry: '2024-10-31',
        },
    ];
    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">MÃ ƯU ĐÃI</div>
            <div className="space-y-4">
                {coupons.map((coupon) => (
                    <div
                        key={coupon.id}
                        className="border border-gray-200 rounded-lg p-4 flex justify-between items-center bg-gray-50"
                    >
                        <div>
                            <h3 className="text-lg font-bold">{coupon.title}</h3>
                            <p className="text-gray-700">{coupon.description}</p>
                            <p className="text-sm text-gray-500 mt-2">HSD: {coupon.expiry}</p>
                            <a href="#" className="text-blue-600 hover:underline text-sm mt-1 block">
                                Điều kiện
                            </a>
                        </div>
                        <button className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg hover:bg-green-200">
                            Mua ngay
                        </button>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                {/* Pagination Buttons */}
                <button className="px-3 py-1 border border-gray-300 mx-1 rounded hover:bg-gray-200">&lt;</button>
                <button className="px-3 py-1 border border-gray-300 mx-1 rounded bg-gray-200">1</button>
                <button className="px-3 py-1 border border-gray-300 mx-1 rounded hover:bg-gray-200">&gt;</button>
            </div>
        </div>
    );
}

export default SlideVoucherUser;
