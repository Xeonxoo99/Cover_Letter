import React from 'react';

// 아이콘들을 배열로 관리하기 쉽게 import
import html5 from '../images/introduction/HTML5.svg';
import css3 from '../images/introduction/CSS3.svg';
import jquery from '../images/introduction/jQuery.svg';
import js from '../images/introduction/JS.svg';
import react from '../images/introduction/React.svg';
import tailwindcss from '../images/introduction/Tailwind.svg';
import gsap from '../images/introduction/GSAP.svg';
import nextjs from '../images/introduction/nextjs.svg';
import threejs from '../images/introduction/Threejs.svg';

// 아이콘들을 배열에 담아 관리
const icons = [html5, css3, jquery, js, react, tailwindcss, gsap, nextjs, threejs];

function Loading({ progress }) {
  // 진행률에 따라 현재 보여줄 아이콘의 인덱스 계산
  const totalIcons = icons.length;
  // progress가 100일 때 index가 배열 길이를 넘어가지 않도록 Math.min 사용
  const currentIconIndex = Math.min(
    Math.floor(progress / (100 / totalIcons)),
    totalIcons - 1
  );

  return (
    <div className='fixed block w-screen h-screen' style={{ zIndex: 99999999 }}>
      <div className="absolute flex flex-col items-center justify-center top-0 left-0 w-screen h-screen"
        style={{ backgroundColor: '#000000', color: 'white' }}
      >
        {/* 현재 진행률에 맞는 아이콘 표시 */}
        <div className='w-24 h-24 mb-8'>
          <img src={icons[currentIconIndex]} alt="Loading Icon" className='w-full h-full object-contain'/>
        </div>

        {/* 로딩 바와 퍼센트 표시 */}
        <div className='flex items-center w-64 flex-col'>
          <div className='flex items-center w-full'>
            <div className='w-full bg-gray-700 rounded-full h-2.5'>
              <div 
                className='bg-blue-500 h-2.5 rounded-full transition-all duration-300 ease-linear' 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className='mt-4 text-xl font-mono'>
            {/* progress 값을 반올림하여 정수로 표시 */}
            {Math.round(progress)}%
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;