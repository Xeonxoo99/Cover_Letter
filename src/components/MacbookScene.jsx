// src/components/MacbookScene.js

import React, { Suspense, useEffect, useRef } from 'react';
import { useGLTF, OrbitControls, Stage, useAnimations } from '@react-three/drei';

function Model({ playAnimation, ...props }) {
    const group = useRef();
    const { scene, animations } = useGLTF('/macbook_pro_13_inch_2020.glb');
    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        if (playAnimation && actions["Animation"]) {
            actions["Animation"].reset().play();
        } else if (actions["Animation"]) {
            actions["Animation"].stop();
        }
    }, [actions, playAnimation]);

    return <primitive ref={group} object={scene} {...props} />;
}

export default function MacbookScene({ playAnimation }) {
    return (
        <>
            <Suspense fallback={null}>
                <Stage environment="city" intensity={0.1} adjustCamera={1.2}>
                    <Model scale={0.1} playAnimation={playAnimation} />
                </Stage>
            </Suspense>
            <OrbitControls 
                enableZoom={false} 
                autoRotate={false} 
                enablePan={false} // 패닝 비활성화로 더 깔끔한 인터랙션
                minPolarAngle={Math.PI / 4} // 아래에서 너무 많이 보지 않도록 각도 제한
                maxPolarAngle={Math.PI / 2} // 위에서 너무 많이 보지 않도록 각도 제한
            />
        </>
    );
}