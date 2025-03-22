import { use } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function AddressBook({handleGetDataAddress}) {
    const [addressRadioSelected, setAddressSelected] = useState(null);

    const loading = useSelector((state) => state?.user?.address?.isFetching);
    const addresses = useSelector((state) => state?.user?.address?.allAddress);

    useEffect(() => {
        handleGetDataAddress({})
    },[])

    useEffect(() => {
        const tempAddress = addresses?.find(address => address.id === addressRadioSelected)
        handleGetDataAddress(tempAddress)
    },[addressRadioSelected])

    // Loading when data fetch is complete
    if (loading) {
        return (
            <div className="flex justify-center items-center h-20">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
            </div>
        );
    }
    return (
        <div>
            <div className="space-y-3">
                {addresses?.map((address, index) => (
                    <div key={index} className="flex items-center space-x-3 border border-slate-300 rounded-lg h-18">
                        <input
                            type="radio"
                            name="address"
                            value={address.id} // Hoặc có thể dùng address.id nếu có
                            checked={addressRadioSelected === address.id}
                            onChange={() => setAddressSelected(address.id)} 
                            className="ml-3 appearance-none w-4 h-4 rounded-full border-2 border-gray-300 checked:border-black checked:bg-white focus:outline-none cursor-pointer checked:shadow-[inset_0_0_0_4px_#000]"
                        />

                        <div className="flex flex-col">
                            <span className="font-semibold text-[18px]">{address.typeAddress ? "Nhà riêng" : "Công ty" }</span>
                            <span>{address.detailAddress}, {address.village}, {address.district}, {address.province}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddressBook;
