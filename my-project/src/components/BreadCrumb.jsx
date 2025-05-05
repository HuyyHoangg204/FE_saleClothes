import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function BreadCrumb({ breadcrumb }) {
    const navigate = useNavigate();

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    const hanleClick = (item) => {
        if (item === 'Trang chủ') {
            navigate('/');
        }
    };

    return (
        <div className="flex px-[112px] mt-3 items-center">
            {breadcrumb.map((item, index) => (
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
                    key={index}
                >
                    <div  className="">
                        <span
                            onClick={() => hanleClick(item)}
                            className="font-sans font-light text-[14px] cursor-pointer"
                            key={index}
                        >
                            {item}
                        </span>
                        <span className="font-sans font-light text-[18px] mx-3">
                            {index < breadcrumb.length - 1 && '|'}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

export default BreadCrumb;
