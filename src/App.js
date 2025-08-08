import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion'; 
import Loading from './components/Loading';
import Header from './components/header'
import Introduction from './components/Introduction'
import Portfolio from './components/Portfolio'
import Imformation from './components/Imformation'
import Footer from './components/Footer';
import { ScrollProgressProvider } from './contexts/ScrollProgressContext';
import useAssetPreloader from './contexts/useAssetPreloader';

import html5 from './images/introduction/HTML5.svg';
import css3 from './images/introduction/CSS3.svg';
import jquery from './images/introduction/jQuery.svg';
import js from './images/introduction/JS.svg';
import react from './images/introduction/React.svg';
import tailwindcss from './images/introduction/Tailwind.svg';
import gsap from './images/introduction/GSAP.svg';
import nextjs from './images/introduction/nextjs.svg';
import threejs from './images/introduction/Threejs.svg';
import login from './images/imformation/login.mp4';
import mini_game_login from './images/imformation/mini_game_login.mp4'
import mini_game_broken from './images/imformation/mini_game_broken.mp4'
import mini_game_dino from './images/imformation/mini_game_dino.mp4'
import mini_game_typing from './images/imformation/mini_game_typing.mp4'
import mini_game_mypage from './images/imformation/mini_game_mypage.mp4'
import mini_project from './images/imformation/mini_project.mp4'
import riot from './images/portfolio/riot.avif';
import riotLogo from './images/portfolio/riot.svg';
import riotCenter from './images/portfolio/riotcenter.gif';
import subway from './images/portfolio/main_video.mp4';
import subwayLogo from './images/portfolio/subway_logo.svg';
import subwayCenter from './images/portfolio/searchBetter_menu.png';
import demon from './images/portfolio/introVideo.mp4';
import demonLogo from './images/portfolio/demon_logo.png';
import demonCenter from './images/portfolio/demon_center.png';


const assetsToPreload = [
  html5, css3, jquery, js, react, tailwindcss, gsap, nextjs, threejs,login,mini_game_login,mini_game_broken,mini_game_dino,mini_game_typing,mini_game_mypage,
  mini_project,riot,riotLogo,riotCenter,subway,subwayLogo,subwayCenter,demon,demonLogo,demonCenter
];

function App() {
  // 현재 활성화된 섹션을 추적하는 상태. 기본값은 'home'.
  const [activeSection, setActiveSection] = useState('home');

  const { progress, isLoaded } = useAssetPreloader(assetsToPreload);

const footerTriggerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerTriggerRef,
    offset: ["start end", "end end"]
  });
    const footerY = useTransform(scrollYProgress, [0.99, 1], ["100%", "0%"]);

React.useEffect(() => {
    // 5. 로딩이 완료된 후에만 스크롤 옵저버를 실행
    if (!isLoaded) return;

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
  }, [isLoaded]); // isLoaded가 true로 바뀌면 실행

  

  return (
    <ScrollProgressProvider>
      {!isLoaded ? (
        <Loading progress={progress} />
      ) : (
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
      )}
    </ScrollProgressProvider>
  );
}

export default App;
