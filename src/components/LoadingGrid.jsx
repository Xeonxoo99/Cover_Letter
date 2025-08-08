import React, { useState, useEffect } from 'react';

const LoadingGrid = ({ onAnimationComplete, isLoaded, progress }) => {
  // --- 5초 타이머와 가짜 진행률을 위한 상태들을 다시 추가합니다. ---
  const [isReadyToVanish, setIsReadyToVanish] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false); // 실제 로딩 완료 여부
  const [minTimeElapsed, setMinTimeElapsed] = useState(false); // 5초 경과 여부
  const [displayProgress, setDisplayProgress] = useState(0); // 화면에 표시될 가짜 진행률

  // 기존 상태들
  const [visibleIndices, setVisibleIndices] = useState(() => Array.from({ length: 100 }, (_, i) => i));
  const [showEven, setShowEven] = useState(true);

  // --- 5초 타이머와 가짜 진행률 관련 로직을 다시 추가합니다. ---

  // 1. 컴포넌트 마운트 시 5초 타이머를 설정하는 로직
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // 2. 5초 동안 가짜 진행률을 0%에서 100%까지 애니메이션하는 로직
  useEffect(() => {
    let startTime = Date.now();
    const totalDuration = 5000;
    const animationInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const currentProgress = Math.min((elapsedTime / totalDuration) * 100, 100);
      setDisplayProgress(currentProgress);
      if (elapsedTime >= totalDuration) {
        clearInterval(animationInterval);
      }
    }, 16);
    return () => clearInterval(animationInterval);
  }, []);

  // 3. 실제 파일 로딩이 완료되었는지 체크하는 로직
  useEffect(() => {
    // isLoaded prop (이전 progress >= 100)이 true가 되면 assetsLoaded를 true로 설정
    if (isLoaded) {
      setAssetsLoaded(true);
    }
  }, [isLoaded]);

  // 4. 두 조건(실제 로딩 완료 + 5초 경과)을 모두 만족하면 소멸 애니메이션을 시작
  useEffect(() => {
    if (assetsLoaded && minTimeElapsed) {
      setIsReadyToVanish(true);
    }
  }, [assetsLoaded, minTimeElapsed]);


  // 'Loading...' 텍스트 점멸 효과
  useEffect(() => {
    // isReadyToVanish가 true가 되면(사라지기 시작하면) 점멸을 멈춥니다.
    if (isReadyToVanish) return;
    const blinkInterval = setInterval(() => {
      setShowEven(prev => !prev);
    }, 600);
    return () => clearInterval(blinkInterval);
  }, [isReadyToVanish]);

  // 소멸 애니메이션 로직
  useEffect(() => {
    // isReadyToVanish가 true가 될 때까지 실행되지 않습니다.
    if (!isReadyToVanish) return;
    const randomVanishOrder = Array.from({ length: 100 }, (_, i) => i)
                                  .sort(() => 0.5 - Math.random());
    
    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      const indicesToRemove = randomVanishOrder.slice(currentIndex, currentIndex + 10);
      if (indicesToRemove.length === 0) {
        clearInterval(animationInterval);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
        return;
      }
      setVisibleIndices(currentVisible =>
        currentVisible.filter(index => !indicesToRemove.includes(index))
      );
      currentIndex += 10;
    }, 80);

    return () => clearInterval(animationInterval);
  }, [isReadyToVanish, onAnimationComplete]);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-transparent grid grid-cols-10"
      style={{ zIndex: 99999999 }}
    >
      {Array.from({ length: 100 }).map((_, i) => {
        const isEvenColumn = (i % 10) % 2 === 0;
        const isVisible = visibleIndices.includes(i);
        return (
          <div
            key={i}
            className={`flex items-center justify-center text-white font-mono text-xs md:text-sm
              ${isVisible ? 'visible bg-black' : 'invisible bg-transparent'}`
            }
          >
            {/* 사라지기 시작하면(isReadyToVanish=true) 내부 텍스트를 표시하지 않습니다. */}
            {!isReadyToVanish && (
              isEvenColumn ? (
                <span className="opacity-100">
                  {/* 가짜 진행률 displayProgress를 표시합니다. */}
                  {`${Math.round(displayProgress)}%`}
                </span>
              ) : (
                <span
                  className={`transition-opacity duration-300 ${
                    !showEven ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Loading...
                </span>
              )
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(LoadingGrid);