import { useState, useEffect } from 'react';

function useAssetPreloader(assetUrls) {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const assets = Array.isArray(assetUrls) ? assetUrls : [assetUrls];
        const assetCount = assets.length;
        if (assetCount === 0) {
            setIsLoaded(true);
            setProgress(100);
            return;
        }

        let loadedCount = 0;

        const updateProgress = () => {
            loadedCount++;
            const currentProgress = (loadedCount / assetCount) * 100;
            setProgress(currentProgress);

            if (loadedCount === assetCount) {
                // 모든 에셋 로드가 완료되면 isLoaded를 true로 설정
                // 약간의 딜레이를 주어 100%가 잠시 보이도록 함
                setTimeout(() => {
                    setIsLoaded(true);
                }, 500);
            }
        };

        assets.forEach((url) => {
            const img = new Image();
            img.onload = updateProgress;
            // 에러 발생 시에도 카운트를 올려 로딩이 멈추지 않도록 처리
            img.onerror = updateProgress;
            img.src = url;
        });

    }, [assetUrls]);

    return { progress, isLoaded };
}

export default useAssetPreloader;