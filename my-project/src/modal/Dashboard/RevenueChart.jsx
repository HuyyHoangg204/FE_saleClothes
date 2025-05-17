import { useState, useEffect } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { getAllDataFullDaily, getAllDataMonthly, getAllDataWeekly, getAllDataYearly } from '../../redux/apiRequest';

// Dữ liệu mẫu - Dữ liệu theo ngày cho cả tháng
// const fullDailyData = [
//     { date: '2025-05-01', name: '01/05', revenue: 4000 },
//     { date: '2025-05-02', name: '02/05', revenue: 3000 },
//     { date: '2025-05-03', name: '03/05', revenue: 2000 },
//     { date: '2025-05-04', name: '04/05', revenue: 2780 },
//     { date: '2025-05-05', name: '05/05', revenue: 1890 },
//     { date: '2025-05-06', name: '06/05', revenue: 2390 },
//     { date: '2025-05-07', name: '07/05', revenue: 3490 },
//     { date: '2025-05-08', name: '08/05', revenue: 3210 },
//     { date: '2025-05-09', name: '09/05', revenue: 2940 },
//     { date: '2025-05-10', name: '10/05', revenue: 3580 },
//     { date: '2025-05-11', name: '11/05', revenue: 2860 },
//     { date: '2025-05-12', name: '12/05', revenue: 2570 },
//     { date: '2025-05-13', name: '13/05', revenue: 3250 },
//     { date: '2025-05-14', name: '14/05', revenue: 3820 },
//     { date: '2025-05-15', name: '15/05', revenue: 4120 },
//     { date: '2025-05-16', name: '16/05', revenue: 3950 },
//     { date: '2025-05-17', name: '17/05', revenue: 2840 },
//     { date: '2025-05-18', name: '18/05', revenue: 3100 },
//     { date: '2025-05-19', name: '19/05', revenue: 3580 },
//     { date: '2025-05-20', name: '20/05', revenue: 4230 },
//     { date: '2025-05-21', name: '21/05', revenue: 3980 },
//     { date: '2025-05-22', name: '22/05', revenue: 3650 },
//     { date: '2025-05-23', name: '23/05', revenue: 3940 },
//     { date: '2025-05-24', name: '24/05', revenue: 2980 },
//     { date: '2025-05-25', name: '25/05', revenue: 2780 },
//     { date: '2025-05-26', name: '26/05', revenue: 3470 },
//     { date: '2025-05-27', name: '27/05', revenue: 4180 },
//     { date: '2025-05-28', name: '28/05', revenue: 4320 },
//     { date: '2025-05-29', name: '29/05', revenue: 3890 },
//     { date: '2025-05-30', name: '30/05', revenue: 4250 },
//     { date: '2025-05-31', name: '31/05', revenue: 3670 },
// ];

// const weeklyData = [
//     { name: 'Tuần 1', revenue: 15000 },
//     { name: 'Tuần 2', revenue: 18000 },
//     { name: 'Tuần 3', revenue: 12000 },
//     { name: 'Tuần 4', revenue: 27000 },
// ];

// const monthlyData = [
//     { name: 'T1', revenue: 65000 },
//     { name: 'T2', revenue: 59000 },
//     { name: 'T3', revenue: 80000 },
//     { name: 'T4', revenue: 81000 },
//     { name: 'T5', revenue: 56000 },
//     { name: 'T6', revenue: 55000 },
//     { name: 'T7', revenue: 40000 },
// ];

// const yearlyData = [
//     { name: '2020', revenue: 700000 },
//     { name: '2021', revenue: 820000 },
//     { name: '2022', revenue: 910000 },
//     { name: '2023', revenue: 880000 },
//     { name: '2024', revenue: 950000 },
// ];

// Lấy ngày hôm nay
const today = new Date();

// Format thành chuỗi 'yyyy-mm-dd'
const formatDate = (date) => date.toISOString().split('T')[0];

// Tạo ngày bắt đầu: hôm nay - 3 ngày
const pastDay = new Date();
pastDay.setDate(today.getDate() - 3);
// Tạo ngày kết thúc: hôm nay + 4 ngày
const futureDate = new Date();
futureDate.setDate(today.getDate() + 4);

export default function RevenueChart() {
    const [viewMode, setViewMode] = useState('daily');
    const [chartType, setChartType] = useState('line');
    const [startDate, setStartDate] = useState(formatDate(pastDay));
    const [endDate, setEndDate] = useState(formatDate(futureDate));
    const [dailyData, setDailyData] = useState([]);
    const [weeklyData, setWeeklyData] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoadingWeekly, setIsLoadingWeekly] = useState(false);
    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueThisWeek, setRevenueThisWeek] = useState(0);
    const [monthlyData, setMonthlyData] = useState([]);
    const [revenueThisMonth, setRevenueThisMonth] = useState(0);
    const [revenueThisYear, setRevenueThisYear] = useState(0)
    const [yearlyData, setYearlyData] = useState([]);

    //Data
    const [fullDailyData, setFullDailyData] = useState([]);

    // Lấy dữ liệu theo phạm vi ngày đã chọn
    useEffect(() => {
        const filteredData = fullDailyData?.filter((item) => {
            return item.date >= startDate && item.date <= endDate;
        });

        //Lấy ra ngày hôm nay
        const today = new Date();
        const dayOfMonth = formatDate(today);
        // Lọc trong mảng dữ liệu của tháng àny
        const revenueToday1 = filteredData.filter((item) => item.date === dayOfMonth);
        if (revenueToday1.length > 0) {
            // Set doanh thu hôm nay
            setRevenueToday(revenueToday1[0].revenue);
        }

        setDailyData(filteredData);
    }, [startDate, endDate, fullDailyData]);

    // Lấy dữ liệu khi chart mount
    useEffect(() => {
        getDataFullDaily();
        getDataWeekly();
        getDataMonthly();
        getDataYearly()
    }, []);

    // Hàm lấy dữ liệu cho fullDaily
    const getDataFullDaily = async () => {
        const res = await getAllDataFullDaily();
        setFullDailyData(res);
    };
    // Hàm lấy dữ liệu cho weekly

    const getDataWeekly = async () => {
        setIsLoadingWeekly(true);
        const res = await getAllDataWeekly();
        setWeeklyData(res);

        //Lấy ngày hôm nay
        const today = new Date();
        const dayOfMonth = today.getDate();

        //set dữ liệu doanh thu tuần theo ngày hôm nay
        if (dayOfMonth <= 7) {
            setRevenueThisWeek(res[0]?.revenue);
        } else if (dayOfMonth <= 14) {
            setRevenueThisWeek(res[1]?.revenue);
        } else if (dayOfMonth <= 21) {
            setRevenueThisWeek(res[2]?.revenue);
        } else {
            setRevenueThisWeek(res[3]?.revenue);
        }

        setIsLoadingWeekly(false);
    };

    // Hàm lấy dữ liệu hàng tháng
    const getDataMonthly = async () => {
        const res = await getAllDataMonthly();

        setMonthlyData(res);
        const currentMonth = new Date().getMonth() + 1;
        const currentMonthKey = 'T' + currentMonth;

        const thisMonthData = res.find((item) => item.name === currentMonthKey);
        const revenue = thisMonthData ? thisMonthData.revenue : 0;

        setRevenueThisMonth(revenue);
    };

    // Hàm lấy dữ liệu hàng namw
    const getDataYearly = async () => {
        try {
        const res = await getAllDataYearly(); // Gọi API lấy dữ liệu các năm
        setYearlyData(res);

        const currentYear = new Date().getFullYear(); // Lấy năm hiện tại
        const thisYearData = res.find((item) => item.name === currentYear.toString());

        const revenue = thisYearData ? thisYearData.revenue : 0;
        setRevenueThisYear(revenue); // Có thể đổi tên thành setRevenueThisYear
    } catch (error) {
        console.error('Error fetching yearly data:', error);
    }
        
    };

    // Chọn dữ liệu dựa trên chế độ xem
    const getDataByViewMode = () => {
        switch (viewMode) {
            case 'daily':
                return dailyData;
            case 'weekly':
                return weeklyData;
            case 'monthly':
                return monthlyData;
            case 'yearly':
                return yearlyData;
            default:
                return dailyData;
        }
    };

    // Định dạng số tiền
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Tùy chỉnh tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border border-gray-200 shadow-md rounded">
                    <p className="font-bold text-gray-700">{label}</p>
                    <p className="text-blue-600 font-semibold">{formatCurrency(payload[0].value)}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg p-6 max-w-6xl mx-auto">
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-500 font-medium">Doanh thu hôm nay</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(revenueToday)}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                    <p className="text-sm text-green-500 font-medium">Doanh thu tuần này</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(revenueThisWeek)}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <p className="text-sm text-purple-500 font-medium">Doanh thu tháng này</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{formatCurrency(revenueThisMonth)}</p>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <p className="text-sm text-amber-500 font-medium">Doanh thu năm nay</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">
                        {formatCurrency(revenueThisYear)}
                    </p>
                </div>
            </div>
            <div className="flex flex-col mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Biểu đồ Doanh thu</h2>
                <p className="text-gray-500">
                    Theo dõi doanh thu theo{' '}
                    {viewMode === 'daily'
                        ? 'ngày'
                        : viewMode === 'weekly'
                        ? 'tuần'
                        : viewMode === 'monthly'
                        ? 'tháng'
                        : 'năm'}
                </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex rounded-md overflow-hidden border border-gray-300">
                    <button
                        className={`px-4 py-2 ${
                            viewMode === 'daily' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setViewMode('daily')}
                    >
                        Ngày
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            viewMode === 'weekly'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setViewMode('weekly')}
                    >
                        Tuần
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            viewMode === 'monthly'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setViewMode('monthly')}
                    >
                        Tháng
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            viewMode === 'yearly'
                                ? 'bg-blue-500 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setViewMode('yearly')}
                    >
                        Năm
                    </button>
                </div>

                <div className="flex rounded-md overflow-hidden border border-gray-300">
                    <button
                        className={`px-4 py-2 ${
                            chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setChartType('line')}
                    >
                        Đường
                    </button>
                    <button
                        className={`px-4 py-2 ${
                            chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setChartType('bar')}
                    >
                        Cột
                    </button>
                </div>

                {viewMode === 'daily' && (
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
                            onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                            <CalendarMonthIcon />
                            <span>Chọn khoảng ngày</span>
                        </button>

                        {showDatePicker && (
                            <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                                <div className="flex flex-col space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Từ ngày:</label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={startDate}
                                            min="2025-05-01"
                                            max={endDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Đến ngày:
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            value={endDate}
                                            min={startDate}
                                            max="2025-05-31"
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="flex justify-between">
                                        <button
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                                            onClick={() => setShowDatePicker(false)}
                                        >
                                            Đóng
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            onClick={() => setShowDatePicker(false)}
                                        >
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="w-full h-96">
                <ResponsiveContainer width="100%" height="100%" key={`${viewMode}-${chartType}`}>
                    {dailyData?.length === 0 ? (
                        <div className="text-center text-gray-500">Đang tải dữ liệu...</div>
                    ) : chartType === 'line' ? (
                        <LineChart
                            data={getDataByViewMode()}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 60,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value.toLocaleString()}₫`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                name="Doanh thu"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    ) : (
                        <BarChart
                            data={getDataByViewMode()}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 60,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `${value.toLocaleString()}₫`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="revenue" name="Doanh thu" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    )}
                </ResponsiveContainer>
            </div>
        </div>
    );
}
