import React from 'react';
import kim from '../images/header/KIM_YEON_SOO.svg';

function Header({ activeSection }) {
  const navItems = [
    { name: 'HOME', id: 'home' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Information', id: 'imformation' }, // 표시 텍스트는 Information, id는 imformation
  ];
  const handleScroll = (id) => {



    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className='fixed left-1/2 transform -translate-x-1/2 w-[93.75vw] h-[4.125vw] flex items-center justify-between font-aeonik
      max-lg:h-[7.25vw] max-sm:
      '
      style={{ zIndex: 9999999, mixBlendMode: 'difference' }}
    >
      {/* 좌측 SVG 이름 */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.113 29.355" className="w-[300px] h-[50px]">
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
        {navItems.map((item) => {
          // 현재 아이템이 활성화된 섹션인지 확인
          const isActive = activeSection === item.id;
          return (
            <div
              key={item.name}
              className='relative cursor-pointer group'
              onClick={() => handleScroll(item.id)}
            >
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100%+30px)] h-[calc(100%+14px)] bg-[#b8b8b8] rounded-[50px] 
                transition-transform duration-300 ease-in-out z-0 ${isActive ? 'scale-100' : 'scale-0'} group-hover:scale-100`}
              ></div>
              <span className='relative z-10 text-[#b8b8b8] mix-blend-difference'>{item.name}</span>
            </div>
          );
        })}
      </nav>
    </header>
  );
}

export default Header;