import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { addAddress } from '~/redux/apiRequest.js';
import { useNavigate } from 'react-router-dom';

function AddressInformation({ handleGetDataAddress }) {
    const [typeAddress, setTypeAddress] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [villageSelected, setVillageSelected] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [detailAddress, setDetailAddress] = useState('');

    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');

    //Call api get address
    // Get provinces
    useEffect(() => {
        resetData();
        handleGetDataAddress({});
        const fetchData = async () => {
            const res = await axios.get('https://provinces.open-api.vn/api/p');
            setProvinces(res.data);
        };
        fetchData();
    }, []);
    //Get Districts
    useEffect(() => {
        if (provinceSelected != null) {
            const fetchData = async () => {
                const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceSelected}?depth=2`);
                setDistricts(res.data.districts);
            };
            fetchData();
        }
    }, [provinceSelected]);
    //Get Villages
    useEffect(() => {
        if (districtSelected != null) {
            const fetchData = async () => {
                const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtSelected}?depth=2`);
                setVillages(res.data.wards);
            };
            fetchData();
        }
    }, [districtSelected]);

    // Handle click add address
    const handleAddAddress = async () => {
        const accessToken = localStorage.getItem('token');
        const username = jwtDecode(accessToken).sub;

        // find data address
        const dataProvince = provinces?.find((item) => item.code == provinceSelected);
        const dataDistrict = districts?.find((item) => item.code == districtSelected);
        const dataVillage = villages?.find((item) => item.code == villageSelected);
        const newAddress = {
            fullName,
            phoneNumber,
            detailAddress,
            typeAddress,
            province: dataProvince?.name || '',
            district: dataDistrict?.name || '',
            village: dataVillage?.name || '',
            userName: username,
        };

        if (validateAddress(newAddress)) {
            await addAddress(newAddress);
        }
    };

    // Handle change data address when user enter information
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        const username = jwtDecode(accessToken).sub;

        // find data address
        const dataProvince = provinces?.find((item) => item.code == provinceSelected);
        const dataDistrict = districts?.find((item) => item.code == districtSelected);
        const dataVillage = villages?.find((item) => item.code == villageSelected);
        const newAddress = {
            fullName,
            phoneNumber,
            detailAddress,
            typeAddress,
            province: dataProvince?.name || '',
            district: dataDistrict?.name || '',
            village: dataVillage?.name || '',
            userName: username,
        };
        handleGetDataAddress(newAddress);
    }, [fullName, phoneNumber, detailAddress, typeAddress, provinceSelected, districtSelected, villageSelected]);

    //validate address information
    const validateAddress = (address) => {
        let checked = true;

        // Kiểm tra Họ tên
        if (!address.fullName.trim()) {
            checked = false;
            toast.error('Họ tên không được để trống!');
        } else if (address.fullName.length < 2 || address.fullName.length > 50) {
            checked = false;
            toast.error('Tên phải từ 2 đến 50 ký tự!');
        }

        // Kiểm tra Số điện thoại
        const phoneRegex = /^(0[1-9])[0-9]{8,9}$/;
        if (!address.phoneNumber.trim()) {
            checked = false;

            toast.error('Số điện thoại không được để trống!');
        } else if (!phoneRegex.test(address.phoneNumber)) {
            checked = false;
            toast.error('Số điện thoại không hợp lệ! (Bắt đầu bằng 0, có 10-11 số)');
        }

        // Kiểm tra Tỉnh / Thành phố
        if (!address.province) {
            checked = false;

            toast.error('Vui lòng chọn tỉnh thành!!');
        }

        // Kiểm tra Huyện / Quận
        if (!address.district) {
            checked = false;

            toast.error('Vui lòng chọn 1 huyện!');
        }

        // Kiểm tra Phường / Xã
        if (!address.village) {
            checked = false;

            toast.error('Vui lòng chọn 1 xã!');
        }
        if (!address.detailAddress) {
            checked = false;
            toast.error('Vui lòng nhập địa chỉ chi tiết!!');
        }

        return checked;
    };
    const resetData = () => {
        setFullName('');
        setPhoneNumber('');
        setProvinceSelected(null);
        setTypeAddress(true);
        setProvinceSelected(null);
        setDistrictSelected(null);
        setVillageSelected(null);
        setDetailAddress('');
        setProvince('');
        setDistrict('');
        setVillage('');
    };

    const handleChangeSelectProvince = (e) => {
        setProvinceSelected(e.target.value);
        // Reset lại quận/huyện & phường/xã
        setDistricts([]);
        setVillages([]);
        setDistrictSelected('');
        setVillageSelected('');
    };

    const handleChangeSelectDistrict = (e) => {
        setDistrictSelected(e.target.value);
        // Reset lại phường/xã
        setVillages([]);
        setVillageSelected('');
    };
    const handleChangeSelectVillage = (e) => {
        setVillageSelected(e.target.value);
    };

    const handleChangeFullName = (e) => {
        setFullName(e.target.value);
    };
    const handleChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    };
    const handleDetailAddress = (e) => {
        setDetailAddress(e.target.value);
    };
    return (
        <div className="space-y-6">
            {/* form input */}
            <form action="">
                <div className="mb-[25px]">
                    <label htmlFor="name" className="mb-[10px] text-base">
                        Họ tên
                    </label>
                    <input
                        onChange={handleChangeFullName}
                        type="text"
                        name="name"
                        id="name"
                        className="w-full h-[38px]"
                    />
                </div>
                <div className="mb-[25px]">
                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                        Số điện thoại
                    </label>
                    <input
                        onChange={handleChangePhoneNumber}
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        className="w-full h-[38px]"
                    />
                </div>
                <div className="mb-[25px]">
                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                        Tỉnh/thành phố
                    </label>
                    {/* Province */}
                    <select
                        onChange={handleChangeSelectProvince}
                        className="w-full p-2 border border-gray-300 rounded"
                        defaultValue=""
                    >
                        <option value="">Chọn Tỉnh / Thành phố</option>
                        {provinces?.map((province, index) => (
                            <option key={index} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-[25px]">
                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                        Quận/Huyện
                    </label>
                    {/* District */}
                    <select
                        onChange={handleChangeSelectDistrict}
                        className="w-full p-2 border border-gray-300 rounded"
                        defaultValue=""
                    >
                        <option value="">Chọn Quận / Huyện</option>
                        {districts?.map((district, index) => (
                            <option key={index} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-[25px]">
                    <label htmlFor="phoneNumber" className="mb-[10px] text-base">
                        Phường/Xã
                    </label>
                    {/* Village */}
                    <select
                        onChange={handleChangeSelectVillage}
                        className="w-full p-2 border border-gray-300 rounded"
                        defaultValue=""
                    >
                        <option value="">Chọn Phường / Xã</option>
                        {villages?.map((village, index) => (
                            <option key={index} value={village.code}>
                                {village.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-[25px]">
                    <label htmlFor="detailAdress" className="mb-[10px] text-base">
                        Nhập địa chỉ
                    </label>
                    <input
                        onChange={handleDetailAddress}
                        type="text"
                        name="detailAdress"
                        id="detailAdress"
                        className="w-full h-[38px]"
                    />
                </div>

                <div className="flex gap-4">
                    <label
                        className={`flex-1 p-2 border rounded text-center cursor-pointer ${
                            typeAddress === false ? 'bg-black text-white' : 'border-black'
                        }`}
                    >
                        <input
                            type="radio"
                            name="addressType"
                            value="company"
                            className="hidden"
                            checked={!typeAddress}
                            onChange={() => setTypeAddress(false)}
                        />
                        Công ty
                    </label>
                    <label
                        className={`flex-1 p-2 border rounded text-center cursor-pointer ${
                            typeAddress ? 'bg-black text-white' : 'border-black'
                        }`}
                    >
                        <input
                            type="radio"
                            name="addressType"
                            value="home"
                            className="hidden"
                            checked={typeAddress}
                            onChange={() => setTypeAddress(true)}
                        />
                        Nhà riêng
                    </label>
                </div>
            </form>
            <div
                onClick={handleAddAddress}
                className="border border-slate-400 text-center py-2 font-semibold text-[18px] cursor-pointer hover:bg-black hover:text-white"
            >
                Thêm vào sổ địa chỉ
            </div>
        </div>
    );
}

export default AddressInformation;
