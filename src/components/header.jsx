import React from 'react'
import kim from '../images/header/KIM_YEON_SOO.svg'
function header() {

  {/*
    1.각 네비게이션 버튼 hover 시 아래 div 나타남
      <div className='absolute inset-0 w-[calc(100%+30px)] h-[calc(100%+14px)] bg-[#b8b8b8] rounded-[50px] scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out z-0'></div>

    2. 현재 위치에 따라 각 버튼 배경은 #000000으로 변경

    3. 각 버튼 클릭 시 컴포넌트 이동
     */}

  return (
    <header className='fixed left-1/2 transform -translate-x-1/2 w-[93vw] h-16 flex items-center justify-between font-aeonik'
      style={{ zIndex: 1000,mixBlendMode:'difference' }}
    >

      {/* 좌측 상단 내 이름 */}
      {/* html */}
      {/* <a href="/" className='text-3xl font-bold'>KIM YEON SOO</a> */}

      {/* svg코드 */}

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 306.113 29.355" >
        <text
          x="0"
          y="18"
          fontFamily="aeonik, sans-serif"
          fontSize="8"
          fontWeight="bold"
          fill="#000"
        >
          KIM YEON SOO
        </text>
      </svg>

      {/* svg 파일 */}
      {/* <img src={kim} alt="kim" className='' /> */}

      {/* 우측 네비게이션 */}
      <nav className='flex gap-10'>
        <div className='relative cursor-pointer'>
          <div className='absolute inset-0 w-[calc(100%+30px)] h-[calc(100%+14px)] bg-[#b8b8b8] rounded-[50px] scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out z-0'></div>
          <span className=''>HOME</span>
        </div>
        <div>
          <div className='absolute inset-0 w-[calc(100%+30px)] h-[calc(100%+14px)] bg-[#b8b8b8] rounded-[50px] scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out z-0'></div>
          <span>Portfolio</span>
        </div>
        <div>
          <div className='absolute inset-0 w-[calc(100%+30px)] h-[calc(100%+14px)] bg-[#b8b8b8] rounded-[50px] scale-0 group-hover:scale-100 transition-transform duration-300 ease-in-out z-0'></div>
          <span>Information</span>
        </div>
      </nav>

    </header>
  )
}

export default header;
