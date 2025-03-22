import { useEffect, useState } from 'react';
import icon from '../../assets/icons/index.jsx';

function DeliveryMethod({ handleGetDataDeliveryMethod }) {
    const [selectedMethod, setSelectedMethod] = useState('fast');

    useEffect(() => {
        handleGetDataDeliveryMethod(selectedMethod);
    }, [selectedMethod]);

    // Tính toán ngày giao hàng dự kiến
    const calculateDeliveryDate = (method) => {
        let today = new Date();
        let deliveryDate = new Date(today);
        switch (method) {
            case 'express':
                deliveryDate.setDate(today.getDate() + 1);
                break;
            case 'fast':
                deliveryDate.setDate(today.getDate() + 3);
                break;
            default:
                return 'Không xác định';
        }
        return deliveryDate.toLocaleDateString('vi-VN', {
            weekday: 'long',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white w-full p-[19px] mb-[34px]">
            {/* Header */}
            <div className="flex items-center mb-[37px]">
                <div className="w-[40px] flex justify-center mr-2">
                    <img src={icon.iconTranSit} alt="Shipping Icon" className="w-[30px] h-[20px]" />
                </div>
                <div className="text-lg font-semibold">Phương thức giao hàng</div>
            </div>

            {/* Form chọn phương thức giao hàng */}
            <form className="flex">
                {[
                    { value: 'fast', label: 'Chuyển phát nhanh' },
                    { value: 'express', label: 'Giao hàng hỏa tốc' },
                ].map((option) => (
                    <label key={option.value} className="inline-flex items-center ml-5 first:ml-0 cursor-pointer">
                        <input
                            type="radio"
                            name="delivery_method"
                            value={option.value}
                            className="hidden peer"
                            checked={selectedMethod === option.value}
                            onChange={() => setSelectedMethod(option.value)}
                        />
                        <span
                            className={`flex items-center justify-center w-4 h-4 mt-[5px] mr-2 border-2 rounded-full 
                            ${selectedMethod === option.value ? 'bg-black border-transparent' : 'border-gray-300'}`}
                        >
                            {selectedMethod === option.value && <img src={icon.iconDone} alt="Checked" />}
                        </span>
                        <div>
                            <div className="text-base font-semibold">{option.label}</div>
                            <div className="text-[14px] text-gray-600">
                                Thời gian giao hàng dự kiến: {calculateDeliveryDate(option.value)}
                            </div>
                        </div>
                    </label>
                ))}
            </form>
        </div>
    );
}

export default DeliveryMethod;
