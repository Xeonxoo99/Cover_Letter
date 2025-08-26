import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring } from 'framer-motion';
import { CountUp } from 'countup.js';
import { Canvas } from '@react-three/fiber';

import MacbookScene from './MacbookScene';
import AnimatedImage from './AnimatedImage';

import html5 from '../images/introduction/HTML5.svg';
import css3 from '../images/introduction/CSS3.svg';
import js from '../images/introduction/JS.svg';
import react from '../images/introduction/React.svg';
import nextjs from '../images/introduction/nextjs.svg';

// 이미지 데이터.
const images = [
  { src: html5, alt: 'HTML5' },
  { src: css3, alt: 'CSS3' },
  { src: js, alt: 'JavaScript' },
  { src: react, alt: 'React' },
  { src: nextjs, alt: 'nextjs' },
];

// 이력 데이터
const historyItems = [
  { title: 'Seoul Electronic High School', year: '2018', status: 'Graduation' },
  { title: "Driver's License", year: '2020', status: 'Obtain' },
  { title: 'Coding Bootcamp', year: '2023', status: 'Completed' },
  { title: 'SBS Academy', year: '2024~', status: 'In Progress' },
];

const extendedImages = Array(100).fill(images).flat();

// 텍스트 애니메이션 지연 시간 데이터
const textAnimationDelays = [0.5, 1, 1.5];

function Introduction() {
  const [num, setNum] = useState(0);
  const countUpRef = useRef(null);
  const finalNumber = 3;

  const sectionRef = useRef(null);
  const opacityRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const isEndInView = useInView(endRef, { margin: '-50% 0px -50% 0px' });
  const [isMobile, setIsMobile] = useState(false);

  // 모바일 환경에서의 Macbook 위치를 저장할 상태 추가
  const [macbookPosition, setMacbookPosition] = useState({ top: 0, left: 0, startTop: 0, startLeft: 0 });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1500);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const { scrollYProgress: opacityProgress } = useScroll({
    target: opacityRef,
    offset: ['start start', 'end end'],
  });

  const opacity = useTransform(opacityProgress, [0, 0.99, 1], [1, 1, 0]);
  const scale_transform = useTransform(scrollYProgress, [0.05, 0.38], [1.3, 1]);
  const x_linear = useTransform(scrollYProgress, [0.05, 0.38], [-450, delta.x - 250]);
  const y_linear = useTransform(scrollYProgress, [0.05, 0.38], [-350, delta.y - 100]);
  const springConfig = { damping: 30, stiffness: 200 };
  const x = useSpring(x_linear, springConfig);
  const y = useSpring(y_linear, springConfig);

  // isMobile 상태에 따라 Macbook 위치를 상태에 저장
  useLayoutEffect(() => {
    const sectionElement = sectionRef.current;
    if (startRef.current && endRef.current && sectionElement) {
      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();
      const sectionRect = sectionElement.getBoundingClientRect();

      const newStartTop = startRect.top - sectionRect.top;
      const newStartLeft = startRect.left - sectionRect.left;

      setMacbookPosition({
        top: endRect.top - sectionRect.top,
        left: endRect.left - sectionRect.left,
        startTop: newStartTop,
        startLeft: newStartLeft,
      });

      setDelta({
        x: (endRect.left - sectionRect.left) - newStartLeft,
        y: (endRect.top - sectionRect.top) - newStartTop,
      });
    }
  }, [isMobile]);

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

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // isMobile 값에 따라 스타일을 동적으로 적용
  // isMobile 값에 따라 스타일을 동적으로 적용
  const macbookStyle = isMobile
    ? {
      position: 'absolute',
      width: '50vw',
      height: '50vw',
      zIndex: 10,
      top: macbookPosition.top,
      left: macbookPosition.left
    }
    : {
      x,
      y,
      scale: scale_transform, // scale 스타일 적용
      position: 'absolute',
      width: '50vw',
      height: '50vw',
      zIndex: 10,
      top: macbookPosition.startTop,
      left: macbookPosition.startLeft
    };

  return (
    <section ref={sectionRef} className='relative w-full pt-[6vw] px-[3.125vw] pb-[8vw] font-aeonik'>
      <motion.div style={{ opacity }}>
        <motion.div style={macbookStyle}>
          <Canvas shadows camera={{ fov: 30 }}>
            <MacbookScene playAnimation={!isMobile && isEndInView} />
          </Canvas>
        </motion.div>
        <div className='flex w-[70vw] pt-10 max-md:pt-14 -ml-[1vw]'>
          <div>
            <p className='relative left-2 text-[20px] lg:left-4 max-md:text-[16px] font-pretendard'>
              안녕하세요. 항상 발전 중인 프론트엔드 개발자, 김연수 입니다.
            </p>
            <span className='max-xl:text-[13.5416666667vw] max-lg:text-[15.625vw]'>
              <h1 className='p-0 m-0 text-6xl lg:text-[160px] md:text-[140px] sm:text-[120px] uppercase leading-none'>
                Front-End Developer, Always in Progress.
              </h1>
            </span>
          </div>
          <div ref={startRef} className='relative w-[25vw] h-[30vw] pt-3'></div>
        </div>

        <div className='relative w-full py-20 overflow-hidden max-md:py-16'>
          <div className='marquee-container'>
            <div className='marquee-content'>
              {extendedImages.map(({ src, alt }, index) => (
                <div key={index} className='marquee-item'>
                  <img src={src} alt={alt} className='w-24 lg:w-48' />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className='relative w-full flex justify-between max-lg:flex-col-reverse'>
          <div className='relative w-[45vw] max-lg:w-full'>
            <div className='text-lg leading-[1em] text-left'>
              <span className='block w-[23vw] font-medium font-Arial uppercase max-lg:w-[50vw]'>
                I focus on problem-solving by calmly analyzing issues and learning from mistakes. I embrace failures as growth opportunities and set small goals to build confidence and maintain steady progress.
              </span>
            </div>
            <div className='relative flex'>
              <div ref={endRef} className='relative w-[25vw] h-[30vw] pt-3 max-lg:w-[50vw] max-lg:h-[50vw]'>
                {/* 끝나는 지점 */}
              </div>
              <span className='w-[20vw] mt-2 ml-3 text-lg font-pretendard text-left max-lg:w-[50vw] max-lg:text-base'>
                저는 문제 상황이 발생했을 때 침착하게 분석하고, 그 과정을 통해 실수를 배우는 기회로 삼아 문제를 해결하는 데 집중합니다. <br /> 실패를 두려워하지 않고 오히려 성장의 발판으로 받아들이며, 자신감을 쌓기 위해 작은 목표부터 차근차근 설정하고 꾸준히 나아가는 태도를 중요하게 생각합니다.
              </span>
            </div>
          </div>
          <div className='relative w-[45vw] max-lg:w-full pb-24'>
            <div className='border-t-[1px] border-b-[1px] border-[#000000]'>
              {historyItems.map((item, index) => (
                <div
                  key={item.title}
                  className={`relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer ${index > 0 ? 'border-t-[1px] border-[#000000]' : ''}`}
                >
                  <div className='w-full block flex-grow-1 uppercase'> {item.title} </div>
                  <div className='inline-block px-[2vw] text-center w-auto'> {item.year} </div>
                  <div className='text-right w-full block flex-grow-1 uppercase'> {item.status} </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div ref={opacityRef} className='relative block h-[200vh] -mb-[115vh] uppercase font-aeonik font-semibold'>
          <div className='sticky top-0 mt-[3vw] flex w-full h-[100vh] items-center justify-between'>
            <div className='flex flex-col w-[50%] justify-start'>
              {textAnimationDelays.map((delay, index) => (
                <motion.span
                  key={`finished-${index}`}
                  className='relative text-xl'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay }}
                >
                  finished
                </motion.span>
              ))}
            </div>
            <span ref={countUpRef} className='text-[42vw] text-center w-[50%]'>{num.toLocaleString()}</span>
            <div className='flex flex-col w-[50%] justify-end text-right'>
              {textAnimationDelays.map((delay, index) => (
                <motion.span
                  key={`projects-${index}`}
                  className='relative text-xl'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.1, delay }}
                >
                  projects
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Introduction;