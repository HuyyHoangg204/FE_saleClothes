import { useEffect, useState } from 'react';
import icons from '../../assets/icons';
import ModalAddCart from '../../modal/ModalAddCart/ModalAddCart';
import DoneIcon from '@mui/icons-material/Done';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function HomeSectionCard({ item }) {
    const [showModalAddCard, setShowModalAddCard] = useState(false);
    const [chooseVariant, setChooseVariant] = useState(item?.variants[0]);
    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();

    const toggleShowModalAddCard = () => {
        setShowModalAddCard((prev) => !prev);
    };
    const handleMouseEnter = () => {
        setChooseVariant();
    };

    const handleNavigateDetailProduct =  () => {
        navigate(`/product/${item?.name}`, {state: {productId: item?.productId}})
    }

    return (
        <div className="w-[246px] h-[490px] bg-white">
            <div 
                className="cursor-pointer h-[369px] relative overflow-hidden"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={handleNavigateDetailProduct}
            >
                <AnimatePresence mode="wait">
                    <motion.img 
                        key={hovered ? "hovered" : "default"}
                        className="h-full w-full object-cover absolute"
                        src={hovered ? chooseVariant?.imageUrl[1] : chooseVariant?.imageUrl[0]}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                </AnimatePresence>
            </div>
            <div className="">
                <div className="flex justify-between mt-5">
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
                    <div>
                        <img className="w-5 h-5 bg-white" src={icons.iconFavorite} alt="" />
                    </div>
                </div>
                <div className="font-sans font-light text-[18px] mb-2 truncate w-full">{item?.name}</div>
                <div className="flex items-center justify-between">
                    <span className="font-sans font-semibold text-xl">
                        {' '}
                        {item?.basePrice?.toLocaleString('vi-VN')}đ
                    </span>
                    <div className="relative">
                        <span className="font-medium opacity-50 text-sm">
                            {item?.oldPrice?.toLocaleString('vi-VN') ? Math.round(item.oldPrice) : ''}đ
                        </span>
                        <div className="h-[1px] w-full bg-black opacity-40 absolute z-5 top-1/2"></div>
                    </div>
                    <div className="relative">
                        <img
                            onClick={toggleShowModalAddCard}
                            className="w-10 h-10  cursor-pointer"
                            src={icons.iconAddCart}
                            alt=""
                        />
                        {showModalAddCard && (
                            <ModalAddCart showModalAddCard={showModalAddCard} listSize={chooseVariant?.size} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSectionCard;
