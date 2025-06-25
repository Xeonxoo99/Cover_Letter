import React, { createContext, useState, useContext, useEffect } from 'react';

// 스크롤 진행도와 현재 활성화된 카드 ID를 위한 Context를 생성합니다.
export const ScrollProgressContext = createContext(null);

// 스크롤 진행도 Provider 컴포넌트입니다.
export const ScrollProgressProvider = ({ children }) => {
  const [cardScrollProgress, setCardScrollProgress] = useState({});

  // 특정 카드의 스크롤 진행도를 업데이트하는 함수입니다.
  const updateScrollProgress = (cardId, progress) => {
    setCardScrollProgress(prev => ({
      ...prev,
      [cardId]: progress
    }));
  };

  // 현재 활성화(가장 크게 보이는)된 카드 ID를 추적합니다.
  const [activeCardId, setActiveCardId] = useState(null);

  // activeCardId를 업데이트하는 로직 (예: 특정 임계값을 넘으면 활성화)
  // 이 부분은 Portfolio 컴포넌트에서 각 카드에 대한 스크롤 진행도를 보고 직접 설정할 수도 있습니다.
  // 여기서는 간단히 3번 카드의 스크롤 진행도를 추적하는 예시를 보여드립니다.
  useEffect(() => {
    const thirdCardProgress = cardScrollProgress[3]; // 3번 카드의 스크롤 진행도
    if (thirdCardProgress !== undefined) {
      // 3번 카드의 애니메이션이 시작될 시점 (예: scrollYProgress가 0보다 커질 때)을 감지합니다.
      // 실제 시작 시점은 PortfolioCard 컴포넌트의 useTransform 범위에 따라 조절해야 합니다.
      if (thirdCardProgress > 0 && thirdCardProgress < 1) { // 0 초과, 1 미만일 때 (애니메이션 중일 때)
        setActiveCardId(3);
      } else if (thirdCardProgress === 0) { // 애니메이션 시작 전
        setActiveCardId(null);
      } else if (thirdCardProgress === 1) { // 애니메이션 끝
        setActiveCardId(null); // 또는 계속 3으로 유지하여 애니메이션이 끝났음을 알릴 수도 있습니다.
      }
    }
  }, [cardScrollProgress]);


  return (
    <ScrollProgressContext.Provider value={{ cardScrollProgress, updateScrollProgress, activeCardId }}>
      {children}
    </ScrollProgressContext.Provider>
  );
};

// Context를 더 쉽게 사용할 수 있도록 커스텀 훅을 만듭니다.
export const useScrollProgress = () => {
  const context = useContext(ScrollProgressContext);
  if (context === undefined) {
    throw new Error('useScrollProgress must be used within a ScrollProgressProvider');
  }
  return context;
};