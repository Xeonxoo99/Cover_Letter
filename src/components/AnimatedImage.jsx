import React from 'react';
import { motion, useTransform } from 'framer-motion';

// scrollYProgress와 index를 props로 받습니다.
function AnimatedImage({ src, alt, scrollYProgress, index }) {
  // 컴포넌트의 최상위 레벨에서 Hook을 호출하므로 규칙에 어긋나지 않습니다.
  const start = index * 0.03;
  const end = start + 0.2;
  const inputRange = [start, end];

  const filter = useTransform(
    scrollYProgress,
    inputRange,
    ['grayscale(1)', 'grayscale(0)']
  );

  return (
    <motion.img
      src={src}
      alt={alt}
      className='w-40 h-40 object-contain'
      style={{ filter }} // 여기서 계산된 filter 값을 사용합니다.
    />
  );
}

export default AnimatedImage;