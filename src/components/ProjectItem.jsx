import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ProjectItem = ({ item }) => {
  const ref = useRef(null);
  
  // 요소가 뷰포트에 30% 보이면 inView는 true가 됩니다. (애니메이션은 한 번만 실행)
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const isVideo = item.src.endsWith('.mp4');

  return (
    // item.style로 전달된 절대 위치값을 적용하고, 이 요소를 감지 대상으로 설정합니다.
    <div ref={ref} className={`absolute  ${item.style}`}>
      <motion.div
        // 초기 상태: 아래에서 100% 가려진 상태
        initial={{ clipPath: 'inset(100% 0 0 0)' }}
        // isInView가 true가 되면 애니메이션 실행
        animate={isInView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        <div className="relative flex justify-center overflow-hidden">
          {isVideo ? (
            <video
              src={item.src}
              className="object-cover"
              autoPlay
              muted
              playsInline
              loop // 비디오가 반복 재생되도록 loop 속성 추가
            />
          ) : (
            <img
              src={item.src}
              alt={item.alt}
              draggable={false}
              className="object-cover"
            />
          )}
        </div>
        <div className="text-xs text-[#ffffff]/60 text-left mt-2">
          <span>{item.tag}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectItem;