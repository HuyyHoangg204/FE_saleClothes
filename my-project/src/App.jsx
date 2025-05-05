import { BrowserRouter, createRoutesFromElements, Route, Routes, useLocation } from "react-router-dom";
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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VoucherManagement from "./modal/Voucher/VoucherManagement.jsx";
import SearchProductPage from "./pages/SearchProductPage/SearchProductPage.jsx";
import { useDispatch } from "react-redux";
import { setUsername } from "./redux/authSlice.js";
import { jwtDecode } from "jwt-decode";
import OrderSuccess from "./layouts/OrderSuccess.jsx";


function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  //luu username
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const username = decoded.sub || decoded.username;
        dispatch(setUsername(username));
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Dashboard />}/>
        <Route path="/order" element={<Order />} />
        <Route path="/my-account" element={<InfoUser breadcrumb = {['TRANG CHỦ', 'THÔNG TIN CÁ NHÂN']}/>} />
        <Route path="/" element={<Home />} />
        <Route path="/voucher" element={<VoucherManagement/>}/>
        <Route path="/product/:name" element={<MainProduct/>} />
        <Route path="/danh-muc/:gender/:categorySlug" element={<SalePages/>}/>
        <Route path="/tim-kiem/:query" element={<SearchProductPage/>}/>
        <Route path= "/order" element= {<Order/>}/>
        <Route path= "/thank-you" element= {<OrderSuccess/>}/>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
