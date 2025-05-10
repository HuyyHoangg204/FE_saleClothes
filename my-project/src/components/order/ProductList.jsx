import { useEffect, useState, useMemo } from 'react';
import icon from '../../assets/icons/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import ItemProduct from './ItemProduct.jsx';
import { useNavigate } from 'react-router-dom';

function ProductList({ handleGetDataProductInCart, setSize }) {
    const productFromCart = useSelector((state) => state.cart?.getProductFromCart?.currentCart);
    const navigate = useNavigate();
    // Tính toán lại danh sách sản phẩm và tổng số lượng
    const items = useMemo(() => Object.entries(productFromCart?.result ?? {}), [productFromCart]);
    const quantityProduct = useMemo(() => items.reduce((acc, [, value]) => acc + value, 0), [items]);

    useEffect(() => {
        
        
    },[items])
    
    return (
        <div>
            <div className="bg-white w-full p-[19px] mb-[34px]">
                <div className="flex items-center mb-6">
                    <div className="w-[40px] object-cover text-center mr-2">
                        <img src={icon.iconBasket} alt="" />
                    </div>
                    <div className="text-lg font-semibold">Sản phẩm ({quantityProduct})</div>
                </div>

                {/* list */}
                <div className="p-[10px] mb-[45px]">
                    {/* item */}

                    {items?.map((item, index) => (
                        <div key={index}>
                            <ItemProduct item={item} onLoaded={handleGetDataProductInCart} />
                        </div>
                    ))}
                </div>

                {/* btn */}
                <div className="w-full text-center mb-10">
                    <div
                        onClick={() => navigate('/')}
                        className="btn bg-black text-white rounded-none px-10 cursor-pointer"
                    >
                        TIẾP TỤC MUA SẮM
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductList;
