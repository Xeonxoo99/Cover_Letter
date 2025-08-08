import React from 'react';
import { motion } from 'framer-motion';
import github from '../images/imformation/github.svg';

const Footer = ({ y }) => {
  return (
    <motion.div 
      className="fixed bottom-0 left-0 w-full h-[20vh] z-[10000] bg-white/20 backdrop-blur-lg flex items-center justify-between px-10 text-black"
      style={{ y }}
    >
      {/* 왼쪽: 연락처 정보 */}
      <div className='flex items-center gap-x-6 font-semibold'>
        <a href='https://github.com/Xeonxoo99' target="_blank" rel="noopener noreferrer" className="inline-blcok w-[60px] h-[60px] rounded-full bg-black hover:bg-[#b8b8b8] transition-opacity">
          <img src={github} alt="github" className="w-[60px] h-[60px] object-cover pb-[1.4px]" />
        </a>
        
        {/* 연락처 정보 */}
        <div className="flex flex-col text-sm">
          <span>wezel99@naver.com</span>
          <span>010-3750-5001</span>
        </div>
        
        {/* 구분선 */}
        <div className="w-px h-8 bg-black/30"></div>
        
        <span className="text-3xl">ISTP</span>
      </div>
      
      <div className='text-sm font-medium flex'>
        <p>Website by</p><p className='text-[1.3vw] leading-3'>Yeon Soo Kim</p>
      </div>
    </motion.div>
  );
};

export default Footer;