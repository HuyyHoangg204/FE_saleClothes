import { useEffect, useState } from 'react';
import icon from '../../assets/icons/index.jsx';

function PaymentMethod({ handleGetDataPaymentMethod }) {
    const [selectedOption, setSelectedOption] = useState('COD');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        handleGetDataPaymentMethod(selectedOption);
    }, [selectedOption]);

    const paymentMethods = [
        { value: 'COD', label: 'Thanh toán khi nhận hàng' },
        { value: 'E_WALLET', label: 'Thanh toán bằng Momo' },
        { value: 'BANK_TRANSFER', label: 'Thanh toán bằng ATM' },
        { value: 'CREDIT_CARD', label: 'Thanh toán bằng thẻ tín dụng' },
        { value: 'VNPAY', label: 'Thanh toán bằng ví VNPAY' },
    ];

    return (
        <div className="bg-white w-full p-[19px] mb-[34px]">
            {/* Header */}
            <div className="flex items-center mb-3">
                <div className="w-[40px] flex justify-center mr-2">
                    <img src={icon.iconPay} alt="Payment Icon" className="w-[30px] h-[20px]" />
                </div>
                <div className="text-lg font-semibold">Phương thức thanh toán</div>
            </div>
            <div className="text-[14px] mb-5">
                Mọi giao dịch đều được bảo mật và mã hóa. Thông tin thẻ tín dụng sẽ không bao giờ được lưu lại.
            </div>

            {/* Form chọn phương thức thanh toán */}
            <form>
                <div className="flex flex-col">
                    {paymentMethods.map((method) => (
                        <label key={method.value} className="inline-flex items-center mb-5 cursor-pointer">
                            <input
                                type="radio"
                                name="payment_method"
                                value={method.value}
                                className="hidden peer"
                                checked={selectedOption === method.value}
                                onChange={handleChange}
                            />
                            <span
                                className={`flex items-center justify-center w-4 h-4 mr-2 border-2 rounded-full 
                                ${selectedOption === method.value ? 'bg-black border-transparent' : 'border-gray-300'}`}
                            >
                                {selectedOption === method.value && <img src={icon.iconDone} alt="Checked" />}
                            </span>
                            <div className="text-base">{method.label}</div>
                        </label>
                    ))}
                </div>
            </form>
        </div>
    );
}

export default PaymentMethod;
