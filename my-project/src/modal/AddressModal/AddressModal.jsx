import React, { useState } from 'react';

function AddressModal({ isOpen, onClose }) {
    const [addressType, setAddressType] = useState('');
    if (!isOpen) return null;
    const provinces = [
        'Hà Nội',
        'Hồ Chí Minh',
        'Đà Nẵng',
        'Hải Phòng',
        'Cần Thơ',
        'Hòa Bình',
        // Thêm các tỉnh/thành phố khác nếu cần
    ];
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white px-8 py-4 rounded-md w-[550px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Thêm địa chỉ mới</h2>
                    <button onClick={onClose} className="text-gray-700 text-[35px] hover:text-gray-500">
                        &times;
                    </button>
                </div>

                <form className="space-y-4">
                    <div className="flex gap-4">
                        <input type="text" placeholder="Họ tên" className="w-1/2 p-2 border border-gray-300 rounded" />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                    </div>

                    <select className="w-full p-2 border border-gray-300 rounded" defaultValue="">
                        <option value="" disabled>
                            Chọn Tỉnh / Thành phố
                        </option>
                        {provinces.map((province, index) => (
                            <option key={index} value={province}>
                                {province}
                            </option>
                        ))}
                    </select>

                    <select className="w-full p-2 border border-gray-300 rounded" defaultValue="">
                        <option value="" disabled>
                            Chọn Quận / Huyện
                        </option>
                        {/* Thêm các lựa chọn cho Quận/Huyện */}
                        <option value="Yên Thủy">Yên Thủy</option>
                        <option value="Kim Bôi">Kim Bôi</option>
                        {/* Thêm các Quận/Huyện khác nếu cần */}
                    </select>

                    <select className="w-full p-2 border border-gray-300 rounded" defaultValue="">
                        <option value="" disabled>
                            Chọn Phường / Xã
                        </option>
                        {/* Thêm các lựa chọn cho Phường/Xã */}
                        <option value="Đồng Tâm">Đồng Tâm</option>
                        <option value="Hùng Sơn">Hùng Sơn</option>
                        {/* Thêm các Phường/Xã khác nếu cần */}
                    </select>

                    <input
                        type="text"
                        placeholder="Địa chỉ chi tiết"
                        className="w-full p-2 border border-gray-300 rounded"
                    />

                    <div className="flex gap-4">
                        <label
                            className={`flex-1 p-2 border rounded text-center cursor-pointer ${
                                addressType === 'company' ? 'bg-black text-white' : 'border-black'
                            }`}
                        >
                            <input
                                type="radio"
                                name="addressType"
                                value="company"
                                className="hidden"
                                checked={addressType === 'company'}
                                onChange={() => setAddressType('company')}
                            />
                            Công ty
                        </label>
                        <label
                            className={`flex-1 p-2 border rounded text-center cursor-pointer ${
                                addressType === 'home' ? 'bg-black text-white' : 'border-black'
                            }`}
                        >
                            <input
                                type="radio"
                                name="addressType"
                                value="home"
                                className="hidden"
                                checked={addressType === 'home'}
                                onChange={() => setAddressType('home')}
                            />
                            Nhà riêng
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full p-3 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
                    >
                        Lưu địa chỉ
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddressModal;
