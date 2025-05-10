import { useEffect, useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import { getAllOrderByUsername } from '../../redux/apiRequest.js';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

function SlideOrderManager({ handleChange, onViewDetails, handleGetData }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                const decodedToken = jwtDecode(accessToken);
                const username = decodedToken.sub;

                const res = await getAllOrderByUsername(username);
                setOrders(res);
                handleGetData(res);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">QUẢN LÝ ĐƠN HÀNG</div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-white">
                    <thead>
                        <tr className="border-b border-t">
                            <th className="py-3 text-center font-medium text-gray-700">Mã đơn hàng</th>
                            <th className="py-3 text-center font-medium text-gray-700">Ngày</th>
                            <th className="py-3 text-center font-medium text-gray-700">Trạng thái</th>
                            <th className="py-3 text-center font-medium text-gray-700">Số lượng</th>
                            <th className="py-3 text-center font-medium text-gray-700">Tổng tiền</th>
                            <th className="py-3 text-center text-blue-600 font-medium text-gray-700">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders?.map((order, index) => {
                            const totalQuantity = order?.orderDetails.reduce(
                                (total, detail) => total + detail.quantity,
                                0,
                            );

                            return (
                                <tr key={index} className="hover:bg-gray-100 border-b text-[14px] text-gray-800">
                                    <td className="py-4 text-center">{order?.orderCode}</td>
                                    <td className="py-4 text-center">
                                        {' '}
                                        {format(new Date(order?.orderDate), 'dd/MM/yyyy - HH:mm')}
                                    </td>
                                    <td className="py-4 text-center">
                                        <button
                                            onClick={() => onViewDetails(order?.orderCode)}
                                            className={`px-2 py-1 rounded-full text-[10px] font-semibold
                                                    ${
                                                        order?.status === 'PENDING'
                                                            ? 'bg-yellow-100 text-yellow-600'
                                                            : ''
                                                    }
                                                    ${order?.status === 'PROCESSING' ? 'bg-blue-100 text-blue-600' : ''}
                                                    ${order?.status === 'SHIPPED' ? 'bg-teal-100 text-teal-600' : ''}
                                                    ${
                                                        order?.status === 'DELIVERED'
                                                            ? 'bg-green-100 text-green-600'
                                                            : ''
                                                    }
                                                    ${order?.status === 'CANCELLED' ? 'bg-red-100 text-red-600' : ''}
                                                    ${
                                                        order?.status === 'RETURNED'
                                                            ? 'bg-purple-100 text-purple-600'
                                                            : ''
                                                    }
                                                `}
                                        >
                                            {order?.status === 'PENDING' && 'Chưa xử lý'}
                                            {order?.status === 'PROCESSING' && 'Đang xử lý'}
                                            {order?.status === 'SHIPPED' && 'Đã gửi hàng'}
                                            {order?.status === 'DELIVERED' && 'Đã giao hàng'}
                                            {order?.status === 'CANCELLED' && 'Đã hủy'}
                                            {order?.status === 'RETURNED' && 'Trả hàng'}
                                        </button>
                                    </td>
                                    <td className="py-4 text-center">{totalQuantity}</td>
                                    <td className="py-4 text-center">{order?.totalAmount.toLocaleString('vi-VN')}đ</td>
                                    <td className="py-4 text-center text-blue-600">
                                        <button
                                            onClick={() => onViewDetails(order.orderCode)}
                                            className="hover:underline"
                                        >
                                            Chi tiết
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SlideOrderManager;
