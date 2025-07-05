import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const Section01 = () => {
  const containerRef = useRef(null);

  // 모바일 여부를 확인하는 state 추가
  const [isMobile, setIsMobile] = useState(false);

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
          
        </div>
      </div>
    </section>
  );
};

export default Section01;
