import React, { Suspense, useEffect, useRef } from 'react';
import { useGLTF, OrbitControls, Stage, useAnimations } from '@react-three/drei';

function Model({ playAnimation, ...props }) {
    const group = useRef();
    // 새 GLB 파일 경로로 수정
    const { scene, animations } = useGLTF('/uploads_files_5725418_ComputerTerminal_wPBR.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        // 실제 애니메이션 이름으로 변경
        const animationName = "Take 001"; // 예시: 콘솔에서 확인한 이름으로 변경
console.log(actions)
        if (playAnimation && actions[animationName]) {
            actions[animationName].reset().play();
        } else if (actions[animationName]) {
            actions[animationName].stop();
        }
    }, [actions, playAnimation]);

    return <primitive ref={group} object={scene} {...props} />;
}

export default function MacbookScene({ playAnimation }) {
    const rotationY = (Math.PI / 180) * 230;

    return (
        <>
            <Suspense fallback={null}>
                <Stage environment="city" intensity={0.1} adjustCamera={1.3}>
                    <Model 
                        scale={0.1} 
                        playAnimation={playAnimation} 
                        // ✅ rotation 속성 추가 [x, y, z]
                        rotation={[0, rotationY, 0]} 
                    />
                </Stage>
            </Suspense>
            <OrbitControls 
                enableZoom={false} 
                autoRotate={false} 
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    );
}