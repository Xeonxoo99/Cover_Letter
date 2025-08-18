// src/contexts/useAssetPreloader.js
import { useState, useEffect } from 'react';

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

export const assetsToPreload = [
    html5, css3, jquery, js, react, tailwindcss, gsap, nextjs, threejs, riot, riotLogo, riotCenter, subwayLogo, subwayCenter, demonLogo, demonCenter,'/video/main_video.mp4',
    '/video/introVideo.mp4'
];

function useAssetPreloader(assetUrls) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // assetUrls가 배열이 아니거나 비어있으면 즉시 종료
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
                }, 250); // 딜레이를 약간 줄여도 좋습니다.
            }
        };

        assetUrls.forEach((url) => {
            const fileExtension = url.split('.').pop().toLowerCase();

            // 파일 확장자에 따라 다른 태그로 로드합니다.
            if (['mp4', 'webm'].includes(fileExtension)) {
                // 비디오 태그 생성
                const video = document.createElement('video');
                video.oncanplaythrough = updateProgress; // 'canplaythrough' 이벤트 사용
                video.onerror = updateProgress;
                video.src = url;
            } else {
                // 이미지 태그 생성
                const img = new Image();
                img.onload = updateProgress;
                img.onerror = updateProgress;
                img.src = url;
            }
        });

    }, [assetUrls]);

    return { progress, isLoaded };
}

export default useAssetPreloader;