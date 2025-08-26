import { useState, useEffect, useRef  } from 'react';

import html5 from '../images/introduction/HTML5.svg';
import css3 from '../images/introduction/CSS3.svg';
import jquery from '../images/introduction/jQuery.svg';
import js from '../images/introduction/JS.svg';
import react from '../images/introduction/React.svg';
import tailwindcss from '../images/introduction/Tailwind.svg';
import gsap from '../images/introduction/GSAP.svg';
import nextjs from '../images/introduction/nextjs.svg';
import threejs from '../images/introduction/Threejs.svg';
import riot from '../images/portfolio/riot.avif';
import riotLogo from '../images/portfolio/riot.svg';
import riotCenter from '../images/portfolio/riotcenter.gif';
import subwayLogo from '../images/portfolio/subway_logo.svg';
import subwayCenter from '../images/portfolio/searchBetter_menu.png';
import demonLogo from '../images/portfolio/demon_logo.png';
import demonCenter from '../images/portfolio/demon_center.png';

import loginVideo from '../images/video/login.mp4';
import miniGameBrokenVideo from '../images/video/mini_game_broken.mp4';
import miniGameDinoVideo from '../images/video/mini_game_dino.mp4';
import miniGameLoginVideo from '../images/video/mini_game_login.mp4';
import miniGameMypageVideo from '../images/video/mini_game_mypage.mp4';
import miniGameTypingVideo from '../images/video/mini_game_typing.mp4';
import miniProjectVideo from '../images/video/mini_project.mp4';

export const assetsToPreload = [
    html5, css3, jquery, js, react, tailwindcss, gsap, nextjs, threejs, riot, riotLogo, riotCenter, subwayLogo, subwayCenter, demonLogo, demonCenter,'https://alvm1224.dothome.co.kr/kys/main_video.mp4', 'https://alvm1224.dothome.co.kr/kys/introvideo.mp4',
    'https://alvm1224.dothome.co.kr/kys/main_video.mp4','https://alvm1224.dothome.co.kr/kys/login.mp4','https://alvm1224.dothome.co.kr/kys/mini_game_broken.mp4',
    'https://alvm1224.dothome.co.kr/kys/mini_game_dino.mp4','https://alvm1224.dothome.co.kr/kys/mini_game_login.mp4', 'https://alvm1224.dothome.co.kr/kys/mini_game_mypage.mp4',
    'https://alvm1224.dothome.co.kr/kys/mini_game_typing.mp4', 'https://alvm1224.dothome.co.kr/kys/mini_project.mp4'
];

function useAssetPreloader(assetUrls) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const elementsRef = useRef([]); // 생성된 요소를 추적하기 위한 ref

    useEffect(() => {
        if (!Array.isArray(assetUrls) || assetUrls.length === 0) {
            setProgress(100);
            setIsLoaded(true);
            return;
        }

        const assetCount = assetUrls.length;
        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            const currentProgress = (loadedCount / assetCount) * 100;
            setProgress(currentProgress);

            if (loadedCount === assetCount) {
                setTimeout(() => {
                    setIsLoaded(true);
                }, 250);
            }
        };

        const handleError = (url) => {
            console.error(`에셋 로딩 실패: ${url}`); // 에러 로그 출력 (변경 O)
            updateProgress(); // 로딩이 멈추지 않도록 처리
        };

        assetUrls.forEach((url) => {
            const fileExtension = typeof url === 'string' ? url.split('.').pop().toLowerCase() : '';

            if (['mp4', 'webm'].includes(fileExtension)) {
                const video = document.createElement('video');
                video.onloadeddata = updateProgress; // oncanplaythrough -> onloadeddata (변경 O)
                video.onerror = () => handleError(url);
                video.src = url;
                elementsRef.current.push(video); // ref에 추가 (변경 O)
            } else {
                const img = new Image();
                img.onload = updateProgress;
                img.onerror = () => handleError(url);
                img.src = url;
                elementsRef.current.push(img); // ref에 추가 (변경 O)
            }
        });

        // Cleanup 함수 (변경 O)
        return () => {
            elementsRef.current.forEach(element => {
                // 이벤트 핸들러 및 src 제거하여 메모리 정리
                element.onload = null;
                element.onerror = null;
                element.onloadeddata = null;
                element.src = '';
            });
            elementsRef.current = [];
        };
    }, [assetUrls]); // 의존성 배열은 그대로 유지

    return { progress, isLoaded };
}

export default useAssetPreloader;