import '~/css/header.css';
import { Link } from 'react-router-dom';
import {
    categoryFemaleAccessories,
    categoryFemaleClothesSet,
    categoryFemaleDresses,
    categoryFemaleJackets,
    categoryFemaleShirts,
    categoryFemaleShoes,
    categoryFemaleSkirts,
    categoryFemaleTrousers,
} from '../../pages/sale/categoryData';
import FadeInSection from '../../components/motion/FadeInSection';

function CategoryNu() {
    const categoryShirts = categoryFemaleShirts;
    const categoryTrousers = categoryFemaleTrousers;
    const categoryShoes = categoryFemaleShoes;
    const categoryAccessories = categoryFemaleAccessories;
    const categoryJackets = categoryFemaleJackets;
    const categorySkirts = categoryFemaleSkirts;

    const categoryDresses = categoryFemaleDresses;

    const categoryClothesSet = categoryFemaleClothesSet;
    return (
        <div
            style={{ width: '1312px', height: '400px', top: '6rem', left: '50%', transform: 'translate(-50%, 0)' }}
            className="top36rem bg-white z-10 border cursor-default flex justify-between px-10 pt-4 fixed rounded-sm shadow font-sans"
        >
            <div className="w-[700px]">
                <div className="flex justify-between ">
                    <FadeInSection>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Áo</li>
                                {categoryShirts.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.2}>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Quần</li>
                                {categoryTrousers.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.3}>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Giày</li>
                                {categoryShoes.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.3}>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Phụ kiện</li>
                                {categoryAccessories.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                </div>
                <div className="flex justify-between pt-6">
                    <FadeInSection>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Áo khoác</li>
                                {categoryJackets.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.2}>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Chân váy</li>
                                {categorySkirts.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.3}>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Đầm/Áo dài</li>
                                {categoryDresses.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                    <FadeInSection delay={0.3}>
                        <div>
                            <ul>
                                <li className="font-semibold pb-2">Set bộ</li>
                                {categoryClothesSet.map((item, index) => (
                                    <li key={index} className="font-light cursor-pointer hover:font-medium">
                                        <Link to={`/danh-muc/nu/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeInSection>
                </div>
            </div>
            <FadeInSection delay={0.3}>
                <div className="flex justify-around space-x-3">
                    <img className="object-cover w-[201px] h-[267px]" src="/images/maunu1.webp" alt="" />
                    <img className="object-cover w-[201px] h-[267px]" src="/images/maunu2.webp" alt="" />
                </div>
            </FadeInSection>
        </div>
    );
}

export default CategoryNu;
