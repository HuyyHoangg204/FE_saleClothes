import icon from '../../assets/icons/index.jsx';

function SlideOrderManager({ handleChange, onViewDetails   }) {
    const orders = [
        {
          id: 'CNF000092998',
          date: '03/11/2024 - 03:39',
          status: 'Đang vận chuyển',
          quantity: 1,
          total: '499.000đ',
          detailLink: '#'
        },
    ];
    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">QUẢN LÝ ĐƠN HÀNG</div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm bg-white">
                    <thead>
                        <tr className='border-b border-t'>
                            <th className="py-3 text-center font-medium text-gray-700">Mã đơn hàng</th>
                            <th className="py-3 text-center font-medium text-gray-700">Ngày</th>
                            <th className="py-3 text-center font-medium text-gray-700">Trạng thái</th>
                            <th className="py-3 text-center font-medium text-gray-700">Số lượng</th>
                            <th className="py-3 text-center font-medium text-gray-700">Tổng tiền</th>
                            <th className="py-3 text-center text-blue-600 font-medium text-gray-700">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="hover:bg-gray-100 border-b text-[14px] text-gray-800">
                                <td className="py-4 text-center">{order.id}</td>
                                <td className="py-4 text-center">{order.date}</td>
                                <td className="py-4 text-center">
                                    <button onClick={() => onViewDetails(order.id)} className="px-2 py-1 rounded-full text-[10px] font-semibold bg-blue-100 text-blue-600">
                                        {order.status}
                                    </button>
                                </td>
                                <td className="py-4 text-center">{order.quantity}</td>
                                <td className="py-4 text-center">{order.total}</td>
                                <td className="py-4 text-center text-blue-600">
                                    <button onClick={() => onViewDetails(order.id)} className="hover:underline">
                                        Chi tiết
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SlideOrderManager;
