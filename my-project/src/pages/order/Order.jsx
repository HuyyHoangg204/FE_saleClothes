import React, { useEffect } from 'react';
import { useState } from 'react';
import icon from '../../assets/icons/index.jsx';
import MainHeader from '../../partials/MainHeader/MainHeader.jsx';
import Footer from '../../partials/Footer/Footer.jsx';
import AddressInformation from '../../components/order/AddressInfomation.jsx';
import AddressBook from '../../components/order/AddressBook.jsx';
import { createPayment, getAllAddressByUsername, handleOrder } from '../../redux/apiRequest.js';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import DeliveryMethod from '../../components/order/DeliveryMethod.jsx';
import { toast } from 'react-toastify';
import PaymentMethod from '../../components/order/PaymentMethod.jsx';
import ProductList from '../../components/order/ProductList.jsx';
import OrderDetail from '../../components/order/OrderDetail.jsx';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading.jsx';

function Order() {
    const [selectedAddress, setSelectedAddress] = useState(true);
    const [deliveryMethod, setDeliveryMethod] = useState('');
    const [dataAddress, setDataAddress] = useState({});
    const [paymentMethod, setPaymentMethod] = useState('');
    const [shippingFee, setShippingFee] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [orderDetails, setOrderDetails] = useState([])
    const [size, setSize] = useState(null)
    const [username, setUsername] = useState(null)
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    useEffect(() => {
        const accessToken = localStorage.getItem("token")
        if(accessToken) {
            const decodedToken = jwtDecode(accessToken)
            setUsername(decodedToken.sub)
        }

        resetAddress();
    }, []);

    //Handle feature order
    const handleFeatOrder = async () => {
        if (!validateAddress(dataAddress)) return;
      
        setLoading(true);
      
        const newData = {
          totalAmount,
          paymentMethod,
          paymentStatus: "UNPAID",
          deliveryMethod,
          shippingFee,
          username,
          addressId: dataAddress.id,
          orderDetails,
        };
      
        try {
          switch (paymentMethod) {
            case "COD":
              await handleApiCreateOrder(newData);
              break;
      
            case "NCB":
              const paymentUrl = await createPayment(totalAmount, "NCB");
      
              // Optional: thêm delay nhỏ để người dùng thấy loading
              setTimeout(() => {
                window.location.href = paymentUrl; // ✅ Chuyển hướng sau khi loading hiển thị
              }, 1000);
              break;
      
            case "E_WALLET":
              // TODO
              break;
      
            case "CREDIT_CARD":
              // TODO
              break;
      
            case "VNPAYQR":
              // TODO
              const paymentUrlQrcode = await createPayment(totalAmount, "VNPAYQR");
      
              // Optional: thêm delay nhỏ để người dùng thấy loading
              setTimeout(() => {
                window.location.href = paymentUrlQrcode; // ✅ Chuyển hướng sau khi loading hiển thị
              }, 1000);
              break;
      
            default:
              toast.error("Phương thức thanh toán không hợp lệ");
          }
        } catch (error) {
          console.error("Lỗi khi xử lý đơn hàng:", error);
          toast.error("Có lỗi xảy ra khi đặt hàng.");
          setLoading(false); // chỉ tắt loading khi không redirect
        }
      };
      
      
    //Handle call api create order
    const handleApiCreateOrder = async(data) => {
        try {
            
            
            await handleOrder(data); // gọi API tạo đơn hàng
            navigate('/thank-you'); // chuyển hướng sau khi thành công
        } catch (error) {
            toast.error('Đặt hàng thất bại. Vui lòng thử lại.');
            console.error(error);
        }
    }

    //sync reset address
    const resetAddress = async () => {
        const accessToken = localStorage.getItem('token');
        const decodedToken = jwtDecode(accessToken);
        callApiGetAllAddressByUsername(decodedToken.sub);
    };

    // Api get all addresses
    const callApiGetAllAddressByUsername = async (username) => {
        const res = await getAllAddressByUsername(username, dispatch);
    };

    //handle get data address
    const handleGetDataAddress = (address) => {
        setDataAddress(address);
    };

    //handle get data delivery method
    const handleGetDataDeliveryMethod = (deliveryMethod) => {
        setDeliveryMethod(deliveryMethod);
    };

    //handle get data payment method
    const handleGetDataPaymentMethod = (paymentMethod) => {
        setPaymentMethod(paymentMethod);
    };
    //handle get data payment method
    const handleGetShippingFee = (data) => {
        setShippingFee(data);
    };
    //handle get data payment method
    const handleGetTotalAmount = (data) => {
        setTotalAmount(data);
    };

      //handle get data payment method
    const handleGetDataProductInCart = (data) => {
        setOrderDetails((prev) => [...prev,data])
        
    };


    //validate address information
    const validateAddress = (address) => {
        let checked = true;
        if (!address) {
            checked = false;
            toast.error('Địa chỉ giao hàng không được để trống!!');
        } else {
            // Kiểm tra Họ tên
            if (!address?.fullName.trim()) {
                checked = false;
                toast.error('Họ tên không được để trống!');
            } else if (address.fullName.length < 2 || address.fullName.length > 50) {
                checked = false;
                toast.error('Tên phải từ 2 đến 50 ký tự!');
            }

            // Kiểm tra Số điện thoại
            const phoneRegex = /^(0[1-9])[0-9]{8,9}$/;
            if (!address?.phoneNumber.trim()) {
                checked = false;

                toast.error('Số điện thoại không được để trống!');
            } else if (!phoneRegex.test(address.phoneNumber)) {
                checked = false;
                toast.error('Số điện thoại không hợp lệ! (Bắt đầu bằng 0, có 10-11 số)');
            }

            // Kiểm tra Tỉnh / Thành phố
            if (!address?.province) {
                checked = false;

                toast.error('Vui lòng chọn tỉnh thành!!');
            }

            // Kiểm tra Huyện / Quận
            if (!address?.district) {
                checked = false;

                toast.error('Vui lòng chọn 1 huyện!');
            }

            // Kiểm tra Phường / Xã
            if (!address?.village) {
                checked = false;

                toast.error('Vui lòng chọn 1 xã!');
            }
            // Kiểm tra Địa chỉ chi tiết
            if (!address?.detailAddress) {
                checked = false;
                toast.error('Vui lòng nhập địa chỉ chi tiết!!');
            }
        }

        return checked;
    };

    const handleChangeAddress = (checked) => {
        setSelectedAddress(checked);
    };

    if(loading) {
        return <Loading/>
    }
    return (
        <div className="w-[100%] bg-[#f5f5f5]">
            {/* Header */}
            <MainHeader />
            <div className="h-24"></div>

            {/* Progress bar */}
            <div className="flex items-center justify-center mt-[50px] mb-[70px]">
                <div className="w-[20px] h-[20px] rounded-full bg-black relative">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Giỏ hàng</div>
                </div>
                <div className="w-[200px] h-[4px] bg-black"></div>
                <div className="w-[20px] h-[20px] rounded-full bg-black relative">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Đặt hàng</div>
                </div>
                <div className="w-[200px] h-[4px] bg-[#d8d8d8]"></div>
                <div className="w-[20px] h-[20px] rounded-full relative bg-[#f2f0f0] border border-[#cdcdcd]">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Thanh Toán</div>
                </div>
                <div className="w-[200px] h-[4px] bg-[#d8d8d8]"></div>
                <div className="w-[20px] h-[20px] rounded-full relative bg-[#f2f0f0] border border-[#cdcdcd]">
                    <div className="text-base text-center absolute top-[21px] w-[103px] left-[-40px]">Hoàn tất</div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full flex justify-between px-[105px]">
                {/* Content */}
                <div className="w-full flex justify-between px-[105px]">
                    {/* left */}
                    <div className="flex-1 mr-[34px]">
                        {/* delivery information */}
                        <div className="bg-white w-full p-[19px] mb-[34px]">
                            <div className="flex justify-between items-center mb-[25px]">
                                <div className="flex items-center">
                                    <div className="w-[40px] object-cover text-center mr-2">
                                        <img src={icon.iconAddress} alt="" />
                                    </div>
                                    <div className="text-lg font-semibold">Thông tin giao hàng</div>
                                </div>

                                <div className="flex items-center">
                                    <div className="w-[40px] object-cover text-center mr-2">
                                        <img src={icon.iconBookAndPencil} alt="" />
                                    </div>
                                    <div className="text-lg font-semibold">Thay đổi</div>
                                </div>
                            </div>
                            <div className="flex items-center justify-around mb-4 space-x-4">
                                <button
                                    onClick={() => handleChangeAddress(true)}
                                    className={`p-4 ${
                                        selectedAddress ? 'bg-black text-white' : ''
                                    } font-semibold w-1/2 rounded-md border border-slate-500`}
                                >
                                    Địa chỉ đã lưu
                                </button>
                                <button
                                    onClick={() => handleChangeAddress(false)}
                                    className={`p-4 ${
                                        !selectedAddress ? 'bg-black text-white' : ''
                                    } font-semibold w-1/2 rounded-md border border-slate-500`}
                                >
                                    Địa chỉ mới
                                </button>
                            </div>
                            {/* Address Information */}
                            <div>
                                {selectedAddress ? (
                                    <AddressBook handleGetDataAddress={handleGetDataAddress} />
                                ) : (
                                    <AddressInformation handleGetDataAddress={handleGetDataAddress} />
                                )}
                            </div>
                        </div>
                        {/* Delivery Method */}
                        <div>
                            <DeliveryMethod handleGetDataDeliveryMethod={handleGetDataDeliveryMethod} />
                        </div>

                        {/* Payment method */}
                        <div>
                            <PaymentMethod handleGetDataPaymentMethod={handleGetDataPaymentMethod} />
                        </div>
                        {/* Product list */}
                        <div>
                            <ProductList  handleGetDataProductInCart={handleGetDataProductInCart} setSize={setSize}/>
                        </div>
                    </div>

                    {/* right */}
                    <div className="w-[390px]">
                        <OrderDetail
                            handleFeatOrder={handleFeatOrder}
                            handleGetShippingFee={handleGetShippingFee}
                            handleGetTotalAmount={handleGetTotalAmount}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Order;
