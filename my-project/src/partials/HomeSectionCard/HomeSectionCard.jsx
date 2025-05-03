import { useEffect, useState } from 'react';
import icons from '../../assets/icons';
import ModalAddCart from '../../modal/ModalAddCart/ModalAddCart';
import DoneIcon from '@mui/icons-material/Done';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { addProductToFavoritesProduct, getAllProductsFavoriteByUsername } from '../../redux/apiRequest';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FadeInSection from '../../components/motion/FadeInSection';

function HomeSectionCard({ item }) {
    const [showModalAddCard, setShowModalAddCard] = useState(false);
    const [chooseVariant, setChooseVariant] = useState(item?.variants[0]);
    const [hovered, setHovered] = useState(false);
    const [addCartDone, setAddCartDone] = useState(true);

    const dispatch = useDispatch();

    const favoriteProduct = useSelector((state) => state?.product?.getAllFavoriteProduct?.currentAllProduct);

    useEffect(() => {
        setChooseVariant(item?.variants[0]); // Reset về biến thể mặc định
    }, [item]);

    const navigate = useNavigate();

    const toggleShowModalAddCard = () => {
        setShowModalAddCard((prev) => !prev);
    };
    const handleMouseEnter = () => {
        setChooseVariant();
    };

    const handleNavigateDetailProduct = () => {
        navigate(`/product/${item?.productId}-${item?.name}`);
    };
    const handleClickFavoriteProduct = async () => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            const decodedToken = jwtDecode(accessToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                try {
                    const response = refreshtoken(accessToken);
                    const username = jwtDecode(response?.result?.token).sub;
                    const message = await addProductToFavoritesProduct(username, item?.productId);
                    await getAllProductsFavoriteByUsername(username, dispatch);
                    toast.success(message);
                } catch (error) {
                    localStorage.removeItem('token');
                    toast.error('Bạn cần đăng nhập để dùng được chức năng này!');
                }
            } else {
                try {
                    const username = decodedToken.sub;
                    const message = await addProductToFavoritesProduct(username, item?.productId);
                    await getAllProductsFavoriteByUsername(username, dispatch);
                    toast.success(message);
                } catch (error) {
                    console.log(error);
                    toast.error('Thêm sản phẩm vào danh sách thất bại thất bại');
                }
            }
        } else {
            toast.error('Bạn cần đăng nhập để dùng được chức năng này!');
        }
    };

    return (
        <div className="w-[246px] h-[490px] bg-white">
            {/* Image */}
            <div
                className="cursor-pointer h-[369px] relative overflow-hidden"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleNavigateDetailProduct}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={hovered ? 'hovered' : 'default'}
                        className="h-full w-full object-cover absolute"
                        src={hovered ? chooseVariant?.imageUrl[1] : chooseVariant?.imageUrl[0]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>
            </div>
            {/* Color */}
            <div className="">
                <div className="flex justify-between mt-5">
                    <FadeInSection>
                        <div className="flex space-x-2">
                            {item?.variants.map((variant, index) => (
                                <div
                                    className="w-[18px] h-[18px] rounded-full border border-slate-500 relative cursor-pointer"
                                    style={{ backgroundColor: variant.colorCode }}
                                    onClick={() => setChooseVariant(variant)}
                                    key={index}
                                >
                                    {chooseVariant === variant && (
                                        <DoneIcon className="text-slate-400 absolute top-[-4px] left-[-4px]" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </FadeInSection>
                    {/* Favorite Product*/}
                    <FadeInSection>
                        <div>
                            <FavoriteIcon
                                onClick={handleClickFavoriteProduct}
                                className={`w-5 h-5 ${
                                    favoriteProduct?.some((product) => product.productId === item.productId)
                                        ? ' text-pink-500'
                                        : 'text-slate-300'
                                } cursor-pointer`}
                            />
                        </div>
                    </FadeInSection>
                </div>
                <FadeInSection>
                    <div className="font-sans font-light text-[18px] mb-2 truncate w-full">{item?.name}</div>
                </FadeInSection>
                <FadeInSection>
                    <div className="flex items-center justify-between">
                        <span className="font-sans font-semibold text-xl">
                            {' '}
                            {item?.basePrice?.toLocaleString('vi-VN')}đ
                        </span>
                        <div className="relative">
                            <span className="font-medium opacity-50 text-sm">
                                {item?.oldPrice ? Math.round(item.oldPrice).toLocaleString('vi-VN') : ''}đ
                            </span>
                            <div className="h-[1px] w-full bg-black opacity-40 absolute z-5 top-1/2"></div>
                        </div>
                        {/* Add cart */}
                        <div className="relative">
                            <img
                                onClick={toggleShowModalAddCard}
                                className="w-10 h-10  cursor-pointer"
                                src={icons.iconAddCart}
                                alt=""
                            />

                            {showModalAddCard && (
                                <ModalAddCart
                                    showModalAddCard={showModalAddCard}
                                    chooseVariant={chooseVariant}
                                    productId={item.productId}
                                    toggleShowModalAddCard={toggleShowModalAddCard}
                                />
                            )}
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
}

export default HomeSectionCard;
