import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '../contexts/ScrollProgressContext';

import me from '../images/imformation/me.jpg'

import tailwindcss from '../images/introduction/Tailwind.svg'
import gsap from '../images/introduction/GSAP.svg'
import git from '../images/introduction/git.svg'
import threejs from '../images/introduction/Threejs.svg'

const images = [
  {
    src: 'https://img2.storyblok.com/700x0/filters:quality(85):format(webp)/f/160527/6720x4480/4e09ba972d/0p0a5742-edit.jpg',
    alt: 'Smart Device Tec + Bugatti',
    tag: 'Bugatti Carbone Limited Edition',
  },
];

const carouselItems = [
  { type: 'text', content: 'EFFORT' },
  { type: 'image', src: tailwindcss, alt: 'Tailwind CSS', text: 'TAILWIND CSS' },
  { type: 'image', src: gsap, alt: 'GSAP', text: 'GSAP' },
  { type: 'image', src: git, alt: 'git', text: 'GIT' },
  { type: 'image', src: threejs, alt: 'threejs', text: 'THREE.JS' },
];

//  검정색 박스 나타나는 순서
const fixedRevealOrder = [
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
  // 검정색 박스 애니메이션
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

  // svg로고 및 이미지 박스 애니메이션
  const sectionRef = useRef(null); // 전체 섹션 ref
  const ani2Ref = useRef(null); // 2번째 애니메이션 div ref

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // 부모 section 전체 스크롤
  });

  const { scrollYProgress: ani2scrollYProgress } = useScroll({
    target: ani2Ref,
    offset: ["start end", "end start"], // 2번째 애니메이션 div ref 전체 스크롤
  });

  // 8개 아이콘
  const iconOpacity = useTransform(scrollYProgress, [0, 0.3, 0.31, 0.5, 1], [0, 1, 1, 0, 0]);

  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = iconOpacity.onChange((latest) => {
      if (latest > 0) {
        const interval = setInterval(() => {
          // carouselItems 배열의 길이를 기준으로 인덱스를 순환합니다.
          setCurrentItemIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        }, 1500); // n초마다 아이템 변경

        return () => clearInterval(interval);
      } else {
        setCurrentItemIndex(0);
      }
    });

    return () => unsubscribe();
  }, [iconOpacity]);

  // 아이템 애니메이션을 위한 variants
  const itemVariants = {
    animate: { visibility: 'visible' },
    exit: { visibility: 'hidden' },
  };

  // svg 로고 및 이미지 박스

  const x = useTransform(ani2scrollYProgress, [0, 0.7], ['0vw', '56vw']); // transform: translateX(0) → translateX(49.3vw)

  const size = useTransform(ani2scrollYProgress, [0, 0.7], ['18vw', '5800vw']); // height, width: 초기 18vw → 5500vw
  const greyOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const horizontalRef = useRef(null);

  const { scrollYProgress : horizontalScrollYProgress } = useScroll({
    target: horizontalRef,
    offset: ['start start', 'end end'],
  });

  const horizontal = useTransform(horizontalScrollYProgress, [0, 1], ['0px', '4384px']);

  return (
    <section ref={sectionRef} className="relative block">
      {/* 애니메이션 */}
      <div className="relative flex flex-wrap w-full items-center pointer-events-none text-[16px]">
        {/* 1번 애니메이션 */}
        <div className="fixed flex top-0 left-0 w-full h-screen flex-wrap">
          {boxes.map((boxIndex) => (
            <motion.div
              key={boxIndex}
              className="w-[5vw] h-[10vh] flex-grow-1 bg-[#000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: fixedRevealOrder.indexOf(boxIndex) < revealedBoxCount ? 1 : 0 }}
            />
          ))}
        </div>

        {/* 2번 애니메이션 */}
        <motion.div ref={ani2Ref} className='relative block w-full h-[400vh] bg-black'
          style={{ opacity: 1, mixBlendMode: 'difference' }}>
          <div className='fixed flex flex-wrap top-0 left-0 w-screen h-screen items-center justify-center overflow-hidden'>
            <div className='absolute flex w-screen h-full items-center justify-center'>

              {/* 이미지 박스 */}
              {/* <motion.div className='absolute top-10 w-screen h-[150vh]'
                style={{ opacity: imageOpacity }}
              >
                <img src={me} alt="me" className='w-screen h-screen object-cover' />
              </motion.div> */}

              {/* 로고 박스 */}
              <motion.div className='absolute flex w-screen h-full items-center justify-center'>
                <motion.svg
                  id="b"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 886.2 1106.5"
                  className="absolute"
                  style={{
                    translate: 'none',
                    rotate: 'none',
                    scale: 'none',
                    opacity: greyOpacity,
                    transform: `translate(${x}vw, 0px)`,
                    height: size,
                    width: size,
                    overflow: 'hidden',
                    fill: '#000000',
                    flexShrink: 1,
                  }}
                >
                  <motion.path
                    id="about-logo_grey"
                    data-name="about-logo grey"
                    d="M87.1 193.2h712v720h-712z"
                    style={{ fill: 'rgb(184, 184, 184)', strokeWidth: 0, opacity: 1 }}
                  />
                  <path
                    d="M473 579.7c0 5.7 4.6 9.3 11.9 9.3 11.6 0 18.7-7.2 18.8-18.2v-1.6h-16.2c-9.3 0-14.6 3.8-14.6 10.5Z"
                    className="cls-1"
                  />
                  <path
                    d="M-1-.3v1106.7h887.3V-.3H-1Zm276.1 605.2c-22.5 0-37.7-10.5-38.6-27.8h21c.8 7.1 6.9 11.9 17.7 11.9s14.9-3 14.9-8.6-5.5-7.1-18.5-8.8c-18.8-2.2-33.5-6.4-33.5-23.1s14-26.5 34.7-26.4c21.7 0 36.6 9.6 37.7 26.1h-21.2c-.6-6.4-6.8-10.4-15.7-10.4s-14.3 3.1-14.3 8.3 6.9 6.8 18.5 8.2c18.5 1.9 33.9 6.1 33.9 24.3s-15.1 26.2-36.7 26.2Zm169.8-.9h-22.1v-45.1c0-12.1-4.4-18.4-14-18.4s-16 7.1-16 19.3v44.1h-22.1v-45.1c0-12.1-4.4-18.4-14.1-18.4s-15.9 7.4-15.9 19.5v44h-22.1v-80.7h19.3l2 10.1c4.9-6.3 11.9-10.8 23.7-11 9.9-.2 19.2 3.5 24.2 13.7 5.7-8.6 15.1-13.7 27.3-13.7s29.8 9.4 29.8 35.3v46.3Zm88.4 0H522c-11.5 0-15.1-5.5-14.9-13.2-5.7 9-13.8 14.1-26.4 14.1s-30-8.3-30-23.7 12.9-26.9 37.1-26.9h16v-3.9c0-7.2-5.2-11.9-14.4-11.9s-14.4 3.9-15.4 9.9h-21.4c1.6-15.7 16-26.1 37.4-26.1s35.7 10.1 35.7 29.4v28.6c0 4.2 1.7 5 5.2 5h2.5V604Zm52.8-60.6h-8.8c-13.2 0-18.2 8.8-18.2 21V604H537v-80.7h20.1l2 12.1c4.4-7.2 10.7-12.1 23.2-12.1h3.8v20.1Zm58.3 60.6h-18.1c-15.4 0-23.1-7.7-23.1-23.1V542h-13.3v-18.7h13.3v-22.6h22.1v22.6h18.5V542h-18.5v35.3c0 5.7 2.2 8 8 8h11V604Z"
                    className="cls-1"
                  />
                </motion.svg>
              </motion.div>
            </div>


            {/* 아이콘들 영역 */}
            <motion.div className='relative top-0 py-[10vh] px-[5.2vw] w-screen h-screen flex flex-wrap items-center justify-center'
              style={{ opacity: iconOpacity }}
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="relative flex w-[33%] h-[20%] items-center justify-center"
                  style={{ opacity: index === 4 ? 0 : iconOpacity }}
                >
                  <AnimatePresence mode='wait'>
                    {currentItemIndex !== null && (
                      carouselItems[currentItemIndex].type === 'image' ? (
                        <motion.img
                          key={currentItemIndex + "-img"}
                          src={carouselItems[currentItemIndex].src}
                          alt={carouselItems[currentItemIndex].alt}
                          className={`absolute w-40 h-40 object-contain ${currentItemIndex === 4 ? 'top-2 right-[10vw]' : ''}`}
                          variants={itemVariants}
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "linear" }}
                        />
                      ) : (
                        <motion.div
                          key={currentItemIndex + "-text"}
                          className='absolute flex text-center items-center justify-center text-white text-4xl font-bold'
                          variants={itemVariants}
                          animate="animate"
                          exit="exit"
                          transition={{ duration: 0.3, ease: "linear" }}
                        >
                          <span>{carouselItems[currentItemIndex].content}</span>
                        </motion.div>
                      )
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 소개 부분 */}
      <div className='relative w-full -mt-[100vh] z-[999] font-aeonik font-normal bg-[tomato] text-white'>
        {/* 문구 */}
        <span className="block text-[5.2083333333vw] leading-[1em] [mix-blend-mode:difference] px-[3.125vw] relative text-justify [text-align-last:justify] [-moz-text-align-last:justify] [text-indent:46.66667vw]">
          <h1>
            Hard-Working Dev {/* 근면 성실한 사람 */}
            <br />
            is a front-end developer crafting modern web interfaces for innovative brands like
          </h1>
        </span>

        {/*  */}
        <div>
          <div className='h-[1487.5px]'></div>
          <div className='h-[1120px]'></div>
          <div className='h-[928.2px]'></div>
        </div>

        {/* 가로 스크롤 */}
        <div ref={horizontalRef} className="block z-[9999] m-0 absolute overflow-visible box-border w-[4384px] h-[962px] p-0 bg-[green]">
          <div className="block absolute translate-none rotate-0 scale-100 inset-t-0 inset-l-0 m-0 max-w-[1326px] w-[1326px] max-h-[962px] h-[962px] p-0 [transform:translate(0px,0px)]">
            <motion.div  className={`relative flex w-fit h-full`}
            style={{ x: horizontal }}
            >
              {/* Developer */}
              <div className='relative flex flex-col -ml-[30vw] overflow-hidden'>
                <span className='text-[70vh]'>
                  <span className="flex items-center text-[var(--bg-color)] flex-shrink-0 h-screen leading-[1.2em] -ml-[0.067em] pl-[3.125vw] relative whitespace-nowrap">
                    <span>
                      <span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>D</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>e</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>v</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>e</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>l</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>o</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>p</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'>e</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,-120%)]'></span>
                      </span>
                    </span>
                  </span>
                </span>
                <span className='text-[70vh]'>
                  <span className="flex items-center text-[var(--bg-color)] flex-shrink-0 h-screen leading-[1.2em] -ml-[0.067em] pl-[3.125vw] relative whitespace-nowrap">
                    <span>
                      <span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>D</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>e</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>v</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>e</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>l</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>o</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>p</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'>e</span>
                        <span className='inline-block translate-none rotate-0 scale-100 [transform:translate(0px,0px)]'></span>
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              {/* 이미지 */}
              <div className="translate-none rotate-0 scale-100 [transform:translate3d(-0.0vw,0px,0px)] counter-reset-[grid-counter] grid [grid-template-columns:repeat(100,1fr)] [grid-template-rows:repeat(100,1fr)] h-screen -mr-[20vw] min-w-[1600px] pointer-events-none relative w-[120vw]">
                {images.map((item, index) => (
                  <div
                    key={index}
                    className={`relative`}
                    style={{ transform: 'translate(0px, 0px)' }}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={700}
                        height="auto"
                        draggable={false}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="mt-2 text-sm text-gray-700">{item.tag}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Imformation;