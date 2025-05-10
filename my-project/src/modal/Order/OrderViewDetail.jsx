import { useEffect, useState } from 'react';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { getAllDataDetail } from '../../redux/apiRequest';

export default function OrderViewDetail({ setCurrentComponent, orderId }) {
    const [currentStatus, setCurrentStatus] = useState('SHIPPED');
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const res = await getAllDataDetail(orderId);
            console.log(res);

            setData(res);
        };
        fetchData();
    }, []);

    // Status label styles
    const getStatusStyle = (status) => {
        switch (status) {
            case 'SHIPPED':
                return 'bg-yellow-100 text-yellow-800';
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'PROCESSING':
                return 'bg-blue-100 text-blue-800';
            case 'PENDING':
                return 'bg-gray-100 text-gray-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            case 'PAID':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            {/* Back button */}
            <button
                onClick={() => setCurrentComponent('order')}
                className="flex items-center mb-4 px-4 py-2 bg-white border rounded hover:bg-gray-50"
            >
                <KeyboardArrowLeftIcon className="mr-2" />
                Back
            </button>

            {/* Header */}
            <h1 className="text-2xl font-bold mb-6">Order Details: {data?.orderCode}</h1>

            {/* Order and Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Order Information */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Order Information</h2>

                    <div className="grid grid-cols-3 gap-y-4">
                        <div className="text-gray-600">Order ID:</div>
                        <div className="col-span-2 font-medium">{data?.orderCode}</div>

                        <div className="text-gray-600">Order Date:</div>
                        <div className="col-span-2">{data?.orderDate}</div>

                        <div className="text-gray-600">Payment Method:</div>
                        <div className="col-span-2">{data?.paymentMethod}</div>

                        <div className="text-gray-600">Payment Status:</div>
                        <div className="col-span-2">
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                                    data?.paymentStatus,
                                )}`}
                            >
                                {data?.paymentStatus}
                            </span>
                        </div>

                        <div className="text-gray-600">Delivery Method:</div>
                        <div className="col-span-2">{data?.deliveryMethod}</div>

                        <div className="text-gray-600">Shipping Fee:</div>
                        <div className="col-span-2">{data?.shippingFee}</div>
                    </div>
                </div>

                {/* Customer Information */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Customer Information</h2>

                    <div className="grid grid-cols-3 gap-y-4">
                        <div className="text-gray-600">Customer:</div>
                        <div className="col-span-2 font-medium">{data?.addressDTO?.fullName}</div>

                        <div className="text-gray-600">Username:</div>
                        <div className="col-span-2">{data?.addressDTO?.fullName}</div>

                        <div className="text-gray-600">Phone:</div>
                        <div className="col-span-2">{data?.addressDTO?.phoneNumber}</div>

                        <div className="text-gray-600">Shipping Address:</div>
                        <div className="col-span-2 whitespace-pre-line">{`${data?.addressDTO?.detailAddress}, ${data?.addressDTO?.village}, ${data?.addressDTO?.district}, ${data?.addressDTO?.province}`}</div>
                    </div>
                </div>
            </div>

            {/* Status History */}
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Status History</h2>

                <div className="relative">
                    {data?.orderStatusHistoryDTOS?.map((item, index) => (
                        <div key={index} className="flex mb-8 relative">
                            {/* Timeline line */}
                            {index < data?.orderStatusHistoryDTOS.length - 1 && (
                                <div className="absolute left-3 top-3 bottom-0 w-0.5 bg-blue-200"></div>
                            )}

                            {/* Status dot */}
                            <div
                                className={`w-6 h-6 rounded-full ${
                                    index <= data?.orderStatusHistoryDTOS.findIndex((s) => s.status === currentStatus)
                                        ? 'bg-blue-500'
                                        : 'bg-gray-300'
                                } flex-shrink-0 z-10`}
                            ></div>

                            {/* Status details */}
                            <div className="ml-4">
                                <div className="font-semibold">{item.status}</div>
                                {item.timestamp && <div className="text-sm text-gray-500">{item.statusDate}</div>}
                                {item.description && (
                                    <div className="text-sm text-gray-700 mt-1">{item.description}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
