import { useState, useEffect } from 'react';
import { getProductInCart } from '../../redux/apiRequest';

function ItemProduct({ item, onLoaded}) {
    const key = item[0].split('_');
    const quantity1 = item[1];

    const [productData, setProductData] = useState({
        productName: '',
        price: 0,
        colorName: '',
        imageUrl: '',
    });
    const [priceTemp, setPriceTemp] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getProductInCart(key[0], key[2]);
            const variantId = result.result.variants.variant_id;
            
            
            // Gửi dữ liệu về component cha
            onLoaded?.({
                quantity: quantity1,
                productVariant: {
                    variant_id: variantId,
                },
                size: key[1]
            });

            const price = result?.result.base_price;
            const quantity = item[1];
            setPriceTemp(price);

            setProductData({
                productName: result.result.name,
                price: price,
                colorName: result.result.colorName,
                imageUrl: result.result.variants.imageUrl,
            });

            // handleTotalPrice(price * quantity);
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="flex py-3 items-center border-y border-[#cdcdcd]">
                {' '}
                {/* Thêm items-center */}
                <div className="w-[72px] h-[96px] flex-shrink-0">
                    <img className="w-full h-full object-cover" src={productData.imageUrl[0]} alt="" />
                </div>
                <div className="flex-1 ml-5">
                    <div className="w-full flex justify-between items-center">
                        {' '}
                        {/* Thêm items-center */}
                        <div className="text-[18px] font-medium flex-1">{productData.productName}</div>
                        <div className="text-base font-semibold w-[100px] text-right">
                            {productData.price.toLocaleString('vi-VN')}đ
                        </div>
                        <div className="text-base w-[100px] text-right">Số lượng: {item[1]}</div>
                    </div>
                    <div className="flex items-center mt-1">
                        <div className="">{productData.colorName}</div>
                        <div className="w-[1px] h-[16px] bg-[#cdcdcd] mx-2"></div>
                        <div className="size">{key[1]}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemProduct;
