import '~/css/header.css';
import { Link } from 'react-router-dom';
import { categoryLittleBoy1, categoryLittleGirl1 } from '../../pages/sale/categoryData';

function CategoryChild() {
    const categoryLittleBoy = categoryLittleBoy1
    const categoryLittleGirl = categoryLittleGirl1
    return (
        <div
            style={{ width: '1312px', height: '310px', top: '6rem', left: '50%', transform: 'translate(-50%, 0)' }}
            className="top36rem bg-white z-10 cursor-default border flex justify-between px-10 pt-4 fixed rounded-sm shadow font-sans"
        >
            <div>
                <ul>
                    <li className="font-semibold pb-2">Bé nam</li>
                    {categoryLittleBoy.map((item, index) => (
                        <li key={index} className="font-light cursor-pointer hover:font-medium">
                            <Link to={`/danh-muc/child/${item.slug}`} state={{id: item.id,name: item.name}}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    <li className="font-semibold pb-2">Bé nữ</li>
                    {categoryLittleGirl.map((item, index) => (
                        <li key={index} className="font-light cursor-pointer hover:font-medium">
                            <Link to={`/danh-muc/child/${item.slug}`} state={{id: item.id,name: item.name}}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex justify-around space-x-3">
                <div className="flex h-full items-center space-x-2">
                    <img className="object-cover h-[267px] w-[201px]" src="/images/maubenam.webp" alt="" />
                    <img className="object-cover h-[267px] w-[201px]" src="/images/maubenam1.webp" alt="" />
                    <div style={{ width: '1px' }} className=" h-60  bg-black opacity-20 mx-2"></div>
                    <img className="object-cover h-[267px] w-[201px]" src="/images/maubenu.webp" alt="" />
                    <img className="object-cover h-[267px] w-[201px]" src="/images/maubenu1.webp" alt="" />
                </div>
            </div>
        </div>
    );
}

export default CategoryChild;
