import { useEffect, useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import AddressModal from '../../modal/AddressModal/AddressModal.jsx';
import { jwtDecode } from 'jwt-decode';
import { deleteAddress, getAllAddressByUsername } from '../../redux/apiRequest.js';
import { useDispatch, useSelector } from 'react-redux';
import AddressDeleteModal from '../../modal/AddressModal/AddressDeleteModal.jsx';
import UpdateAddressModal from '../../modal/AddressModal/UpdateAddressModal.jsx';

function SlideAddressUser({ handleChange }) {
    //State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [idAddress, setIdAddress] = useState(null);

    const loading = useSelector((state) => state?.user?.address?.isFetching);
    const addresses = useSelector((state) => state?.user?.address?.allAddress);

    const dispatch = useDispatch();

    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(accessToken);
        callApiGetAllAddressByUsername(decodedToken.sub);
    }, []);
    // useEffect(() => {
    //     console.log(idAddress);
    // }, [idAddress]);

    // Api get all addresses
    const callApiGetAllAddressByUsername = async (username) => {
        const res = await getAllAddressByUsername(username, dispatch);
    };

    //Refresh data
    const refreshData = () => {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(accessToken);
        callApiGetAllAddressByUsername(decodedToken.sub);
    };

    //Toggle open modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openDeleteModal = (idAddress) => {
        setIsModalDeleteOpen(true);
        setIdAddress(idAddress);
    };
    const closeDeleteModal = () => setIsModalDeleteOpen(false);

    const openUpdateModal = (idAddress) => {
        setIsModalUpdateOpen(true);
        setIdAddress(idAddress);
    };
    const closeUpdateModal = () => setIsModalUpdateOpen(false);

    // Handle delete address
    const handleClickDeleteAddress = async (idAddress) => {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(accessToken);
        await deleteAddress(decodedToken.sub, idAddress);
        refreshData();
        closeDeleteModal();
    };

    // Loading when data fetch is complete
    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">SỐ ĐỊA CHỈ</div>
            <div className="space-y-4">
                {addresses?.map((address) => (
                    <div
                        key={address.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded bg-gray-50"
                    >
                        <div>
                            <p className="font-semibold max-w-[700px] break-words">
                                {address.detailAddress}, {address.village}, {address.district}, {address.province}
                            </p>
                            <p className="text-gray-700">
                                {address.fullName} | {address.phoneNumber}
                            </p>
                        </div>
                        <div className="text-right flex flex-col">
                            <p className="text-sm font-semibold text-blue-600">
                                {address.typeAddress ? 'Nhà riêng' : 'Công ty'}
                            </p>
                            <span
                                onClick={() => {
                                    openUpdateModal(address.id);
                                }}
                                className="text-green-600 hover:underline cursor-pointer"
                            >
                                Sửa
                            </span>
                            <span
                                onClick={() => {
                                    openDeleteModal(address.id);
                                }}
                                className="text-red-600 hover:underline cursor-pointer"
                            >
                                Xoá
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={openModal} className="w-full mt-6 py-2 bg-black text-white font-[500] text-[20px] rounded">
                Thêm địa chỉ
            </button>
            <AddressModal isOpen={isModalOpen} onClose={closeModal} refreshData={refreshData} />
            {isModalDeleteOpen && (
                <AddressDeleteModal
                    closeDeleteModal={closeDeleteModal}
                    idAddress={idAddress}
                    handleClickDeleteAddress={handleClickDeleteAddress}
                />
            )}
            {isModalUpdateOpen && <UpdateAddressModal refreshData={refreshData} idAddress = {idAddress} closeUpdateModal={closeUpdateModal} />}
        </div>
    );
}

export default SlideAddressUser;
