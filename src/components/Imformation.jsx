import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, } from 'framer-motion';
import { useScrollProgress } from '../contexts/ScrollProgressContext';

import me from '../images/imformation/me.jpg'

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
  // 첫번째 애니메이션 효과
  // useScrollProgress 훅을 사용하여 Context에서 스크롤 진행도 상태를 가져옵니다.
  const { cardScrollProgress } = useScrollProgress();
  const totalBoxes = 200;
  const boxes = Array.from({ length: totalBoxes }, (_, index) => index);

  const [revealedBoxCount, setRevealedBoxCount] = useState(0); // 현재 투명해진 박스의 개수

  // 3번째 카드의 스크롤 진행도를 추적합니다.
  useEffect(() => {
    // 3번째 카드의 스크롤 진행도를 가져옵니다.
    const thirdCardProgress = cardScrollProgress[3];

    const animationStartThreshold = 0.001; // 3번째 카드 애니메이션 시작 임계값 (조절)
    const animationEndThreshold = 0.55;   // 3번째 카드 애니메이션 끝 임계값 (조절)

    console.log(`[Imformation] thirdCardProgress: ${thirdCardProgress}`);
    console.log(`[Imformation] revealedBoxCount (before update): ${revealedBoxCount}`);
    console.log(`[Imformation] Is before threshold? ${thirdCardProgress === undefined || thirdCardProgress < animationStartThreshold}`);

    if (thirdCardProgress === undefined || thirdCardProgress < animationStartThreshold) {
      setRevealedBoxCount(0); // 3번 카드 애니메이션 시작 전에는 모두 투명 (0개 나타남)
      return; // 더 이상 진행하지 않고 함수를 종료합니다.
    }

    // 스크롤 진행도를 0에서 100까지의 값으로 매핑
    const mappedProgress = Math.min(
      1,
      Math.max(
        0,
        (thirdCardProgress - animationStartThreshold) / (animationEndThreshold - animationStartThreshold)
      )
    );

    // 박스 전체 개수에 대한 진행도 계산
    const targetRevealedCount = Math.floor(mappedProgress * totalBoxes);

    setRevealedBoxCount(prevCount => {
      const newCountByTens = Math.floor(targetRevealedCount / 10) * 10;

      // 스크롤 방향에 따라 10개씩 증가/감소하도록 처리합니다.
      if (newCountByTens > prevCount) {
        // 스크롤을 내려서 박스가 더 나타나야 할 경우
        return Math.min(newCountByTens, totalBoxes);
      } else if (newCountByTens < prevCount) {
        // 스크롤을 올려서 박스가 사라져야 할 경우 (10개 단위로 사라지게)
        return Math.max(0, Math.ceil(targetRevealedCount / 10) * 10);
      }
      return prevCount; // 변화가 없으면 현재 값 유지
    });

  }, [cardScrollProgress, totalBoxes]);

  // 두번째 애니메이션 효과
  const AniRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: AniRef,
    offset: ['start end', 'end end'],
  })

  const iconOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])
  return (
    <section className="relative block">

      {/* 애니메이션 */}
      <div ref={AniRef} className="relative flex w-full items-center flex-wrap pointer-events-none text-[16px]">
        {/* 1번 애니메이션 */}
        <div className="fixed flex top-0 left-0 w-full h-screen flex-wrap">
          {boxes.map((boxIndex) => (
            <motion.div
              key={boxIndex}
              className="w-[5vw] h-[10vh] bg-[#000000]"
              initial={{ opacity: 0 }}
              // fixedRevealOrder의 인덱스가 revealedBoxCount보다 작으면 투명하게 만듭니다.
              // 즉, fixedRevealOrder 배열에서 revealedBoxCount 개수만큼의 박스가 투명해집니다.
              animate={{ opacity: fixedRevealOrder.indexOf(boxIndex) < revealedBoxCount ? 1 : 0 }}
            />
          ))}
        </div>

        {/* 2번 애니메이션 */}
        <div className='relative block w-screen h-[400vh]'>
          <div className='fixed flex flex-wrap top-0 left-0 w-screen h-screen items-center justify-center'>
            <div className='absolute flex w-screen h-screen items-center justify-center'>
              {/* 이미지 박스 */}
              <div className='absolute w-screen h-[150vh]'
                style={{ opacity: 0 }}
              >
                <img src={me} alt="me" className='w-screen h-screen object-cover' />
              </div>
              {/* 로고 박스 */}
              <div className='absolute flex w-screen h-screen items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.113 29.355" className="w-[18vw] h-[18vw]">
                  <text
                    x="0"
                    y="24"
                    fontFamily="aeonik, sans-serif"
                    fontSize="32"
                    fontWeight="bold"
                    fill="#ffffff"
                  >
                    DEV
                  </text>
                </svg>
              </div>
            </div>

          </div>
          {/* 아이콘들 영역 */}
          <div className='relative py-[10vh] px-[5.2vw] w-screen h-screen flex flex-wrap items-center justify-center'
            style={{ opacity: iconOpacity }}
          >
            {/* 각 아이콘 */}
            <div className='relative flex w-[33%] h-[20%] items-center justify-center'
              style={{ opacity: 1 }}
            >
              {/* 모니터 */}
              <svg className='block' width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <path d="M8 21h8M12 17v4" />
              </svg>
              {/* 키보드 */}
              <svg className='block' width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
                <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M6 16h12" />
              </svg>
              {/* 코드 태그 */}
              <svg className='block' width="64" height="64" viewBox="0 0 64 64" fill="none"
                xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="16,16 8,32 16,48" />
                <line x1="36" y1="16" x2="28" y2="48" />
                <polyline points="48,16 56,32 48,48" />
              </svg>
              {/* 소스트리 */}
              <svg className='block' width="48" height="48" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="7" cy="4" r="2" />
                <circle cx="7" cy="20" r="2" />
                <circle cx="17" cy="9" r="2" />
                <path d="M7 6v12" />
                <path d="M17 11c0 5 -10 2 -10 7" />
              </svg>
              {/* 텍스트 */}
              <div className='flex text-center items-center justify-center'>
                <span>EFFORT</span>
              </div>
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