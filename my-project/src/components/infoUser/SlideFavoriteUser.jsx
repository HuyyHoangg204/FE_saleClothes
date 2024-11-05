import icon from '../../assets/icons/index.jsx';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

function SlideFavoriteUser({ handleChange }) {
    const favoriteProducts = [
        {
            id: 1,
            name: 'Chân váy bút chì',
            imageUrl: '../../assets/images/mauyeuthich.png', // Thay thế bằng hình ảnh thực tế
            colors: ['black', 'yellow', 'navy'],
            sizes: ['M', 'L', 'XL'],
            price: '299.000đ',
        },
        {
            id: 2,
            name: 'Chân váy bút chì',
            imageUrl: '../../assets/images/mauyeuthich.png', // Thay thế bằng hình ảnh thực tế
            colors: ['black', 'yellow', 'navy'],
            sizes: ['M', 'L', 'XL'],
            price: '299.000đ',
        },
    ];

    return (
        <div className="flex-1 bg-white px-[40px] py-[20px]">
            <div className="font-semibold text-[26px] mb-5">YÊU THÍCH</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteProducts.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="relative">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-56 object-cover rounded-md"
                            />
                            <button className="absolute top-2 right-2 text-gray-700 hover:text-red-500">
                                <FaHeart />
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="flex items-center space-x-2">
                                {product.colors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`w-4 h-4 rounded-full`}
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                            <div className="mt-2 flex items-center space-x-2">
                                {product.sizes.map((size, index) => (
                                    <span
                                        key={index}
                                        className="text-sm text-gray-500 border border-gray-300 px-2 py-1 rounded"
                                    >
                                        {size}
                                    </span>
                                ))}
                            </div>
                            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
                            <p className="text-gray-900 font-bold">{product.price}</p>
                        </div>
                        <button className="mt-4 w-full flex items-center justify-center space-x-2 bg-black text-white py-2 rounded hover:bg-gray-800">
                            <FaShoppingCart />
                            <span>Thêm vào giỏ hàng</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SlideFavoriteUser;
