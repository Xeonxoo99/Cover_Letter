import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { CountUp } from 'countup.js';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';

import MacbookScene from './MacbookScene'

import AnimatedImage from './AnimatedImage';

import html5 from '../images/introduction/HTML5.svg'
import css3 from '../images/introduction/CSS3.svg'
import js from '../images/introduction/JS.svg'
import react from '../images/introduction/React.svg'
import nextjs from '../images/introduction/nextjs.svg'

const images = [
  { src: html5, alt: 'HTML5' },
  { src: css3, alt: 'CSS3' },
  { src: js, alt: 'JavaScript' },
  { src: react, alt: 'React' },
  { src: nextjs, alt: 'nextjs' }
]

function Introduction() {
  const [num, setNum] = useState(0);
  const countUpRef = useRef(null);
  const finalNumber = 3;

  const sectionRef = useRef(null);
  const opacityRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const isEndInView = useInView(endRef, { margin: "-50% 0px -50% 0px" });

  // sectionRef 하나로 통일하여 scrollYProgress 값을 가져옵니다.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress:opacityProfress } = useScroll({
    target: opacityRef,
    offset: ['start start', 'end end'],
  });

  // 전체 섹션의 opacity를 제어
  const opacity = useTransform(opacityProfressfi, [0, 0.99, 1], [1, 1, 0]);

  // Macbook의 위치를 제어
  // 1. 기존 useTransform은 그대로
  const x_linear = useTransform(scrollYProgress, [0.05, 0.5], [0, delta.x]);
  const y_linear = useTransform(scrollYProgress, [0.05, 0.5], [0, delta.y]);

  // 2. useSpring으로 새로운 motion value를 생성
  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(x_linear, springConfig);
  const y = useSpring(y_linear, springConfig);


  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    if (startRef.current && endRef.current && sectionElement) {
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();

      const relativeStartX = startRect.left - sectionRect.left;
      const relativeStartY = startRect.top - sectionRect.top;
      const relativeEndX = endRect.left - sectionRect.left;
      const relativeEndY = endRect.top - sectionRect.top;

      setDelta({
        x: relativeEndX - relativeStartX,
        y: relativeEndY - relativeStartY,
      });
    }
  }, []);

  useEffect(() => {
    if (countUpRef.current) {
      const countUp = new CountUp(countUpRef.current, finalNumber, {
        duration: 3,
        useEasing: true,
        useGrouping: true,
      });

      const handleScroll = () => {
        if (countUpRef.current && countUpRef.current.getBoundingClientRect().top * 2.5 <= window.innerHeight) {
          if (!countUp.error) countUp.start(() => setNum(finalNumber));
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <section ref={sectionRef} className='relative w-full pt-[6vw] px-[3.125vw] pb-[8vw] font-aeonik'>
      {/* 간략한 소개 문구 */}
      <motion.div style={{ opacity }}>
        <motion.div
          className='absolute top-0 right-0 w-[25vw] h-[30vw] z-10'
          style={{ x, y, top: startRef.current?.offsetTop, left: startRef.current?.offsetLeft }}
        >
          {/* Canvas는 부모 div(motion.div)의 크기를 100% 채웁니다. */}
          <Canvas shadows camera={{ fov: 30 }}>
            {/* 4. Canvas 내부에 MacbookScene을 렌더링하고 playAnimation prop을 전달합니다. */}
            <MacbookScene playAnimation={isEndInView} />
          </Canvas>
        </motion.div>
        <div className='flex w-1/2 lg:w-[1400px] pt-10 -ml-[1vw]'>
          <div className=''>
            <p className='relative left-2 lg:left-4 font-pretendard'>
              안녕하세요. 항상 발전 중인 프론트엔드 개발자, 김연수 입니다.
            </p>
            <h1 className='p-0 m-0 text-6xl lg:text-[160px] uppercase leading-none'

            >
              Front-End Developer, Always in Progress.
            </h1>
          </div>
          {/* 시작 지점 */}
          <div ref={startRef} className='relative w-[25vw] h-[30vw] pt-3'></div>
        </div>

        {/* 아이콘들 Marquee */}
        <div className='relative w-full'>
          <div className='relative py-52 left-1/2 transform -translate-x-1/2 w-screen h-16 flex items-center justify-around'>
            {images.map(({ src, alt }, index) => (
              <AnimatedImage
                key={index}
                src={src}
                alt={alt}
                index={index}
                scrollYProgress={scrollYProgress} // scrollYProgress 값을 props로 전달
              />
            ))}
          </div>
        </div>

        {/* 중간 문구 */}
        {/* <div className='relative w-full pb-24 flex flex-col items-center text-center text-[2vw] uppercase'>
          <span className='inline-block'>
            <h2 className='leading-[38.4px]'>Junior</h2>
            <h2 className='leading-[38.4px]'>Frontend</h2>
            <h2 className='leading-[38.4px]'>Developer</h2>
          </span>
          <div className='w-full flex justify-around'>
            <span className='w-[50%] text-center'>since</span>
            <span className='w-[50%] text-center'>2023:</span>
          </div>
        </div> */}

        {/* 자기소개 및 자격증/졸업 등*/}
        <div className='relative w-full flex justify-between'>
          {/* 자기 소개 */}
          <div className='w-[45vw]'>
            <div className='text-lg leading-[1em] text-left'>
              <span className='block w-[23vw] font-medium font-Arial uppercase'>
                I focus on problem-solving by calmly analyzing issues and learning from mistakes. I embrace failures as growth opportunities and set small goals to build confidence and maintain steady progress.
              </span>
            </div>

            <div className='relative flex'>
              {/* 이미지가 아니라 three.js 사용해서 노트북 넣기,,?? */}
              <div ref={endRef} className='relative w-[25vw] h-[30vw] pt-3'>
                {/* 끝나는 지점 */}
              </div>

              <span className='w-[20vw] mt-2 ml-3 text-lg font-pretendard text-left'>
                저는 문제 상황이 발생했을 때 침착하게 분석하고, 그 과정을 통해 실수를 배우는 기회로 삼아 문제를 해결하는 데 집중합니다. <br /> 실패를 두려워하지 않고 오히려 성장의 발판으로 받아들이며, <br /> 자신감을 쌓기 위해 작은 목표부터 차근차근 설정하고 꾸준히 나아가는 태도를 중요하게 생각합니다.
              </span>
            </div>
          </div>
          {/* 자격증 / 졸업 */}
          <div className='relative w-[45vw]'>

            <div className='border-t-[1px] border-b-[1px] border-[#000000]'>
              {/* 졸업 */}
              <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer'>
                <div className='w-full block flex-grow-1 uppercase'> Seoul Electronic High School </div>
                <div className='inline-block px-[2vw] text-center w-auto'> 2018 </div>
                <div className='text-right w-full block flex-grow-1 uppercase'> Graduation </div>
              </div>
              {/* 운전면허증 */}
              <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer border-t-[1px] border-[#000000]'>
                <div className='w-full block flex-grow-1 uppercase'> Driver's License </div>
                <div className='inline-block px-[2vw] text-center w-auto'> 2020 </div>
                <div className='text-right w-full block flex-grow-1 uppercase'> obtain </div>
              </div>
              {/* 부트캠프(항해99) 수료 */}
              <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer border-t-[1px] border-[#000000]'>
                <div className='w-full block flex-grow-1 uppercase'> Coding Bootcamp </div>
                <div className='inline-block px-[2vw] text-center w-auto'> 2023 </div>
                <div className='text-right w-full block flex-grow-1 uppercase'> Completed </div>
              </div>
              {/* sbs아카데미 */}
              <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer border-t-[1px] border-[#000000]'>
                <div className='w-full block flex-grow-1 uppercase'> sbs academy </div>
                <div className='inline-block pl-[0.5vw] text-center w-auto'> 2024~ </div>
                <div className='text-right w-full block flex-grow-1 uppercase'> In Progress </div>
              </div>
            </div>

          </div>
        </div>

        <div ref={opacityRef} className='relative block h-[200vh] -mb-[115vh] uppercase font-aeonik font-semibold'>
          <div className='sticky top-0 mt-[3vw] flex w-full h-[100vh] items-center justify-between'>
            {/* finished */}
            <div className='flex flex-col w-[50%] justify-start'>
              <motion.span
                className='relative text-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.5 }}
              >
                finished
              </motion.span>
              <motion.span
                className='relative text-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 1 }}
              >
                finished
              </motion.span>
              <motion.span
                className='relative text-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 1.5 }}
              >
                finished
              </motion.span>
            </div>
            {/* count 숫자 */}
            <span ref={countUpRef} className='text-[42vw] text-center w-[50%]'>{num.toLocaleString()}</span>
            {/* projects */}
            <div className='flex flex-col w-[50%] justify-end text-right'>
              <motion.span
                className='relative text-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 0.5 }}
              >
                projects
              </motion.span>
              <motion.span
                className='relative text-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 1 }}
              >
                projects
              </motion.span>
              <motion.span
                className='relative text-xl'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.1, delay: 1.5 }}
              >
                projects
              </motion.span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Introduction;
