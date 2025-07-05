import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section01 = () => {
  const containerRef = useRef<HTMLElement>(null);

  // 모바일 여부를 확인하는 state 추가
  const [isMobile, setIsMobile] = React.useState(false);

  // 컴포넌트 마운트 시 모바일 체크
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // 768px 이하를 모바일로 간주
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // 모바일일 때는 기본값 사용
  const maskSize = useTransform(
    scrollYProgress,
    [0, 0.5],
    isMobile ? ["95%", "95%"] : ["100000px", "1000px"]
  );


  const opacity = useTransform(
    scrollYProgress,
    [0.5, 0.55],
    isMobile ? [1, 1] : [0, 1]
  );

  const none = useTransform(
    scrollYProgress,
    [0.03, 0.04],
    isMobile ? ["block", "block"] : ["none", "block"]
  );

  return (
    <section
      ref={containerRef}
      className="relative h-100vh md:h-[300vh] overflow-clip bg-black"
    >
      <div className="sticky top-0 w-full h-screen">
        <div className="flex flex-col justify-end w-full h-full">
    
          <motion.div
            className="flex items-center justify-center -mt-10 md:mt-0 relative"
            style={{
              maskImage: 'url("/images/logo_mask.svg")',
              maskPosition: "center",
              maskRepeat: "no-repeat",
              WebkitMaskImage: 'url("/images/logo_mask.svg")',
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              maskSize,
              WebkitMaskSize: maskSize,
              aspectRatio: "1852 / 659", 
              height: "auto",
            }}
          >
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source
                src="https://du5nhh695jaqx.cloudfront.net/brand/main/visual/20230807/KGC_KV_W_0807.mp4"
                type="video/mp4"
              />
            </video>
          </motion.div>
          {/* 마스크와 무관하게 항상 보이는 로고 이미지 */}
          <motion.div
            className="absolute -top-20 w-[1000px] h-full left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ aspectRatio: "1852 / 659", opacity }}
          >
            <img
              src="/images/logo.svg"
              alt="Logo"
              className="w-full h-full object-contain"
              draggable={false}
              style={{ userSelect: "none" }}
            />
            <p className="text-[--gc-400] mb-[34px] text-center relative -top-[30%]">
              울림엔터테인먼트는 다양한 분야에서 자유롭고 창의적인 변화를
              <br className="hidden lg:block" />
              핵심가치로 생각하며, 변화의 물결을 타고 새로운 경험과 감동을
              전달하는 &lsquo;RIDE THE WAVE&rsquo;를 실천합니다.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Section01;
