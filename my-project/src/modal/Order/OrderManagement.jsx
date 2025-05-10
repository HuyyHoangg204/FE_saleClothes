import { useState, useEffect, useRef } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import OrderEditModal from './OrderEditModal';
import { Pagination } from '@mui/material';
import { getAllOrder } from '../../redux/apiRequest';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

function OrderManagement({ setCurrentComponent,setOrderId }) {
    const [status, setStatus] = useState(null);
    const [statusName, setStatusName] = useState('All');
    const [dateFilter, setDateFilter] = useState('All time');
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(null);
    const [isStatusDropDown, setIsStatusDropDown] = useState(false);
    const [isDateDropDown, setIsDayDropDown] = useState(false);
    const [days, setDays] = useState(30);
    const [orders, setOrders] = useState([]); // Data

    const dropDownStatusRef = useRef(null);
    const dropDownDateRef = useRef(null);

    //Hàm cập nhật dữ liệu
    const fetchData = async () => {
        const res = await getAllOrder(currentPage);

        setOrders(res);
    };
    useEffect(() => {
        fetchData();
    }, []);

    const statusOrder = [
        { label: 'All', value: null },
        { label: 'Processing', value: 'PROCESSING' },
        { label: 'Shipped', value: 'SHIPPED' },
        { label: 'Delivered', value: 'DELIVERED' },
        { label: 'Cancelled', value: 'CANCELLED' },
        { label: 'Returned', value: 'RETURNED' },
        { label: 'Returned', value: 'RETURNED' },
    ];

    const dateRangeOption = [
        { label: 'All time', value: 9999999999 }, // You can adjust this as needed
        { label: 'Last 30 days', value: 30 },
        { label: 'Last 90 days', value: 90 },
        { label: 'Last 1 year', value: 365 },
    ];

    //Handle when click outside to close modal

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Nếu click ngoài dropdown status → tắt nó
            if (dropDownStatusRef.current && !dropDownStatusRef.current.contains(event.target)) {
                setIsStatusDropDown(false);
            }

            // Nếu click ngoài dropdown date → tắt nó
            if (dropDownDateRef.current && !dropDownDateRef.current.contains(event.target)) {
                setIsDayDropDown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //Handle pagination
    const itemsPerPage = 7; // số đơn hàng hiển thị mỗi trang

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

    const getStatusColor = (status) => {
        switch (status) {
            case 'DELIVERED':
                return 'bg-green-100 text-green-800';
            case 'SHIPPED':
                return 'bg-yellow-100 text-yellow-800';
            case 'PROCESSING':
                return 'bg-purple-100 text-purple-800';
            case 'CANCELLED':
                return 'bg-red-100 text-red-800';
            case 'RETURNED':
                return 'bg-orange-100 text-orange-800';
            case 'PENDING':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentColor = (payment) => {
        switch (payment) {
            case 'PAID':
                return 'bg-blue-100 text-blue-800';
            case 'UNPAID':
                return 'bg-red-100 text-red-800';
            case 'REFUNDED':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Handle click status
    const handleSelectStatus = (selected) => {
        setStatus(selected);
        setIsStatusDropDown(false);
    };

    // Handle click date filter
    const handleSelectDate = (data) => {
        setDays(data.value);
        setDateFilter(data.label);
        setIsDayDropDown(false);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Main Content */}
            <main className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Order Management</h2>

                {/* Filters */}
                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="pl-10 pr-4 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Status */}
                        <div className="relative" ref={dropDownStatusRef}>
                            <div
                                onClick={() => setIsStatusDropDown(true)}
                                className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer"
                            >
                                <span>Status: {statusName}</span>
                                {/* Mũi tên quay 180 độ khi dropdown mở */}
                                <motion.div
                                    animate={{ rotate: isStatusDropDown ? 180 : 0 }} // Quay mũi tên
                                    transition={{ duration: 0.3 }}
                                >
                                    <KeyboardArrowDownIcon />
                                </motion.div>
                            </div>

                            {/* Modal status với hiệu ứng di chuyển */}
                            {isStatusDropDown && (
                                <motion.div
                                    className="absolute z-10 mt-2 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto"
                                    initial={{ opacity: 0, y: -10 }} // Modal bắt đầu từ vị trí trên
                                    animate={{ opacity: 1, y: 0 }} // Modal sẽ di chuyển xuống
                                    exit={{ opacity: 0, y: -10 }} // Modal sẽ di chuyển lên khi đóng
                                    transition={{ duration: 0.3 }}
                                >
                                    {statusOrder.map((s, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                handleSelectStatus(s.value);
                                                setStatusName(s.label);
                                            }}
                                        >
                                            {s.label}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                        {/* Date */}
                        <div className="relative" ref={dropDownDateRef}>
                            <div
                                onClick={() => setIsDayDropDown(true)}
                                className="flex items-center justify-between border rounded px-4 py-2 cursor-pointer"
                            >
                                <span>Date: {dateFilter}</span>
                                {/* Mũi tên quay 180 độ khi dropdown mở */}
                                <motion.div
                                    animate={{ rotate: isDateDropDown ? 180 : 0 }} // Quay mũi tên
                                    transition={{ duration: 0.3 }}
                                >
                                    <KeyboardArrowDownIcon />
                                </motion.div>
                            </div>

                            {/* Modal với hiệu ứng di chuyển */}
                            {isDateDropDown && (
                                <motion.div
                                    className="absolute z-10 mt-2 w-full bg-white border rounded shadow-md max-h-60 overflow-y-auto"
                                    initial={{ opacity: 0, y: -10 }} // Modal bắt đầu từ vị trí trên
                                    animate={{ opacity: 1, y: 0 }} // Modal sẽ di chuyển xuống
                                    exit={{ opacity: 0, y: -10 }} // Modal sẽ di chuyển lên khi đóng
                                    transition={{ duration: 0.3 }}
                                >
                                    {dateRangeOption.map((s, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => handleSelectDate(s)}
                                        >
                                            {s.label}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <div className="flex gap-2">
                            <button className="px-4 py-2 border rounded hover:bg-gray-50">Export</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <h3 className="text-lg font-semibold p-4 border-b">Orders List</h3>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Order ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Customer</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Total</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Payment</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Delivery</th>
                                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {currentOrders.map((order, index) => (
                                    <tr key={`${order.id}-${index}`} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm text-gray-900">{order?.orderCode}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{order?.fullName}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {format(new Date(order?.orderDate), 'dd/MM/yyyy - HH:mm')}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {order?.totalAmount.toLocaleString('vi-VN')}đ
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                                    order?.status,
                                                )}`}
                                            >
                                                {order?.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentColor(
                                                    order?.paymentStatus,
                                                )}`}
                                            >
                                                {order?.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3  text-sm text-gray-900">{order?.deliveryMethod}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setCurrentComponent('orderDetail');
                                                        setOrderId(order?.orderId)
                                                    }}
                                                    className="text-gray-500 hover:text-gray-900"
                                                >
                                                    <VisibilityIcon />
                                                </button>
                                                {order.status !== 'SHIPPED' && order.status !== 'DELIVERED' && (
                                                    <button
                                                        className="text-gray-500 hover:text-gray-900"
                                                        onClick={() => {
                                                            setCurrentOrder(order);
                                                            setIsEditModalOpen(true);
                                                        }}
                                                    >
                                                        <EditIcon />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 flex justify-center">
                        <Pagination
                            count={Math.ceil(orders.length / itemsPerPage)}
                            page={currentPage}
                            onChange={(e, value) => setCurrentPage(value)}
                            color="primary"
                        />
                    </div>
                </div>
            </main>
            {isEditModalOpen && currentOrder && (
                <OrderEditModal
                    currentOrder={currentOrder}
                    setIsEditModalOpen={setIsEditModalOpen}
                    fetchData={fetchData}
                />
            )}
        </div>
    );
}

export default OrderManagement;
