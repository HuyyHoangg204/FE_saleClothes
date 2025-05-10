import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { getDataOrderToEdit, updateStatusOrder } from '../../redux/apiRequest';
import { format } from 'date-fns';
import { toast } from 'react-toastify';

const statusDescriptions = {
    DELIVERED: 'Đơn đã được giao cho khách hàng.',
    SHIPPED: 'Đơn đã được gửi đi.',
    PROCESSING: 'Đơn đang được xử lý.',
    CANCELLED: 'Đơn đã bị hủy.',
    PENDING: 'Đơn mới tạo, đang chờ xử lý.',
    RETURNED: 'Khách đã trả hàng.',
};

// Xác định trạng thái kế tiếp được phép
const allowedNextStatuses = {
    PENDING: ['PROCESSING', 'CANCELLED'],
    PROCESSING: ['SHIPPED', 'CANCELLED'],
    SHIPPED: ['DELIVERED', 'RETURNED'],
    DELIVERED: ['RETURNED'],
    CANCELLED: [],
    RETURNED: [],
};

function OrderEditModal({ currentOrder, setIsEditModalOpen,fetchData }) {
    const [data, setData] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(currentOrder?.status || '');
    const [description, setDescription] = useState('');

    // Gọi Api lấy dữ liệu để render ra giao diện
    useEffect(() => {
        const fetchData = async () => {
            const res = await getDataOrderToEdit(currentOrder?.orderId);
            setData(res);
            
        };
        fetchData();
    }, []);


    const handleChangeStatus = (e) => {
        const value = e.target.value;
        setSelectedStatus(value);
        setDescription(statusDescriptions[value] || '');
    };

    const getAvailableOptions = () => {
        const current = data?.status;
        const nextStatuses = allowedNextStatuses[current] || [];
        return Object.keys(statusDescriptions).map((status) => ({
            value: status,
            label: status,
            disabled: status !== current && !nextStatuses.includes(status),
        }));
    };

    //Handle click edit order
    const handleClickEditOrder = async () => {
        const newData = {
            orderStatus: selectedStatus,
            description: description,
        };
        const orderId = currentOrder?.orderId;

        if (selectedStatus) {
            await updateStatusOrder(orderId, newData)
            fetchData()
            setIsEditModalOpen(false);
        } else {
            toast.warning('Bạn chưa thay đổi trạng thái đơn hàng!');
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="text-lg font-semibold">Edit Order {data?.orderCode}</h3>
                    <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsEditModalOpen(false)}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Order Details */}
                        <div>
                            <h4 className="font-medium text-gray-700 mb-4">Order Information</h4>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Code</label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full bg-gray-100"
                                        value={data?.orderCode}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full"
                                        value={
                                            data?.orderDate
                                                ? format(new Date(data?.orderDate), 'dd/MM/yyyy - HH:mm')
                                                : ''
                                        }
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full"
                                        value={
                                            typeof data?.totalAmount === 'number'
                                                ? data.totalAmount.toLocaleString('vi-VN') + 'đ'
                                                : ''
                                        }
                                        readOnly
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select
                                        className="border rounded px-3 py-2 w-full"
                                        value={selectedStatus}
                                        onChange={handleChangeStatus}
                                    >
                                        {getAvailableOptions().map((opt) => (
                                            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {description && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Mô tả trạng thái
                                        </label>
                                        <textarea
                                            className="border rounded px-3 py-2 w-full"
                                            rows="3"
                                            disabled
                                            value={description}
                                        ></textarea>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                                    <select className="border rounded px-3 py-2 w-full" value={data?.paymentStatus}>
                                        <option value="PAID">PAID</option>
                                        <option value="UNPAID">UNPAID</option>
                                        <option value="REFUNDED">REFUNDED</option>
                                        <option value="RETURNED">RETURNED</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Delivery Method
                                    </label>
                                    <select className="border rounded px-3 py-2 w-full" value={data?.deliveryMethod}>
                                        <option value="EXPRESS">EXPRESS</option>
                                        <option value="FAST">FAST</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Customer Details */}
                        <div>
                            <h4 className="font-medium text-gray-700 mb-4">Customer Information</h4>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Customer Name
                                    </label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full"
                                        value={data?.addressDTO?.fullName}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full"
                                        value={data?.addressDTO?.userName}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        className="border rounded px-3 py-2 w-full"
                                        value={data?.addressDTO?.phoneNumber}
                                        disabled
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Shipping Address
                                    </label>
                                    <textarea
                                        className="border rounded px-3 py-2 w-full"
                                        rows="3"
                                        disabled
                                        value={`${data?.addressDTO?.detailAddress}, ${data?.addressDTO?.village}, ${data?.addressDTO?.district}, ${data?.addressDTO?.province}`}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="mt-8">
                        <h4 className="font-medium text-gray-700 mb-4">Order Items</h4>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">Product</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">Variant</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">Price</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">Quantity</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500">Total</th>
                                        <th className="px-4 py-2 text-left font-medium text-gray-500"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {data?.productEditOrderDTOS?.map((product, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{product.name}</td>
                                            <td className="px-4 py-2">
                                                {product.colorName} | {product.size}{' '}
                                            </td>
                                            <td className="px-4 py-2">{product.base_price.toLocaleString('vi-VN')}đ</td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    className="border rounded w-16 px-2 py-1"
                                                    value={product.quantity}
                                                    min="1"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{product.total.toLocaleString('vi-VN')}đ</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t p-4 bg-gray-50">
                    <button
                        className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                        onClick={() => setIsEditModalOpen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1"
                        onClick={() => {
                            // Save logic here
                            handleClickEditOrder();
                        }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default OrderEditModal;
