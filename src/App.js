import React, { useState, useEffect } from 'react'; 
import Header from './components/header'
import Intro from './components/Intro'
import Introduction from './components/Introduction'
import Portfolio from './components/Portfolio'
import Imformation from './components/Imformation'
import { ScrollProgressProvider } from './contexts/ScrollProgressContext';

function App() {
  // 현재 활성화된 섹션을 추적하는 상태. 기본값은 'home'.
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // IntersectionObserver 콜백 함수: entry가 화면에 보이면 activeSection을 업데이트
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // IntersectionObserver 생성
    // rootMargin: 화면 상단에서 -40%, 하단에서 -40% 떨어진 영역을 기준으로 intersection을 감지합니다.
    // 이렇게 하면 섹션이 화면 중앙에 왔을 때 활성화됩니다.
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });

    // 관찰할 모든 섹션 요소를 선택
    const sections = document.querySelectorAll('main > div[id]');
    sections.forEach((section) => observer.observe(section));

    // 컴포넌트 언마운트 시 observer 정리
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []); 
  return (
    <ScrollProgressProvider>
      <Header />
      <main>
        <div id="home">
        <Intro />
        <Introduction />
        </div>
        <div id="portfolio">
          <Portfolio />
        </div>
        <div id="imformation">
          <Imformation />
        </div>
      </main>
    </ScrollProgressProvider>
  );
}

export default App;
