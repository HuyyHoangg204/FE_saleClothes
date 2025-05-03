import { motion } from "framer-motion";
import HomeSectionCard from "../../partials/HomeSectionCard/HomeSectionCard";
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

function AnimatedCarouselItem({ item, index, activeIndex }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView) {
      setHasBeenInView(true); // chỉ cập nhật 1 lần
    }
  }, [inView]);

  const isVisible = activeIndex <= index && index < activeIndex + 5;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: hasBeenInView ? 1 : 0.6,
        scale: hasBeenInView ? 1 : 0.95,
        y: hasBeenInView ? 0 : 10,
      }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <HomeSectionCard item={item} />
    </motion.div>
  );
}

export default AnimatedCarouselItem;
