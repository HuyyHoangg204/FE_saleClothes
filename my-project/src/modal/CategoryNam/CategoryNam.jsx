import { Link } from 'react-router-dom';
import '~/css/header.css';
import { categoryMaleShirts, categoryMaleShoes, categoryMaleTrousers } from '../../pages/sale/categoryData';
import FadeInSection from '../../components/motion/FadeInSection';

function CategoryNam() {
    const categoryShirts = categoryMaleShirts;
    const categoryTrousers = categoryMaleTrousers;
    const categoryShoes = categoryMaleShoes;

    return (
        <div
            style={{ width: '1312px', height: '296px', top: '6rem', left: '50%', transform: 'translate(-50%, 0)' }}
            className="top36rem bg-white z-10 cursor-default border flex justify-between px-10 pt-4 fixed rounded-sm shadow font-sans"
        >
            <FadeInSection>
                <div>
                    {/* Category shirt */}
                    <ul>
                        <li className="font-semibold pb-2">Áo</li>
                        {categoryShirts.map((item, index) => (
                            <li key={index} className="font-light cursor-pointer hover:font-medium">
                                <Link to={`/danh-muc/nam/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeInSection>
            <FadeInSection delay={0.2}>
                <div>
                    {/* Category trouser */}
                    <ul>
                        <li className="font-semibold pb-2">Quần</li>
                        {categoryTrousers.map((item, index) => (
                            <li key={index} className="font-light cursor-pointer hover:font-medium">
                                <Link to={`/danh-muc/nam/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeInSection>
            <FadeInSection delay={0.3}>
                <div>
                    {/* Category shoe */}
                    <ul>
                        <li className="font-semibold pb-2">Giày</li>
                        {categoryShoes.map((item, index) => (
                            <li key={index} className="font-light cursor-pointer hover:font-medium">
                                <Link to={`/danh-muc/nam/${item.slug}`} state={{ id: item.id, name: item.name }}>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </FadeInSection>

            <FadeInSection delay={0.3}>
                <div className="flex justify-around space-x-3">
                    <div className="flex h-full items-center">
                        <img className="object-cover h-[267px] w-[201px]" src="/images/maunam1.jpg" alt="" />
                        <img className="object-cover h-[267px] w-[201px]" src="/images/maunam2.jpg" alt="" />
                    </div>
                </div>
            </FadeInSection>
        </div>
    );
}

export default CategoryNam;
