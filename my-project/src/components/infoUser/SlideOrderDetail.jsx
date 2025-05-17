import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axiosInstance from '../../redux/axiosConfig';
import { getDataProductToShowOrder } from '../../redux/apiRequest';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
function OrderDetails({ orderId, onBack, data }) {
    // Dữ liệu
    const [orderDetail, setOrderDetail] = useState({});
    const [productInfoList, setProductInfoList] = useState([]);

    const username = jwtDecode(localStorage.getItem("token")).sub;

    useEffect(() => {
        const fetchAllProductData = async () => {
            const results = await Promise.all(
                orderDetail.orderDetails.map((item) => getDataProductToShowOrder(item.productVariantId, username)),
            );
            setProductInfoList(results);
        };

        if (orderDetail?.orderDetails) {
            fetchAllProductData();
        }
    }, [orderDetail, username]);

    // Payment method
    const paymentMethodMap = {
        COD: 'Thanh toán khi nhận hàng',
        BANK_TRANSFER: 'Chuyển khoản ngân hàng',
        E_WALLET: 'Ví điện tử',
        CREDIT_CARD: 'Thẻ tín dụng',
        VNPAY: 'Thanh toán qua VNPAY',
    };

    // Status order
    const statusMap = {
        PENDING: 'Chờ xử lý',
        PROCESSING: 'Đang xử lý',
        SHIPPED: 'Đã gửi hàng',
        DELIVERED: 'Đã giao hàng',
        CANCELLED: 'Đã hủy',
        RETURNED: 'Trả hàng',
    };

    useEffect(() => {
        setOrderDetail(data[0]);
    }, [data]);

    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <button onClick={onBack} className="text-blue-600 hover:underline mb-4 inline-block">
                &lt; Quay lại
            </button>
            <h2 className="text-2xl font-semibold mb-6">Mã đơn hàng: {orderDetail?.orderCode}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className='space-y-1'>
                    <h3 className="font-bold mb-2">Thông tin người nhận</h3>
                    <p className="text-gray-700">Người nhận: {orderDetail?.address?.fullName}</p>
                    <p className="text-gray-700">Số điện thoại: {orderDetail?.address?.phoneNumber}</p>
                    <p className="text-gray-700">
                        Địa chỉ:{' '}
                        {`${orderDetail?.address?.detailAddress},${orderDetail?.address?.village},${orderDetail?.address?.district},${orderDetail?.address?.province}`}
                    </p>
                    <p className="text-gray-700">
                        Thanh toán: {paymentMethodMap[orderDetail?.paymentMethod] || 'Không xác định'}
                    </p>
                </div>
                <div>
                    <h3 className="font-bold mb-2">Theo dõi đơn hàng</h3>
                    <p className="text-gray-700">Trạng thái: {statusMap[orderDetail?.status] || 'Không xác định'}</p>
                    <ul className="list-inside list-disc text-gray-700">
                        {orderDetail?.orderStatusHistories?.map((statusHistory, index) => (
                            <li key={index}>
                                {statusHistory.description}(
                                {format(new Date(statusHistory?.statusDate), 'HH:mm - dd/MM/yyyy')})
                            </li>
                        ))}
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
                        {orderDetail?.orderDetails?.map((item, index) => {
                            const product = productInfoList[index];
                            const total = item.quantity * (product?.base_price || 0);

                            return (
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">
                                        {product?.name || '...'}
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">
                                        {product?.base_price?.toLocaleString('vi-VN') || '...'}đ
                                    </td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{item.quantity}</td>
                                    <td className="px-6 py-4 border-b text-sm text-gray-800">{total.toLocaleString('vi-VN')}đ</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4 text-right">
                    <p className="font-bold text-lg">Tổng tiền thanh toán: {orderDetail?.totalAmount?.toLocaleString('vi-VN')}đ</p>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
