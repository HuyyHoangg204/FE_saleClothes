import { useState } from 'react';
import icons from '../../assets/icons';
import MaleSize from './MaleSize';
import FemaleSize from './FemaleSize';
import ChildrenSize from './ChildrenSize';

function InfoSizeModal() {
    const [showMaleSize, setShowMaleSize] = useState(true);
    const [showFeMaleSize, setShowFeMaleSize] = useState(false);
    const [showChildrenSize, setShowChildrenSize] = useState(false);

    const handleClickMaleSize = () => {
        setShowFeMaleSize(false)
        setShowChildrenSize(false)
        setShowMaleSize(true)
    }
    const handleClickFeMaleSize = () => {
        setShowFeMaleSize(true)
        setShowChildrenSize(false)
        setShowMaleSize(false)
    }
    const handleClickChildrenSize = () => {
        setShowFeMaleSize(false)
        setShowChildrenSize(true)
        setShowMaleSize(false)
    }

    return (
        // Overlay
        <div className="fixed inset-0 flex justify-center z-10 w-full h-full bg-black bg-opacity-50">
            <div className="w-[1170px] relative bg-white flex flex-col items-center py-[80px] px-[40px] h-full overflow-y-auto">
                {/* Button close */}
                <div className="absolute right-4 top-4 p-3 cursor-pointer">
                    <img className="w-6 h-6" src={icons.iconClose} alt="" />
                </div>
                {/* Header modal */}
                <div>
                    <span className="font-sans font-semibold text-[32px] ">BẢNG TƯ VẤN SIZE</span>
                    <ul className="flex justify-between py-4 font-sans font-medium text-[20px] ">
                        <li onClick={handleClickMaleSize} className="cursor-pointer p-2 relative">
                            Nam
                            {showMaleSize && (
                                <div className="h-[4px] rounded-lg bg-black absolute w-[62px] left-0"></div>
                            )}
                        </li>
                        <li onClick={handleClickFeMaleSize} className="cursor-pointer p-2 relative">
                            Nữ
                            {showFeMaleSize && (
                                <div className="h-[4px] rounded-lg bg-black absolute w-[44px] left-0"></div>
                            )}
                        </li>
                        <li onClick={handleClickChildrenSize} className="cursor-pointer p-2 relative">
                            Trẻ em
                            {showChildrenSize && (
                                <div className="h-[4px] rounded-lg bg-black absolute w-[88px] left-0"></div>
                            )}
                        </li>
                    </ul>
                </div>
                {/* Main modal */}
                <div className="w-full">
                    {showMaleSize && <MaleSize />}
                    {showFeMaleSize && <FemaleSize/>}
                    {showChildrenSize && <ChildrenSize/>}
                </div>
            </div>
        </div>
    );
}

export default InfoSizeModal;
