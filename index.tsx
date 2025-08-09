import Image from "next/image";
import React from "react";
import { motion, useInView } from "framer-motion";

const Section01 = () => {
  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const isInView1 = useInView(ref1, {
    once: true,
    amount: 0.4,
  });
  const isInView2 = useInView(ref2, {
    once: true,
    amount: 0.4,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="w-full text-black relative py-36 px-10 lg:px-0">
      <div className="flex flex-col">
        <motion.h3
          variants={container}
          initial="hidden"
          animate="show"
          className="en800 text-6xl lg:text-[160px] text-black mb-6 lg:mb-12 -ml-4 lg:ml-0 lg:px-10 relative z-20"
        >
          <motion.span style={{ display: "inline-block" }} variants={item}>
            W
          </motion.span>
          <motion.span style={{ display: "inline-block" }} variants={item}>
            h
          </motion.span>
          <motion.span style={{ display: "inline-block" }} variants={item}>
            o
          </motion.span>
          <br className="hidden md:block" />
          <motion.span style={{ display: "inline-block" }} variants={item}>
            W
          </motion.span>
          <motion.span style={{ display: "inline-block" }} variants={item}>
            e
          </motion.span>{" "}
          <motion.span style={{ display: "inline-block" }} variants={item}>
            A
          </motion.span>
          <motion.span style={{ display: "inline-block" }} variants={item}>
            r
          </motion.span>
          <motion.span style={{ display: "inline-block" }} variants={item}>
            e
          </motion.span>
        </motion.h3>
        <div className="flex justify-end -mt-12 lg:-mt-28 z-10">
          <div>
            <Image
              src="/images/sub/about/about_main01.jpg"
              width={1320}
              height={1072}
              alt="메인이미지1"
              className="w-full h-[400px] md:h-auto object-cover"
            />
            <div className="mt-4 md:mt-14">
              <p className="font-medium text-3xl lg:text-6xl 2xl:text-[80px] !leading-tight mb-4 md:mb-8">
                미네랄워터 기반의
                <br className="hidden md:block" />
                차별화된 더마 코스메틱
              </p>
              <p className="font-light lg:text-2xl !leading-snug">
                나예코스메틱에서 개발한 특허 원료와 더마 제형개발을 통해
                <br className="hidden md:block" />
                피부 고민의 근본적인 해결책을 찾아 건강한 피부로 되돌리는
                <br className="hidden md:block" />
                더마 코스메틱 제품을 생산하고 있습니다.
              </p>
            </div>
          </div>
        </div>
        <div className=" mt-28 px-0 md:px-10">
          <div ref={ref1} className="flex flex-col justify-end items-end">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={
                isInView1
                  ? { clipPath: "inset(0 0 0% 0)" }
                  : { clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            >
              <Image
                src="/images/sub/about/about_main02.png"
                className="w-[594px] "
                width={594}
                height={725}
                alt="메인이미지2"
              />
            </motion.div>
          </div>
          <div ref={ref2} className="-mt-20">
            <motion.div
              initial={{ clipPath: "inset(0 0 100% 0)" }}
              animate={
                isInView2
                  ? { clipPath: "inset(0 0 0% 0)" }
                  : { clipPath: "inset(0 0 100% 0)" }
              }
              transition={{ duration: 0.8, ease: [0.17, 0.55, 0.55, 1] }}
            >
              <Image
                src="/images/sub/about/about_main03.png"
                className="w-[530px]"
                width={530}
                height={432}
                alt="메인이미지3"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section01;