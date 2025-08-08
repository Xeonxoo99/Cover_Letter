import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion'; 
import LoadingGrid from './components/LoadingGrid';
import Header from './components/header'
import Introduction from './components/Introduction'
import Portfolio from './components/Portfolio'
import Imformation from './components/Imformation'
import Footer from './components/Footer';
import { ScrollProgressProvider } from './contexts/ScrollProgressContext';

// App 컴포넌트가 isLoaded와 progress를 props로 받도록 수정합니다.
function App({ isLoaded, progress }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // useAssetPreloader 호출 부분이 완전히 삭제되었는지 확인합니다.

  const footerTriggerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerTriggerRef,
    offset: ["start end", "end end"]
  });
  const footerY = useTransform(scrollYProgress, [0.99, 1], ["100%", "0%"]);

  React.useEffect(() => {
    if (!isAnimationFinished) return;
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };
    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    });
    const sections = document.querySelectorAll('main > div[id]');
    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, [isAnimationFinished]);

  return (
    <ScrollProgressProvider>
      <>
        <Header activeSection={activeSection} />
        <main>
          <div id="home">
            <Introduction />
          </div>
          <div id="portfolio">
            <Portfolio />
          </div>
          <div id="imformation">
            <Imformation />
          </div>
          <div ref={footerTriggerRef} className="h-[30vh]" />
        </main>
        <Footer y={footerY} />
      </>

      {!isAnimationFinished && (
        <LoadingGrid
          isLoaded={isLoaded}
          progress={progress}
          onAnimationComplete={() => setIsAnimationFinished(true)}
        />
      )}
    </ScrollProgressProvider>
  );
}

export default App;