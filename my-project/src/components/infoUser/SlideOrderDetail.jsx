import React from 'react';

function OrderDetails({ orderId, onBack }) {
    // Dữ liệu mẫu chi tiết đơn hàng
    const orderDetails = {
        id: 'CNF000092998',
        date: '03/11/2024 - 03:39',
        status: 'Đang vận chuyển',
        customerName: 'Hoang',
        phone: '0965523100',
        address: 'KĐT Văn Canh, Huyện Hoài Đức, Hà Nội',
        payment: 'Thanh toán khi nhận hàng',
        items: [
            {
                name: 'Combo 2 khăn mặt',
                color: 'Hồng',
                size: 'XL',
                price: '79.000đ',
                quantity: 1,
                total: '499.000đ',
            },
        ],
        totalAmount: '499.000đ',
    };

    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <button onClick={onBack} className="text-blue-600 hover:underline mb-4 inline-block">
                &lt; Quay lại
            </button>
            <h2 className="text-2xl font-semibold mb-6">Mã đơn hàng: {orderDetails.id}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-bold mb-2">Thông tin người nhận</h3>
                    <p className="text-gray-700">Người nhận: {orderDetails.customerName}</p>
                    <p className="text-gray-700">Số điện thoại: {orderDetails.phone}</p>
                    <p className="text-gray-700">Địa chỉ: {orderDetails.address}</p>
                    <p className="text-gray-700">Thanh toán: {orderDetails.payment}</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Theo dõi đơn hàng</h3>
                    <p className="text-gray-700">Trạng thái: {orderDetails.status}</p>
                    <ul className="list-inside list-disc text-gray-700">
                        <li>Đã giao cho đơn vị vận chuyển (20:44, 01/11/2024)</li>
                        <li>Đang xử lý (20:44, 01/11/2024)</li>
                        <li>Đặt hàng thành công (20:44, 01/11/2024)</li>
                    </ul>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-bold mb-2">Sản phẩm</h3>
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Tên sản phẩm
                            </th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Giá</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">Số lượng</th>
                            <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                                Tổng cộng
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderDetails.items.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="px-6 py-4 border-b text-sm text-gray-800">{item.name}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-800">{item.price}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-800">{item.quantity}</td>
                                <td className="px-6 py-4 border-b text-sm text-gray-800">{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="mt-4 text-right">
                    <p className="font-bold text-lg">Tổng tiền thanh toán: {orderDetails.totalAmount}</p>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
