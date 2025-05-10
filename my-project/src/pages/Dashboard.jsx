import { React, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import Banner from "../partials/Banner";
import { Outlet, useNavigate } from "react-router-dom";
import DashboardMain from "../layouts/DashboardMain";
import Product from "../layouts/Product";
import VoucherManagement from "../modal/Voucher/VoucherManagement";
import OrderManagement from "../modal/Order/OrderManagement";
import OrderViewDetail from "../modal/Order/OrderViewDetail";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState("dashboard");
  const [orderId, setOrderId] = useState(null)
  // const [token, setToken] = useState(null); // Khởi tạo token rỗng
  // const [isLoading, setIsLoading] = useState(true);
  // const [role,setRole] = useState("")


  const navigate = useNavigate();





  // useEffect(() => {
  //   const storedToken = localStorage.getItem("token"); // Lấy token từ localStorage

  //   if (!storedToken) {
  //     setToken(null);
  //     setIsLoading(false);
  //   } else {
  //     try {
  //       setIsLoading(false)
  //       //Giai ma token
  //      const decodedToken = jwtDecode(storedToken)
  //      setRole(decodedToken.scope)
  //       console.log(role);
  //     } catch (error) {}
  //     setToken(storedToken);
  //     setIsLoading(false);
  //   }
  // }, [navigate]);

  //render
  const renderComponent = () => {
    switch (currentComponent) {
      case "product":
        return <Product />;
      case "voucher":
        return <VoucherManagement/>;
      case "order":
        return <OrderManagement setCurrentComponent={setCurrentComponent} setOrderId={setOrderId}/>
      case "orderDetail":
        return <OrderViewDetail setCurrentComponent={setCurrentComponent} orderId={orderId}/>
      default:
        return <DashboardMain/>
    }
  };

  // if (isLoading) {
  //   // Trong khi chờ kiểm tra token, hiển thị loading hoặc một nội dung khác
  //   return <div>Loading...</div>;
  // }
  return (
    <div >
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setCurrentComponent={setCurrentComponent}/>

          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <main className="grow">
              {renderComponent()} {/* Render component dựa trên state */}
            </main>
            <Banner />
          </div>
          
        </div>
        
      {/* {role == "ADMIN" ? (
        
      ) : (
        navigate("/")
      )} */}
    </div>
  );
}

export default Dashboard;