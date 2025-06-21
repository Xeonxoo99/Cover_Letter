import React from 'react'

import html5 from '../images/introduction/HTML5.svg'
import css3 from '../images/introduction/CSS3.svg'
import js from '../images/introduction/JS.svg'
import react from '../images/introduction/React.svg'
import tailwindcss from '../images/introduction/Tailwind.svg'
import gsap from '../images/introduction/GSAP.svg'

const images = [
  { src: html5, alt: 'HTML5' },
  { src: css3, alt: 'CSS3' },
  { src: js, alt: 'JavaScript' },
  { src: react, alt: 'React' },
  { src: tailwindcss, alt: 'Tailwind CSS' },
  { src: gsap, alt: 'GSAP' },
]

function Introduction() {
  return (
    <section className='relative w-full pt-[6vw] pr-[3vw] pb-[8vw] font-aeonik'>

      {/* 간략한 소개 문구 */}
      <div className='relative inline-block w-[1400px] p-10'>
        <span>
          <p className='absolute text-[16px] font-bold top-6 left-14'>프론트엔드 개발자, 항상 발전 중인 사람.</p>
          <h1 className='p-0 m-0 text-[200px]'
            style={{ lineHeight: '0.8em' }}
          >
            Frontend Developer, Always in Progress.
          </h1>
        </span>
      </div>

      {/* 아이콘들 */}
      <div className='relative w-full'>
        <div className='relative py-52 left-1/2 transform -translate-x-1/2 w-[93vw] h-16 flex items-center justify-around'>
          {images.map(({ src, alt }, index) => (
            <img
              key={index}
              src={src}
              alt={alt}
              className='w-40 h-40 object-contain grayscale'
            />
            // grayscale : 흑백으로 변경
          ))}
        </div>
      </div>

      {/* 중간 문구 */}
      <div className='relative w-full pb-24 flex flex-col items-center text-center text-[2vw] uppercase'>
          <span className='inline-block'>
            <h2 className='leading-[38.4px]'>Junior</h2>
            <h2 className='leading-[38.4px]'>Frontend</h2>
            <h2 className='leading-[38.4px]'>Developer</h2>
          </span>
          <div className='w-full flex justify-around'>
            <span className='w-[50%] text-center'>since</span>
            <span className='w-[50%] text-center'>2023:</span>
          </div>
      </div>

      {/* 자기소개 및 자격증/졸업 등*/}
      <div className='relative w-full flex justify-between pl-10'>
        {/* 자기 소개 */}
        <div className='w-[45vw]'>
          <div className='text-lg leading-[1em] text-left'>
            <span className='block w-[23vw] font-medium font-Arial uppercase'>
              I focus on problem-solving by calmly analyzing issues and learning from mistakes. I embrace failures as growth opportunities and set small goals to build confidence and maintain steady progress.
            </span>
          </div>

          <div className='relative flex'>
            {/* 이미지가 아니라 three.js 사용해서 노트북 넣기,,?? */}
            <div className='w-[300px] h-[400px] bg-[#4e4d4d] mt-3'>
            </div>

            <span className='w-[25vw] mt-1 ml-3 text-lg font-noto font-medium text-center'>
              저는 문제 상황이 발생했을 때 침착하게 분석하고, 그 과정을 통해 실수를 배우는 기회로 삼아 문제를 해결하는 데 집중합니다. <br/> 실패를 두려워하지 않고 오히려 성장의 발판으로 받아들이며, <br/> 자신감을 쌓기 위해 작은 목표부터 차근차근 설정하고 꾸준히 나아가는 태도를 중요하게 생각합니다.
            </span>
          </div>
        </div>
        {/* 자격증 / 졸업 */}
        <div className='relative w-[45vw]'>

          <div className='border-t-[1px] border-b-[1px] border-[#000000]'>
            {/* 졸업 */}
            <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer'>
              <div className='w-full block flex-grow-1 uppercase'> Seoul Electronic High School </div>
              <div className='inline-block px-[2vw] text-center w-auto'> 2018 </div>
              <div className='text-right w-full block flex-grow-1 uppercase'> Graduation </div>
            </div>
            {/* 운전면허증 */}
            <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer border-t-[1px] border-[#000000]'>
              <div className='w-full block flex-grow-1 uppercase'> Driver's License </div>
              <div className='inline-block px-[2vw] text-center w-auto'> 2020 </div>
              <div className='text-right w-full block flex-grow-1 uppercase'> obtain </div>
            </div>
            {/* 부트캠프(항해99) 수료 */}
            <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer border-t-[1px] border-[#000000]'>
              <div className='w-full block flex-grow-1 uppercase'> Coding Bootcamp </div>
              <div className='inline-block px-[2vw] text-center w-auto'> 2023 </div>
              <div className='text-right w-full block flex-grow-1 uppercase'> Completed </div>
            </div>
            {/* sbs아카데미 */}
            <div className='relative w-full flex items-center justify-between h-[50px] overflow-hidden cursor-pointer border-t-[1px] border-[#000000]'>
              <div className='w-full block flex-grow-1 uppercase'> sbs academy </div>
              <div className='inline-block pl-[0.5vw] text-center w-auto'> 2024~ </div>
              <div className='text-right w-full block flex-grow-1 uppercase'> In Progress </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default Introduction;
