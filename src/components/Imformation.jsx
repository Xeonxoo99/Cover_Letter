import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollProgress } from '../contexts/ScrollProgressContext';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import me from '../images/imformation/me.jpg'

import tailwindcss from '../images/introduction/Tailwind.svg'
import gsapimg from '../images/introduction/GSAP.svg'
import git from '../images/introduction/git.svg'
import threejs from '../images/introduction/Threejs.svg'
import html5 from '../images/introduction/HTML5.svg'
import css3 from '../images/introduction/CSS3.svg'
import js from '../images/introduction/JS.svg'
import react from '../images/introduction/React.svg'
import nextjs from '../images/introduction/nextjs.svg'
import framerMotion from '../images/introduction/framer.svg'

import baseball_game from '../images/imformation/baseball_game.png'
import jquery from '../images/imformation/jquery.png'
import login from '../images/imformation/login.mp4'
import mini_project from '../images/imformation/mini_project2.gif'
// import mini_project2 from '../images/imformation/mini_project.mp4'

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    src: baseball_game,
    alt: 'baseball_game',
    tag: 'JS로 console 및 prompt로 할 수 있는 게임을 만들었습니다.',
    style: 'top-[50%] left-[-7%]'
  },
  {
    src: jquery,
    alt: 'jquery',
    tag: 'jquery로 만든 영화 기록 블로그입니다.',
    style: 'top-[0%] left-[5%]'
  },
  {
    src: login,
    alt: 'login',
    tag: 'js로 만든 블로그 사이트입니다.',
    style: 'top-[60%] left-[15%]'
  },
  {
    src: mini_project,
    alt: 'mini_project',
    tag: (
      <>
        부트캠프에서 4명이 1조로 작은 프로젝트를 만들었습니다.<br />
        JS로 타이핑, 공룡점프, 벽돌깨기 게임을 각각 만들었습니다.<br />
        저는 타이핑게임을 맡았으며, 화면에 나오는 영문을 제한시간 내에 동일하게 입력해야하는 게임입니다.
      </>
    ),
    style: 'top-[0%] left-[25%]'
  },
  // {
  //   src: mini_project2,
  //   alt: 'mini_project2',
  //       tag: (
  //     <>
  //       부트캠프에서의 마지막 프로젝트입니다.<br />
  //       백엔드 3명, 프론트엔드 2명, 디자이너 1명으로 이루어져있으며,<br />
  //       Next.js, TypeScript, Axios, Tailwind CSS를 사용하였습니다.<br />
  //       회원가입, 로그인, 좋아요, 게시판, 실시간 알림, 실시간 채팅등의 기능이 있습니다.<br />
  //       2023년도에 개발하여, 현재는 벡엔드 관련 이슈로 인해 접속이 어려워, 남아있는 피드백 관련 영상으로 대체합니다.
  //     </>
  //   ),
  //   style: 'top-[35%] left-[43%]'
  // },
];

const carouselItems = [
  { type: 'text', content: 'EFFORT' },
  { type: 'image', src: tailwindcss, alt: 'Tailwind CSS' },
  { type: 'image', src: gsapimg, alt: 'GSAPImg' },
  { type: 'image', src: git, alt: 'GIT' },
  { type: 'image', src: threejs, alt: 'THREE.JS' },
];

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
      Math.max(0, (thirdCardProgress - animationStartThreshold) / (animationEndThreshold - animationStartThreshold))
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

  const sectionRef = useRef(null);
  const ani2Ref = useRef(null);
  const iconRef = useRef(null); // 9칸 그리드 전체를 감싸는 ref
  const svgLogoRef = useRef(null); // 중앙에 고정될 SVG 로고 ref
  const imgRef = useRef(null);
  const displayRef = useRef(null);
  const pathRef = useRef(null);

  const individualCarouselItemRefs = useRef(
    Array(9).fill(null).map(() => Array(carouselItems.length).fill(null))
  );

  const addIndividualCarouselRef = (el, gridIndex, itemIndex) => {
    if (el && individualCarouselItemRefs.current[gridIndex] && individualCarouselItemRefs.current[gridIndex][itemIndex] !== el) {
      individualCarouselItemRefs.current[gridIndex][itemIndex] = el;
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // grid display none으로 변경
      const divNone = gsap.timeline({
        scrollTrigger: {
          trigger: displayRef.current,
          start: "bottom top-=5000",
          end: "70% top",
          scrub: 1,
          // markers:true
        }
      });
      divNone.to(displayRef.current, {
        backgroundColor: 'black'
      })

      // aniRef div opacity 조절
      const divOpacity = gsap.timeline({
        scrollTrigger: {
          trigger: ani2Ref.current,
          start: "bottom bottom+=4200",
          end: "70% top",
          scrub: 1,
          // markers:true
        }
      });
      divOpacity.to(ani2Ref.current, {
        opacity: 1
      })

      // SVG 로고 애니메이션 (기존 useTransform 대체)
      const svgTl = gsap.timeline({
        scrollTrigger: {
          trigger: ani2Ref.current,
          start: "30% top",
          end: "70% top",
          scrub: 1,
        }
      });
      svgTl.to(svgLogoRef.current, {
        x: '56vw',
        width: '5800vw',
        height: '5800vw',
        ease: 'none'
      });

      const svgOpacityTl = gsap.timeline({
        scrollTrigger: {
          trigger: ani2Ref.current,
          start: "30% top",
          end: "top top",
          scrub: 1,
        }
      });
      svgOpacityTl.to(svgLogoRef.current, {
        opacity: 1
      });


      // 로고 내부 path opacity 조절
      const pathTl = gsap.timeline({
        scrollTrigger: {
          trigger: ani2Ref.current,
          start: "10% top",
          end: "70% top",
          scrub: 1,
        }
      });
      pathTl.to(pathRef.current, {
        opacity: 0,
      });

      // meImg opacity 조절
      const imgOpacity = gsap.timeline({
        scrollTrigger: {
          trigger: ani2Ref.current,
          start: "bottom bottom+=1700",
          end: "70% top",
          scrub: 1,
          // markers:true
        }
      });
      imgOpacity.to(imgRef.current, {
        opacity: 1
      })

      // meImg opacity 다시 0으로
      const imgOpacity2 = gsap.timeline({
        scrollTrigger: {
          trigger: ani2Ref.current,
          start: "70% top",
          end: "bottom bottom-=2500",
          scrub: 1,
          // markers:true
        }
      });
      imgOpacity2.to(imgRef.current, {
        opacity: 0
      })


      // 전체 아이콘 영역(iconRef)의 등장 및 사라짐 애니메이션
      const iconOpacityTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "20% top",
          scrub: true,
        }
      });
      iconOpacityTl
        .to(iconRef.current, { opacity: 1 }, "0")
        .to(iconRef.current, { opacity: 1 }, "0.3")
        .to(iconRef.current, { opacity: 0 }, "0.31")

      // 8개 칸에 대한 아이콘 캐러셀 애니메이션 타임라인
      const numCarouselItems = carouselItems.length; // 5개 아이템
      const showDuration = 0.5; // 각 아이템이 완전히 보여지는 시간 (투명도 1을 유지하는 시간)
      const fadeDuration = 0.1; // 나타나고 사라지는 시간 (동일하게 0.5초로 유지)
      const totalItemDuration = showDuration + fadeDuration; // 한 아이템의 총 주기 시간

      const gridIndicesForCarousel = [0, 1, 2, 3, 5, 6, 7, 8];

      gridIndicesForCarousel.forEach((gridIndex, offsetIndex) => {
        const currentGridCarouselRefs = individualCarouselItemRefs.current[gridIndex];

        const allRefsReadyForThisGrid = currentGridCarouselRefs && currentGridCarouselRefs.every(ref => ref !== null);

        if (allRefsReadyForThisGrid) {
          const carouselTl = gsap.timeline({
            repeat: -1, // 무한 반복
            delay: offsetIndex * (totalItemDuration / gridIndicesForCarousel.length), // 각 그리드 칸의 시작 시간을 다르게 설정하여 순차적으로 보이게 함
            paused: true, // 초기에는 정지
          });

          // 모든 캐러셀 아이템의 초기 상태를 투명하게 설정
          gsap.set(currentGridCarouselRefs, { opacity: 0 });
          // 첫 번째 캐러셀 아이템은 미리 보이도록 설정 (애니메이션 시작 전)
          gsap.set(currentGridCarouselRefs[0], { opacity: 1 });

          for (let i = 0; i < numCarouselItems; i++) {
            const currentItem = currentGridCarouselRefs[i];
            const nextItemIndex = (i + 1) % numCarouselItems;
            const nextItem = currentGridCarouselRefs[nextItemIndex];

            if (currentItem && nextItem) {
              carouselTl
                // 현재 아이템이 0.5초 동안 보이고 (opacity: 1 유지), 그 후 0.1초 동안 사라짐
                .to(currentItem, { opacity: 1, duration: showDuration, ease: "none" }) // 0.5초 동안 투명도 1 유지
                .to(currentItem, { opacity: 0, duration: fadeDuration, ease: "power2.in" }, `+=${0}`) // 0.1초 동안 사라짐 (이전 애니메이션 끝나는 시점부터)

                // 다음 아이템이 0.5초 동안 나타남 (현재 아이템이 사라지는 동안 나타나기 시작)
                .to(nextItem, { opacity: 1, duration: fadeDuration, ease: "power2.out" }, `-=${fadeDuration}`); // 현재 아이템 사라지기 시작할 때 다음 아이템 나타나기 시작
            }
          }

          // 스크롤 트리거 로직은 그대로 유지
          ScrollTrigger.create({
            trigger: ani2Ref.current,
            start: "bottom bottom+=3200",
            end: "bottom bottom",
            // markers:true,
            onEnter: () => carouselTl.play(), // ani2Ref가 시작 지점을 지날 때 play
            onLeaveBack: () => carouselTl.pause(0), // 다시 위로 스크롤하여 start 지점을 벗어날 때 정지 (처음으로)
            onLeave: () => carouselTl.pause(), // 아래로 스크롤하여 end 지점을 벗어날 때 정지
            onEnterBack: () => carouselTl.play(), // 다시 위로 스크롤하여 end 지점으로 돌아올 때 play
          });
        } else {
          // console.warn(`Refs for grid index ${gridIndex} are not yet ready.`);
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [carouselItems.length]);

  // 클리핑 마스크 효과


  // 가로 스크롤 (기존 로직 유지)
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;
    const scrollWidth = inner.scrollWidth;
    const viewportWidth = window.innerWidth;
    const tl = gsap.to(inner, {
      x: () => -(scrollWidth - viewportWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: () => `+=${4384}px`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      tl.kill();
    };
  }, []);

  // developer ani (기존 로직 유지)
  const developerRef = useRef(null);
  useEffect(() => {
    if (!developerRef.current) return;
    const letters = developerRef.current.querySelectorAll(".developer-letter");
    gsap.fromTo(
      letters,
      { y: "0%", opacity: 1 },
      {
        y: "-120%",
        opacity: 0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: developerRef.current,
          start: "top top",
          end: "bottom top-=500",
          scrub: true,
          // markers:true
        },
      }
    );
  }, []);

  const developer2Ref = useRef(null);
  useEffect(() => {
    if (!developerRef.current) return;
    const letters = developer2Ref.current.querySelectorAll(".developer-letter2");
    gsap.fromTo(
      letters,
      { y: "120%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        stagger: 0.1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: developer2Ref.current,
          start: "top top",
          end: "bottom top-=500",
          scrub: true,
          // markers:true
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative block overflow-x-clip">
      <div className="relative flex flex-wrap w-full items-center pointer-events-none text-[16px]">
        {/* 1번 애니메이션 */}
        <div ref={displayRef} className="fixed flex top-0 left-0 w-full h-screen flex-wrap"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
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
        <div ref={ani2Ref} className='relative block w-full h-[400vh] '
          style={{ opacity: 0 }}>
          {/* mixBlendMode: 'difference', */}
          <div className='fixed flex flex-wrap top-0 left-0 w-screen h-screen items-center justify-center overflow-hidden'>

            <div className='absolute flex w-screen h-full items-center justify-center'>
              <div ref={imgRef} className='absolute top-10 w-screen h-[150vh]'
                style={{ opacity: 0, willChange: 'clip-path, opacity' }}
              >
                <img src={me} alt="me" className='w-screen h-screen object-cover' />
              </div>
              {/* 로고 박스 (애니메이션이 적용된 중앙 SVG) */}
              <div className='absolute flex w-screen h-full items-center justify-center'>
                <svg
                  ref={svgLogoRef}
                  id="b"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  viewBox="0 0 886.2 1106.5"
                  className="absolute"
                  style={{
                    opacity: 0.3,
                    height: '18vw',
                    width: '18vw',
                    overflow: 'hidden',
                    fill: '#000000',
                    flexShrink: 1,
                  }}
                >
                  <path
                    ref={pathRef}
                    id="about-logo_grey"
                    data-name="about-logo grey"
                    d="M87.1 193.2h712v720h-712z"
                    style={{ fill: 'rgb(184, 184, 184)', strokeWidth: 0, opacity: 1 }}
                  />
                  <path d="M473 579.7c0 5.7 4.6 9.3 11.9 9.3 11.6 0 18.7-7.2 18.8-18.2v-1.6h-16.2c-9.3 0-14.6 3.8-14.6 10.5Z" className="cls-1" />
                  <path d="M-1-.3v1106.7h887.3V-.3H-1Zm276.1 605.2c-22.5 0-37.7-10.5-38.6-27.8h21c.8 7.1 6.9 11.9 17.7 11.9s14.9-3 14.9-8.6-5.5-7.1-18.5-8.8c-18.8-2.2-33.5-6.4-33.5-23.1s14-26.5 34.7-26.4c21.7 0 36.6 9.6 37.7 26.1h-21.2c-.6-6.4-6.8-10.4-15.7-10.4s-14.3 3.1-14.3 8.3 6.9 6.8 18.5 8.2c18.5 1.9 33.9 6.1 33.9 24.3s-15.1 26.2-36.7 26.2Zm169.8-.9h-22.1v-45.1c0-12.1-4.4-18.4-14-18.4s-16 7.1-16 19.3v44.1h-22.1v-45.1c0-12.1-4.4-18.4-14.1-18.4s-15.9 7.4-15.9 19.5v44h-22.1v-80.7h19.3l2 10.1c4.9-6.3 11.9-10.8 23.7-11 9.9-.2 19.2 3.5 24.2 13.7 5.7-8.6 15.1-13.7 27.3-13.7s29.8 9.4 29.8 35.3v46.3Zm88.4 0H522c-11.5 0-15.1-5.5-14.9-13.2-5.7 9-13.8 14.1-26.4 14.1s-30-8.3-30-23.7 12.9-26.9 37.1-26.9h16v-3.9c0-7.2-5.2-11.9-14.4-11.9s-14.4 3.9-15.4 9.9h-21.4c1.6-15.7 16-26.1 37.4-26.1s35.7 10.1 35.7 29.4v28.6c0 4.2 1.7 5 5.2 5h2.5V604Zm52.8-60.6h-8.8c-13.2 0-18.2 8.8-18.2 21V604H537v-80.7h20.1l2 12.1c4.4-7.2 10.7-12.1 23.2-12.1h3.8v20.1Zm58.3 60.6h-18.1c-15.4 0-23.1-7.7-23.1-23.1V542h-13.3v-18.7h13.3v-22.6h22.1v22.6h18.5V542h-18.5v35.3c0 5.7 2.2 8 8 8h11V604Z" className="cls-1" />
                </svg>
              </div>
            </div>

            {/* 아이콘들 영역: 9개의 그리드 칸 */}
            <div ref={iconRef} className='relative top-0 py-[10vh] px-[5.2vw] w-screen h-screen grid grid-cols-3 grid-rows-3 items-center justify-center opacity-0'
              style={{ willChange: 'opacity' }}
            >
              {Array.from({ length: 9 }).map((_, gridIndex) => (
                <div
                  key={gridIndex}
                  className={`relative flex w-full h-full items-center justify-center`}
                >
                  {/* 중앙(index 4)은 빈칸으로 두거나, 필요시 특정 placeholder를 넣을 수 있습니다. */}
                  {gridIndex === 4 ? (
                    <div className="w-full h-full"></div>
                  ) : (
                    // 나머지 8개 칸에서는 carouselItems를 모두 absolute로 겹쳐서 렌더링
                    carouselItems.map((item, itemIndex) => {
                      const itemClasses = `absolute`;
                      return item.type === 'image' ? (
                        <img
                          key={`${gridIndex}-${itemIndex}-img`}
                          src={item.src}
                          alt={item.alt}
                          className={`${itemClasses} w-20 h-20 object-contain`}
                          // Ref를 addIndividualCarouselRef로 전달합니다.
                          ref={el => addIndividualCarouselRef(el, gridIndex, itemIndex)}
                          style={{ opacity: itemIndex === 0 ? 1 : 0 }} // 초기 첫 아이템만 보이게
                        />
                      ) : (
                        <div
                          key={`${gridIndex}-${itemIndex}-text`}
                          className={`${itemClasses} flex text-center items-center justify-center text-white text-4xl font-bold`}
                          // Ref를 addIndividualCarouselRef로 전달합니다.
                          ref={el => addIndividualCarouselRef(el, gridIndex, itemIndex)}
                          style={{ opacity: itemIndex === 0 ? 1 : 0 }} // 초기 첫 아이템만 보이게
                        >
                          <span>{item.content}</span>
                        </div>
                      );
                    })
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className='h-[1487.5px]'></div>
        {/* <div className='h-[1120px]'></div>
        <div className='h-[928.2px]'></div> */}
      </div>
      <div className='relative w-full -mt-[100vh] z-[999] font-aeonik font-normal' style={{ mixBlendMode: 'difference' }}>
        <span className="relative block text-[5.2083333333vw] text-[#b1b1b1] leading-[1em] px-[3.125vw] text-justify [text-align-last:justify] [text-indent:46.66667vw]"
          >
          <h1>Hard-Working Dev<br />is a front-end developer crafting modern web interfaces for innovative brands like</h1>
        </span>
      </div>
      {/* 소개 부분 */}
      <div className='relative w-full z-[9999] font-aeonik font-normal' >
        {/* <span className="relative block text-[5.2083333333vw] text-[#b1b1b1] leading-[1em] px-[3.125vw] text-justify [text-align-last:justify] [text-indent:46.66667vw]"
          style={{ mixBlendMode: 'difference' }}>
          <h1>Hard-Working Dev<br />is a front-end developer crafting modern web interfaces for innovative brands like</h1>
        </span> */}
        <div ref={wrapperRef} className="block z-[9999] m-0 absolute overflow-visible box-border w-[4384px] h-screen p-0">
          <div ref={innerRef} className="block absolute translate-none rotate-0 scale-100 inset-t-0 inset-l-0 m-0 max-w-[1326px] w-[1326px] max-h-[962px] h-[962px] p-0 [transform:translate(0px,0px)]">
            <div className={`relative flex w-fit h-full ]`}>
              <div className='relative flex flex-col -ml-[30vw] overflow-hidden'>
                <span ref={developerRef} className='text-[80vh]'>
                  <span className="flex items-center text-[#ffffff] flex-shrink-0 h-screen leading-[1.2em] ml-[0.67em] pl-[3.125vw] relative whitespace-nowrap">
                    <span>
                      <span>
                        {"Mini Project".split("").map((char, index) => (
                          <span key={index} className='developer-letter inline-block'>{char}</span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
                <span ref={developer2Ref} className='absolute text-[80vh] ml-[34rem]'>
                  <span className="flex items-center text-[#ffffff] flex-shrink-0 h-screen leading-[1.2em] -ml-[0.067em] pl-[3.125vw] relative whitespace-nowrap">
                    <span>
                      <span>
                        {"Mini Project".split("").map((char, index) => (
                          <span key={index} className='developer-letter2 inline-block'>{char}</span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              <div className="translate-none rotate-0 scale-100 h-screen z-auto -mr-[20vw] min-w-[2000px] pointer-events-none relative w-[200vw]" style={{ mixBlendMode: 'difference' }}>
                {projects.map((item, index) => {
                  const isVideo = item.src.endsWith('.mp4'); // 파일 확장자 체크
                  return (
                    <div key={index} className={`absolute ${item.style}`}>
                      <div className="w-full h-full relative flex justify-center overflow-hidden" style={{}}>
                        {isVideo ? (
                          <video
                            src={item.src}
                            className="w-[33%] h-[33%] object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={item.src}
                            alt={item.alt}
                            draggable={false}
                            className="w-[55%] h-[45%] object-cover"
                          />
                        )}
                      </div>
                      <div className="text-sm text-[#ffffff] text-center">
                        <span>{item.tag}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
                    <div className='relative w-screen h-screen bg-[green]'>
            
      </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Imformation;