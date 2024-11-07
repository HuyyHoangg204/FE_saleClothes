import { useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import AddressModal from '../../modal/AddressModal/AddressModal.jsx';

function SlideAddressUser({ handleChange }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addresses = [
        {
            id: 1,
            name: 'Hoàng Trần',
            phone: '0965523100',
            address: 'Đồng tâm, Xã Yên Trị, Huyện Yên Thủy, Hòa Bình',
            label: 'Công ty',
        },
        {
            id: 2,
            name: 'Hoàng Trần',
            phone: '0965523100',
            address: 'Đồng tâm, Xã Yên Trị, Huyện Yên Thủy, Hòa Bình',
            label: 'Nhà riêng',
        },
    ];

    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">SỐ ĐỊA CHỈ</div>
            <div className="space-y-4">
                {addresses.map((address) => (
                    <div
                        key={address.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded bg-gray-50"
                    >
                        <div>
                            <p className="font-semibold">{address.address}</p>
                            <p className="text-gray-700">
                                {address.name} | {address.phone}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-semibold text-blue-600">{address.label}</p>
                            <a href="#" className="text-green-600 hover:underline">
                                Sửa
                            </a>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={openModal} className="w-full mt-6 py-2 bg-black text-white font-[500] text-[20px] rounded">
                Thêm địa chỉ
            </button>
            <AddressModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
}

export default SlideAddressUser;
