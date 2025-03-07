import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { addAddress } from '~/redux/apiRequest.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateAddress } from '../../redux/apiRequest';

function UpdateAddressModal({ closeUpdateModal, idAddress, refreshData }) {
    const [addressUpdate, setAddressUpdate] = useState({});
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [villages, setVillages] = useState([]);
    const [provinceSelected, setProvinceSelected] = useState(null);
    const [districtSelected, setDistrictSelected] = useState(null);
    const [villageSelected, setVillageSelected] = useState(null);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [typeAddress, setTypeAddress] = useState(true);
    const [province, setProvince] = useState({});
    const [district, setDistrict] = useState('');
    const [village, setVillage] = useState('');

    const data = useSelector((state) => state?.user?.address?.allAddress);

    const navigate = useNavigate();
    //Call api get address
    useEffect(() => {
        // resetData();
        const fetchData = async () => {
            const res = await axios.get('https://provinces.open-api.vn/api/p'); // Get provinces
            setProvinces(res.data);
        };
        fetchData();

        const foundAddress = data?.find((address) => address.id === idAddress); // Dùng find() thay vì filter()
        if (foundAddress) {
            setAddressUpdate(foundAddress);
        }
    }, []);

    useEffect(() => {
        if (provinceSelected != null) {
            const fetchData = async () => {
                const res = await axios.get(`https://provinces.open-api.vn/api/p/${provinceSelected}?depth=2`); //Get district
                setDistricts(res.data.districts);
            };
            fetchData();
        }
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected != null) {
            const fetchData = async () => {
                const res = await axios.get(`https://provinces.open-api.vn/api/d/${districtSelected}?depth=2`); // Get village
                setVillages(res.data.wards);
            };
            fetchData();
        }
    }, [districtSelected]);

    // Update data for input and select
    useEffect(() => {
        setFullName(addressUpdate?.fullName || ''); // Cập nhật fullName khi addressUpdate thay đổi
        setPhoneNumber(addressUpdate?.phoneNumber || '');
        setDetailAddress(addressUpdate?.detailAddress || '');
    }, [addressUpdate]);

    //Handle data province
    useEffect(() => {
        if (addressUpdate?.province && provinces?.length > 0) {
            const matchedProvince = provinces.find((p) => p.name === addressUpdate.province);
            setProvince(matchedProvince || {}); // Nếu không tìm thấy thì set {}
        }
    }, [addressUpdate, provinces]); // Thêm provinces vào dependencies
    //Handle data district
    useEffect(() => {
        if (province?.code) {
            const fetchDistricts = async () => {
                try {
                    const res = await axios.get(`https://provinces.open-api.vn/api/p/${province?.code}?depth=2`); //Get district
                    setDistricts(res.data.districts);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách quận/huyện:', error);
                }
            };
            fetchDistricts();
        }
    }, [province]);

    useEffect(() => {
        if (addressUpdate?.district && districts?.length > 0) {
            const matchedDistrict = districts.find((d) => d.name === addressUpdate.district);
            setDistrict(matchedDistrict || {}); // Nếu không tìm thấy thì set {}
        }
    }, [addressUpdate, districts]); // Thêm provinces vào dependencies

    //Handle data village
    useEffect(() => {
        if (district?.code) {
            const fetchVillages = async () => {
                try {
                    const res = await axios.get(`https://provinces.open-api.vn/api/d/${district.code}?depth=2`); // Get village
                    setVillages(res.data.wards);
                } catch (error) {
                    console.error('Lỗi khi lấy danh sách Phường/Xã:', error);
                }
            };
            fetchVillages();
        }
    }, [district]);
    useEffect(() => {
        if (addressUpdate?.village && villages?.length > 0) {
            const matchedVillage = villages.find((v) => v.name === addressUpdate.village);
            setVillage(matchedVillage || {}); // Nếu không tìm thấy thì set {}
        }
    }, [addressUpdate, villages]); // Thêm provinces vào dependencies

    // Handle click update address
    const handleClickUpdateAddress = async () => {
        const token = localStorage.getItem('token');
        const username = jwtDecode(token).sub;
        const newAddress = {
            fullName: fullName,
            phoneNumber: phoneNumber,
            province: province.name,
            district: district.name,
            village: village.name,
            detailAddress: detailAddress,
            typeAddress: typeAddress,
            userName: username,
        };
        if(validateAddress(newAddress)) {
           await updateAddress(newAddress, idAddress)
           closeUpdateModal()
           refreshData()
        }
    };

    //Validate address
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
    
            return checked;
        };

    // Func handle change data
    const handleChangeSelectProvince = (e) => {
        const selectedCode = Number(e.target.value); // 🔥 Chuyển thành số

        setProvinceSelected(e.target.value);

        const tempProvince = provinces.find((p) => p.code === selectedCode);

        setProvince(tempProvince);
        // Reset lại quận/huyện & phường/xã
        setDistricts([]);
        setVillages([]);
        setDistrictSelected('');
        setVillageSelected('');
        setDistrict({})
        setVillage({})
    };
    const handleChangeSelectDistrict = (e) => {
        const selectedCode = Number(e.target.value); // 🔥 Chuyển thành số
        setDistrictSelected(e.target.value);

        const tempDistrict = districts.find((d) => d.code === selectedCode)
        setDistrict(tempDistrict);
        // Reset lại phường/xã
        setVillages([]);
        setVillageSelected('');
        setVillage({})
    };
    const handleChangeSelectVillage = (e) => {
   
        const selectedCode = Number(e.target.value); // 🔥 Chuyển thành số
        setVillageSelected(e.target.value);

        const tempVillage = villages.find((v) => v.code === selectedCode)
        setVillage(tempVillage);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white px-8 py-4 rounded-md w-[550px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Thêm địa chỉ mới</h2>
                    <button onClick={closeUpdateModal} className="text-gray-700 text-[35px] hover:text-gray-500">
                        &times;
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex gap-4">
                        {/* Full Name */}
                        <input
                            value={fullName}
                            onChange={handleChangeFullName}
                            type="text"
                            placeholder="Họ tên"
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                        {/* Phone number */}
                        <input
                            onChange={handleChangePhoneNumber}
                            value={phoneNumber}
                            type="text"
                            placeholder="Số điện thoại"
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                    </div>
                    {/* Province */}
                    <select
                        onChange={handleChangeSelectProvince}
                        className="w-full p-2 border border-gray-300 rounded"
                        value={province.code}
                    >
                        <option value="">Chọn Tỉnh / Thành phố</option>
                        {provinces?.map((province, index) => (
                            <option key={index} value={province.code}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                    {/* District */}
                    <select
                        onChange={handleChangeSelectDistrict}
                        className="w-full p-2 border border-gray-300 rounded"
                        value={district.code}
                    >
                        <option value="">Chọn Quận / Huyện</option>
                        {districts?.map((district, index) => (
                            <option key={index} value={district.code}>
                                {district.name}
                            </option>
                        ))}
                    </select>
                    {/* Village */}
                    <select
                        onChange={handleChangeSelectVillage}
                        value={village.code}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Chọn Phường / Xã</option>
                        {villages?.map((village, index) => (
                            <option key={index} value={village.code}>
                                {village.name}
                            </option>
                        ))}
                    </select>

                    {/* Detail address */}
                    <input
                        value={detailAddress}
                        onChange={handleDetailAddress}
                        type="text"
                        placeholder="Địa chỉ chi tiết"
                        className="w-full p-2 border border-gray-300 rounded"
                    />

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

                    <button
                        onClick={handleClickUpdateAddress}
                        className="w-full p-3 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
                    >
                        Cập nhật địa chỉ
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UpdateAddressModal;
