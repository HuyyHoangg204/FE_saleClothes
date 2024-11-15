import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import Login from "~/pages/Login/Login.jsx";
import Register from "~/pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/home/Home.jsx";
import Order from "./pages/order/Order.jsx";
import "./css/style.css";
import "./charts/ChartjsConfig";
import SalePages from "./pages/sale/SalePages.jsx";
import InfoUser from "./pages/infoUser/InfoUser.jsx";
import MainProduct from "./pages/product/MainProduct.jsx";


function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/order" element={<Order />} />
        <Route path="/my-account" element={<InfoUser breadcrumb = {['TRANG CHỦ', 'THÔNG TIN CÁ NHÂN']}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<MainProduct/>} />
        <Route path="/nam/ao-so-mi" element={<SalePages breadcrumb = {['Trang chủ', 'Nam', 'Áo sơ mi']}/>}/>
        <Route path= "/order" element= {<Order/>}/>
      </Routes>
    </div>
  );
}

export default App;
