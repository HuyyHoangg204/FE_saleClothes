import React, { useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import { FaCalendarAlt } from 'react-icons/fa';

function SlideInfoUser({ handleChange }) {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        const formattedDate = new Date(event.target.value).toLocaleDateString('vi-VN');
        setSelectedDate(formattedDate);
    };
    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">THÔNG TIN TÀI KHOẢN</div>
            <label htmlFor="fullName">Họ và tên</label>
            <input className="w-full mt-1 mb-5 rounded border-gray" type="text" name="fullName" id="fullName" readOnly />

            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input className="w-full mt-1 mb-5 rounded border-gray" type="text" name="phoneNumber" id="phoneNumber" readOnly />

            <label htmlFor="email">Email</label>
            <input className="w-full mt-1 mb-5 rounded border-gray" type="text" name="email" id="email" readOnly />

            <form action="">
                <label className="mt-5" htmlFor="sex">
                    Giới tính
                </label>
                <div className="flex mt-1">
                    <label className="inline-flex">
                        <input
                            type="radio"
                            name="sex"
                            value="male"
                            className="hidden peer focus:outline-none"
                            onChange={handleChange}
                        />
                        <span className="flex items-center justify-center w-4 h-4 mt-[5px] mr-1 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                            <img src={icon.iconDone} alt="" />
                        </span>
                        <div className="">
                            <div className="text-base">Nam</div>
                        </div>
                    </label>
                    <label className="inline-flex ml-5">
                        <input
                            type="radio"
                            name="sex"
                            value="female"
                            className="hidden peer focus:outline-none"
                            onChange={handleChange}
                        />
                        <span className="flex items-center justify-center w-4 h-4 mt-[5px] mr-1 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                            <img src={icon.iconDone} alt="" />
                        </span>
                        <div className="">
                            <div className="text-base">Nữ</div>
                        </div>
                    </label>
                    <label className="inline-flex ml-5">
                        <input
                            type="radio"
                            name="sex"
                            value="different"
                            className="hidden peer focus:outline-none"
                            onChange={handleChange}
                        />
                        <span className="flex items-center justify-center w-4 h-4 mt-[5px] mr-1 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                            <img src={icon.iconDone} alt="" />
                        </span>
                        <div className="">
                            <div className="text-base">Khác</div>
                        </div>
                    </label>
                </div>
            </form>

            <div className="date-picker-container">
                <div className="date-display mt-5 mb-1">Ngày sinh</div>
                <input type="date" id="date-input" className="date-input w-full mt-1 mb-5 cursor-pointer rounded border-gray" onChange={handleDateChange} />
            </div>

            <div className="w-full flex justify-around font-[500] mt-10">
                <button className='bg-black text-white px-5 py-[8px] rounded'>CẬP NHẬT</button>
                <button className='bg-black text-white px-5 py-[8px] rounded'>ĐỔI MẬT KHẨU</button>
            </div>
        </div>
    );
}

export default SlideInfoUser;
