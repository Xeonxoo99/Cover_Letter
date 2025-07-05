import React from 'react';
import kim from '../images/header/KIM_YEON_SOO.svg';

function Header() {
  return (
    <header
      className='fixed left-1/2 transform -translate-x-1/2 w-[93.75vw] h-[3.125vw] flex items-center justify-between font-aeonik'
      style={{ zIndex: 1000, mixBlendMode: 'difference' }}
    >
      {/* 좌측 SVG 이름 */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.113 29.355" className="w-[16vw] h-[20vw]">
        <text
          x="0"
          y="24"
          fontFamily="aeonik, sans-serif"
          fontSize="32"
          fontWeight="bold"
          fill="#fff"
        >
          Kim Yeon Soo
        </text>
      </svg>

      {/* 우측 내비게이션 */}
      <nav className='flex gap-10 text-sm'>
        {['HOME', 'Portfolio', 'Information'].map((item, index) => (
          <div key={index} className='relative cursor-pointer group'>
            <div className='absolute inset-0 w-[calc(100%+30px)] h-[calc(100%+14px)] bg-[#b8b8b8] rounded-[50px] scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out z-0'></div>
            <span className='relative z-10 text-[#b8b8b8]'>{item}</span>
          </div>
        ))}
      </nav>
    </header>
  );
}

export default Header;