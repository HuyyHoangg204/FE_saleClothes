import React, { useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import { FaCalendarAlt } from 'react-icons/fa';
import { updateUser } from '../../redux/apiRequest.js';

function SlideInfoUser({ user }) {
    const [fullName, setFullName] = useState(user?.khTen);
    const [phoneNumber, setPhoneNumber] = useState(user?.khDienThoai);
    const [email, setEmail] = useState(user?.khEmail);
    const [sex, setSex] = useState(user?.khGioiTinh);
    const [dateOfBirth, setDateOfBirth] = useState(user?.khNgaySinh);
    const [monthOfBirth, setMonthOfBirth] = useState(user?.kh_thangSinh);
    const [yearOfBirth, setYearOfBirth] = useState(user?.kh_namSinh);
    const [errors, setErrors] = useState({ fullName: '', phoneNumber: '' });

    //handle update user
    const handleClickUpdate = () => {
        if (validate()) {
            const userData = {
                khTen: fullName,
                khGioiTinh: sex,
                khDienThoai: phoneNumber,
                khNgaySinh: dateOfBirth,
                kh_thangSinh: monthOfBirth,
                kh_namSinh: yearOfBirth,
            };
            updateUser(user?.khUserName, userData);
            setErrors({ fullName: '', phoneNumber: '' });
        }
    };

    //Validate infor
    const validate = () => {
        let checked = true;
        if (!fullName.trim()) {
            setErrors({ ...errors, fullName: 'Họ và tên không được để trống!' });
            checked = false;
        }
        if (fullName.length <= 2 || fullName.length > 50) {
            setErrors({ ...errors, fullName: 'Tên phải từ 2 đến 50 ký tự!' });
            checked = false;
        }

        if (!/^[\p{L} ]+$/u.test(fullName)) {
            setErrors({ ...errors, fullName: 'Tên chỉ được chứa chữ cái!' });
            checked = false;
        }
        if (!phoneNumber.trim()) {
            setErrors({ ...errors, phoneNumber: 'Số điện thoại không được để trống!' });
            checked = false;
        }
        if (!/^(0[1-9])[0-9]{8,9}$/.test(phoneNumber)) {
            setErrors({ ...errors, phoneNumber: 'Số điện thoại không hợp lệ!' });
            checked = false;
        }
        return checked;
    };
    // const formattedDate =
    //     dateOfBirth && monthOfBirth && yearOfBirth
    //         ? `${String(dateOfBirth).padStart(2, '0')}-${String(monthOfBirth).padStart(2, '0')}-${yearOfBirth}`
    //         : ''; // Nếu chưa có dữ liệu, để trống

    const handleDateChange = (event) => {
        const selectedDate = event.target.value; // Lấy giá trị từ input (YYYY-MM-DD)
        const [year, month, day] = selectedDate.split('-').map(Number);

        setYearOfBirth(year);
        setMonthOfBirth(month);
        setDateOfBirth(day);
    };
    const handleFullnameChange = (e) => {
        setFullName(e.target.value);
    };
    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleChange = (e) => {
        const value = e.target.value;
        if (value === 'male') setSex(true);
        else if (value === 'female') setSex(false);
    };
    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">THÔNG TIN TÀI KHOẢN</div>
            <label htmlFor="fullName">Họ và tên</label>
            <input
                className="w-full mt-1 mb-5 rounded border-gray"
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={handleFullnameChange}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}

            <label htmlFor="phoneNumber">Số điện thoại</label>
            <input
                className="w-full mt-1 mb-5 rounded border-gray"
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}

            <label htmlFor="email">Email</label>
            <input
                className="w-full mt-1 mb-5 rounded border-gray"
                type="text"
                name="email"
                id="email"
                value={email}
                readOnly
            />

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
                            checked={sex === true}
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
                            checked={sex === false}
                        />
                        <span className="flex items-center justify-center w-4 h-4 mt-[5px] mr-1 border-2 border-gray-300 rounded-full peer-checked:bg-black peer-checked:border-transparent">
                            <img src={icon.iconDone} alt="" />
                        </span>
                        <div className="">
                            <div className="text-base">Nữ</div>
                        </div>
                    </label>
                </div>
            </form>

            <div className="date-picker-container">
                <div className="date-display mt-5 mb-1">Ngày sinh</div>
                <input
                    type="date"
                    id="date-input"
                    className="date-input w-full mt-1 mb-5 cursor-pointer rounded border-gray"
                    value={
                        yearOfBirth && monthOfBirth && dateOfBirth
                            ? `${yearOfBirth}-${String(monthOfBirth).padStart(2, '0')}-${String(dateOfBirth).padStart(
                                  2,
                                  '0',
                              )}`
                            : ''
                    } // Định dạng về YYYY-MM-DD để input hiển thị đúng
                    onChange={handleDateChange}
                />
            </div>

            <div className="w-full flex justify-around font-[500] mt-10">
                <button onClick={handleClickUpdate} className="bg-black text-white px-5 py-[8px] rounded">
                    CẬP NHẬT
                </button>
                <button className="bg-black text-white px-5 py-[8px] rounded">ĐỔI MẬT KHẨU</button>
            </div>
        </div>
    );
}

export default SlideInfoUser;
