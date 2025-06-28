import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollProgress } from '../contexts/ScrollProgressContext';

function PortfolioCard({ item }) {

    const ref = useRef(null);

    // useScrollProgress 훅을 사용하여 Context에서 updateScrollProgress 함수를 가져옵니다.
    const { updateScrollProgress } = useScrollProgress();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

   // scrollYProgress 값이 변할 때마다 Context를 업데이트합니다.
    useEffect(() => {
      // scrollYProgress의 변화를 감지하고, 해당 카드 ID와 함께 Context에 업데이트합니다.
      // item.id를 사용하여 각 카드를 고유하게 식별합니다.
      const unsubscribe = scrollYProgress.onChange((latestProgress) => {
        updateScrollProgress(item.id, latestProgress);
    //   console.log(`[PortfolioCard - ID: ${item.id}] Latest Scroll Progress: ${latestProgress}`);

      });
      return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    }, [scrollYProgress, item.id, updateScrollProgress]);


    const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 8]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
    const opacity = useTransform(scrollYProgress,[0, 0.99, 1],[1, 1, 0]);
    
    return (
        <div
            ref={ref}
            className="relative w-full h-[calc(200vh-6.25vw)] mb-[calc(-100vh+4.16667vw)] pointer-events-none"
        >
            <div className="relative w-full h-[400vh]">
                <div className="sticky flex flex-col top-0 w-full h-screen items-center justify-center">
                    <motion.div
                        className="relative overflow-hidden justify-between text-[#ffffff] w-[calc(100%-6.25vw)] h-[calc(100vh-6.25vw)] rounded-[30px] opacity-100"
                        style={{ y, rotate, scale,opacity }}
                    >
                        {/* 배경 */}
                        <div className="absolute w-full h-full">
                            {item.video ? (
                                <video autoPlay muted loop className="w-full h-[120%] object-cover">
                                    <source src={item.video} type="video/mp4" />
                                </video>
                            ) : (
                                <img src={item.img} alt="project visual" className="absolute w-full h-[120%] object-cover" />
                            )}
                        </div>

                        {/* 상단 */}
                        <div className="absolute top-4 w-full z-10 flex flex-shrink-0 items-center justify-center">
                            <span className="absolute text-[1.5625vw] top-[1.04167vw] left-[calc(14px+1.04167vw)]">
                                {item.year}
                            </span>
                            <img
                                src={item.logo}
                                alt="logo"
                                className={`${item.id === 3 ? 'w-24 mt-3' : 'w-32 mt-6'}`}
                            />
                            <span className="absolute text-[1.5625vw] top-[1.04167vw] right-[calc(14px+1.04167vw)]">
                                {item.count}
                            </span>
                        </div>

                        {/* 중단 텍스트 */}
                        <div className="relative flex w-full h-full items-center justify-center">
                            <div className="absolute flex flex-col w-full justify-center">
                                <div className="relative text-[14vw] w-full h-[.9em] mb-[.02em]">
                                    <div className="relative flex overflow-hidden w-full h-full">
                                        {[1, 2].map((i) => (
                                            <motion.div
                                                key={i}
                                                animate={{ x: ['0%', '-100%'] }}
                                                transition={{
                                                    repeat: Infinity,
                                                    repeatType: 'loop',
                                                    duration: 77,
                                                    ease: 'linear',
                                                }}
                                                className="inline-flex flex-row flex-nowrap items-center"
                                            >
                                                <span className="relative inline-block uppercase whitespace-nowrap mr-[.26em] mb-[.15em]">
                                                    {item.text}
                                                </span>
                                                <span className="relative inline-block uppercase whitespace-nowrap mr-[.26em] mb-[.15em]">
                                                    {item.text}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute flex items-center justify-center w-[33.33333vw] max-h-[70vh] h-[calc(100%-60px)]">
                                <img src={item.center} alt="center visual" className="absolute w-full h-full object-contain object-center" />
                            </div>
                        </div>

                        {/* 하단 */}
                        <div className="absolute bottom-0 w-full flex flex-shrink-0 justify-center items-center">
                            <div className="relative w-full h-full flex justify-center items-end">
                                <span className="text-[1.5625vw] px-[1vw] text-center uppercase leading-4">{item.text}</span>
                            </div>
                            <div className="relative w-full flex justify-center">
                                <a
                                    href={item.buttonLink}
                                    className="relative text-[1.5625vw] flex flex-grow-0 justify-center mt-[1vw] mb-[1vw] py-[8px] px-[24px]"
                                >
                                    <div className="absolute top-0 w-full h-full rounded-[100px] bg-[rgb(215,30,40)]" />
                                    <span className="relative block">VISIT NOW</span>
                                </a>
                            </div>
                            <div className="relative flex w-full h-full items-end justify-center">
                                <span className="text-[1.5625vw] px-[1vw] text-center uppercase">Portfolio</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioCard;
