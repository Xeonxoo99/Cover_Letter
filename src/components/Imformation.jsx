import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../contexts/ScrollProgressContext';

import me from '../images/imformation/me.jpg'

import tailwindcss from '../images/introduction/Tailwind.svg'
import gsap from '../images/introduction/GSAP.svg'
import git from '../images/introduction/git.svg'
import threejs from '../images/introduction/Threejs.svg'

const carouselItems = [
  { type: 'image', src: tailwindcss, alt: 'Tailwind CSS', text: 'TAILWIND CSS' },
  { type: 'image', src: gsap, alt: 'GSAP', text: 'GSAP' },
  { type: 'image', src: git, alt: 'git', text: 'GIT' },
  { type: 'image', src: threejs, alt: 'threejs', text: 'THREE.JS' },
  { type: 'text', content: 'EFFORT' } // EFFORT 텍스트 아이템 추가
];

const fixedRevealOrder = [
  // 여기에 제가 새로 만들어 드린 긴 배열을 붙여넣으세요
  175, 23, 179, 137, 185, 110, 169, 149, 115, 184, 186, 17, 159, 183, 192, 117, 98, 102, 33, 27,
  194, 91, 74, 96, 157, 43, 132, 195, 109, 105, 68, 14, 13, 197, 104, 82, 199, 108, 18, 113,
  128, 12, 165, 15, 164, 163, 172, 136, 19, 148, 120, 188, 103, 151, 141, 140, 135, 176, 170, 71,
  114, 55, 122, 198, 3, 173, 116, 143, 76, 124, 130, 2, 70, 48, 187, 129, 64, 89, 21, 16,
  167, 127, 47, 56, 196, 31, 86, 156, 150, 45, 160, 100, 125, 9, 39, 145, 107, 72, 5, 41,
  138, 174, 193, 28, 6, 80, 166, 88, 146, 155, 133, 90, 171, 75, 44, 153, 10, 83, 180, 50,
  58, 60, 189, 46, 52, 61, 93, 119, 121, 131, 134, 139, 142, 152, 154, 158, 161, 162, 168, 177,
  178, 181, 182, 190, 0, 1, 4, 7, 8, 11, 20, 22, 24, 25, 26, 29, 30, 32, 34, 35,
  36, 37, 38, 40, 42, 49, 51, 53, 54, 57, 59, 62, 63, 65, 66, 67, 69, 73, 77, 78,
  79, 81, 84, 85, 87, 92, 94, 95, 97, 99, 101, 106, 111, 112, 118, 126, 147, 123, 144, 191
];

function Imformation() {
  const { cardScrollProgress } = useScrollProgress();
  const totalBoxes = 200;
  const boxes = Array.from({ length: totalBoxes }, (_, index) => index);

  const [revealedBoxCount, setRevealedBoxCount] = useState(0);

  useEffect(() => {
    const thirdCardProgress = cardScrollProgress[3];
    const animationStartThreshold = 0.001;
    const animationEndThreshold = 0.55;

    if (thirdCardProgress === undefined || thirdCardProgress < animationStartThreshold) {
      setRevealedBoxCount(0);
      return;
    }

    const mappedProgress = Math.min(
      1,
      Math.max(
        0,
        (thirdCardProgress - animationStartThreshold) / (animationEndThreshold - animationStartThreshold)
      )
    );

    const targetRevealedCount = Math.floor(mappedProgress * totalBoxes);

    setRevealedBoxCount(prevCount => {
      const newCountByTens = Math.floor(targetRevealedCount / 10) * 10;
      if (newCountByTens > prevCount) {
        return Math.min(newCountByTens, totalBoxes);
      } else if (newCountByTens < prevCount) {
        return Math.max(0, Math.ceil(targetRevealedCount / 10) * 10);
      }
      return prevCount;
    });

  }, [cardScrollProgress, totalBoxes]);

  const AniRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: AniRef,
    offset: ['start end', 'end end'],
  })

  const iconOpacity = useTransform(scrollYProgress, [0, 0.5], [1,0])

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = iconOpacity.onChange((latest) => {
      if (latest > 0.5) {
        const interval = setInterval(() => {
          // carouselItems 배열의 길이를 기준으로 인덱스를 순환합니다.
          setCurrentItemIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        }, 1000); // n초마다 아이템 변경

        return () => clearInterval(interval);
      } else {
        setCurrentItemIndex(0); // 아이콘 영역이 보이지 않게 되면 첫 번째 아이템으로 초기화
      }
    });

    return () => unsubscribe();
  }, [iconOpacity, carouselItems.length]); // carouselItems.length도 의존성 배열에 추가

  // 아이템 애니메이션을 위한 variants
  const itemVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };



  return (
    <section ref={AniRef} className="relative block">

      {/* 애니메이션 */}
      <div className="relative flex w-full items-center flex-wrap pointer-events-none text-[16px]">
        {/* 1번 애니메이션 */}
        <div className="fixed flex top-0 left-0 w-full h-screen flex-wrap">
          {boxes.map((boxIndex) => (
            <motion.div
              key={boxIndex}
              className="w-[5vw] h-[10vh] bg-[#000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: fixedRevealOrder.indexOf(boxIndex) < revealedBoxCount ? 1 : 0 }}
            />
          ))}
        </div>

        {/* 2번 애니메이션 */}
        <div className=' block w-screen h-[400vh]'>
          <div className='fixed flex flex-wrap top-0 left-0 w-screen h-screen items-center justify-center'>
            <div className='absolute flex w-screen h-screen items-center justify-center'>
              {/* 이미지 박스 */}
              <div className='absolute w-screen h-[150vh]'
                style={{ opacity: 0 }}
              >
                <img src={me} alt="me" className='w-screen h-screen object-cover' />
              </div>
              {/* 로고 박스 */}
              <div className='absolute flex w-screen h-full items-center justify-center'
                style={{ opacity: 0 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.113 29.355" className="w-[18vw] h-[18vw]">
                  <text
                    x="0"
                    y="24"
                    fontFamily="aeonik, sans-serif"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    REACT
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* 아이콘들 영역 */}
          <div className='sticky top-0 py-[10vh] px-[5.2vw] w-screen h-screen flex flex-wrap items-center justify-center'
            style={{ opacity: iconOpacity }}
          >
            {/* 각 아이콘을 담을 컨테이너 */}
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            {/* 가운데 */}
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'>
              {/* AnimatePresence로 이미지 교체 애니메이션 활성화 */}
              <AnimatePresence mode='wait'>
                {/* 현재 currentItemIndex에 해당하는 아이템만 렌더링합니다. */}
                {currentItemIndex !== null && (
                  // 현재 아이템의 타입에 따라 다른 컴포넌트를 렌더링합니다.
                  carouselItems[currentItemIndex].type === 'image' ? (
                    // 이미지 타입일 경우
                    <motion.img
                      key={currentItemIndex + "-img"} // 고유 key
                      src={carouselItems[currentItemIndex].src}
                      alt={carouselItems[currentItemIndex].alt}
                      className={`absolute w-40 h-40 object-contain ${currentItemIndex === 3 ? 'top-2 right-48' : ''}`}
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    />
                  ) : (
                    // 텍스트 타입일 경우 ('EFFORT' 텍스트)
                    <motion.div
                      key={currentItemIndex + "-text"} // 고유 key
                      className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                      variants={itemVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.3, ease: "linear" }}
                    >
                      <span>{carouselItems[currentItemIndex].content}</span>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
      {/* 소개 부분 */}
      <div>

      </div>
    </section>
  );
}

export default Imformation;