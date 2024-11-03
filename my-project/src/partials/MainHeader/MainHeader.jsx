import { Fragment, useEffect, useState } from "react";
import icons from "../../assets/icons";
import CategoryChild from "../../modal/CategoryChild/CategoryChild";
import CategoryNam from "../../modal/CategoryNam/CategoryNam";
import CategoryNu from "../../modal/CategoryNu/CategoryNu";
import Cart from "../../layouts/Cart";
import '~/css/Cart.css'

function MainHeader() {
  const [displayCart, setDisplayCart] = useState(false)

  // Handle popup cart 
  const toggleShowCart = () => {
    setDisplayCart((true));
  }
  const toggleHideCart = () => {
    setDisplayCart(false);
  }
  const data = [
    {
      id: 1,
      name: "Hoangf",
      password: "1234",
    },
    {
      id:2,
      name:"Hoang",
      password:"dfgfgd"
    }
  ];

  return (
    <Fragment>
      <header className="fixed top-0 z-10 h-24 w-full flex bg-white justify-between items-center  px-28 font-sans text-l border-b shadow">
      <div className="flex items-center space-x-12 relative">
        <div>
          <a href="/">
            <img
              className="w-40 h-24 object-cover "
              src="images/Harious-store.png"
              alt=""
            />
          </a>
        </div>
        <div>
          <ul className="flex space-x-6 font-medium">
            <li className="cursor-pointer p-3 group  ">
              <span className="group-hover:text-red-500">NAM</span>
              <div className="w-11 h-1 bg-black absolute rounded-3xl left-[218px] bottom-0 opacity-0 group-hover:opacity-100 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></div>
              <span className="absolute w-24 h-8 top-16 left-48 opacity-0  bg-slate-400"></span>
              <div className="hidden group-hover:block transition-opacity duration-300 ease-in-out">
                <CategoryNam />
              </div>
            </li>
            <li className="cursor-pointer p-3 group ">
              <span className="group-hover:text-red-500">NỮ</span>
              <div className="w-11 h-1 bg-black absolute rounded-3xl left-[300px] bottom-0 opacity-0 group-hover:opacity-100 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></div>
              <span className="absolute w-24 h-8 top-16 left-[270px] opacity-0  bg-slate-400"></span>
              <div className="hidden group-hover:block transition-opacity duration-300 ease-in-out">
                <CategoryNu />
              </div>
            </li>
            <li className="cursor-pointer p-3 group ">
            <span className="group-hover:text-red-500">TRẺ EM</span>
              <div className="w-16 h-1 bg-black absolute rounded-3xl left-[381px] bottom-0 opacity-0 group-hover:opacity-100 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></div>
              <span className="absolute w-24 h-8 top-14 left-[366px] opacity-0  bg-slate-400"></span>
              <div className="hidden group-hover:block transition-opacity duration-300 ease-in-out">
                <CategoryChild />
              </div>
            </li>
            <li className="cursor-pointer p-3 group hover:text-red-500">
              SALE
              <div className="w-11 h-1 bg-black absolute rounded-3xl left-[491px] bottom-0 opacity-0 group-hover:opacity-100 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></div>
            </li>
            <li className="cursor-pointer p-3 group hover:text-red-500">
              VỀ CHÚNG TÔI
              <div className="w-28 h-1 bg-black absolute rounded-3xl left-[588px] bottom-0 opacity-0 group-hover:opacity-100 transition-transform duration-200 transform scale-x-0 group-hover:scale-x-100"></div>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-16 ">
        <div className="flex items-center w-80 h-10 border rounded-3xl">
          <img className="w-7 h-6 mx-2" src={icons.iconSearch} alt="" />
          <input
            type="text"
            placeholder="TÌM KIẾM SẢN PHẨM"
            className="w-full opacity-60 mr-2 p-1 outline-none border-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center space-x-8">
          <div onClick={toggleShowCart} className="relative cursor-pointer">
            <img  className="w-12 h-8" src={icons.iconShoppingCart} alt="" />
            <div className="absolute top-[-4px] right-[-4px] bg-red-700 rounded-full w-5 text-white text-xs items-center  justify-center flex">
              0
            </div>
          </div>
          <a href="/">
            <img className="w-12 h-8" src={icons.iconAccount} alt="" />
          </a>
        </div>
      </div>
    </header>
    {
      displayCart && (<Cart toggleHideCart={toggleHideCart}/>)
    }
    </Fragment>
  );
}

export default MainHeader;
