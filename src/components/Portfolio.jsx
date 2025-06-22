import React from 'react'
import { motion } from 'framer-motion';

import riot from '../images/portfolio/riot.avif'
import riotLogo from '../images/portfolio/riot.svg'
import riotCenter from '../images/portfolio/riotcenter.gif'

import subway from '../images/portfolio/main_video.mp4'
import subwayLogo from '../images/portfolio/subway_logo.svg'
import subwayCenter from '../images/portfolio/searchBetter_menu.png'

import demon from '../images/portfolio/introVideo.mp4'
import demonLogo from '../images/portfolio/demon_logo.png'
import demonCenter from '../images/portfolio/demon_center.png'

const portfolioData = [
  {
    id: 1,
    year: '2025',
    count: '1 / 5',
    logo: riotLogo,
    center: riotCenter,
    bgColor: 'bg-[blue]',
    img: riot,
    video: null,
    text: 'My take on Riot Games',
    buttonLink: 'https://riot-nu.vercel.app/',
  },
  {
    id: 2,
    year: '2025',
    count: '2 / 5',
    logo: subwayLogo,
    center: subwayCenter,
    bgColor: 'bg-[blue]',
    img: null,
    video: subway,
    text: 'My take on subway',
    buttonLink: 'https://subway-hyvxgv11r-xeonxoo99s-projects.vercel.app/',
  },
  {
    id: 3,
    year: '2025',
    count: '3 / 5',
    logo: demonLogo,
    center: demonCenter,
    bgColor: 'bg-[blue]',
    img: null,
    video: demon,
    text: 'My Demon Slayer Website',
    buttonLink: 'https://demon-slayer-six.vercel.app/',
  },
];


function Portfolio() {
  return (
    <section className='relative block w-full mb-[20vh] font-aeonik'>

      {/* 포폴 카드들 */}
      {portfolioData.map((item) => (
        <div key={item.id} className='relative w-full h-[calc(200vh-6.25vw)] mb-[calc(-100vh+4.16667vw)] pointer-events-none'>
          <div className='relative w-full h-[400vh]'>
            <div className='sticky flex flex-col top-0 w-full h-screen items-center justify-center'>
              <div className={`relative overflow-hidden justify-between text-[#ffffff] w-[calc(100%-6.25vw)] h-[calc(100vh-6.25vw)] ${item.bgColor} rounded-[30px] opacity-100`}>

                {/* 이미지 or 비디오 */}
                <div className='absolute w-full h-full'>
                  <div className='block'>
                    {item.video ? (
                      <video autoPlay muted loop className='w-full h-[120%] object-cover'>
                        <source src={item.video} type='video/mp4' />
                      </video>
                    ) : (
                      <img src={item.img} alt="project visual" className='absolute w-full h-[120%] object-cover' />
                    )}
                  </div>
                </div>

                {/* 상단 */}
                <div className='absolute top-4 w-full z-10 flex flex-shrink-0 items-center justify-center'>
                  <span className='absolute text-[1.5625vw] top-[1.04167vw] left-[calc(14px+1.04167vw)]'>{item.year}</span>
                  <img src={item.logo} alt="logo" className={`${item.id === 3 ? 'w-24 mt-3' : 'w-32 mt-6'}`} />
                  <span className='absolute text-[1.5625vw] top-[1.04167vw] right-[calc(14px+1.04167vw)]'>{item.count}</span>
                </div>

                {/* 중단 텍스트 + 이미지 */}
                <div className='relative flex w-full h-full items-center justify-center'>
                  <div className='absolute flex flex-col w-full justify-center'>
                    <div className='relative text-[14vw] w-full h-[.9em] mb-[.02em]'>
                      <div className='relative flex overflow-hidden w-full h-full'>
                        {[1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ x: ['0%', '-100%'] }}
                            transition={{
                              repeat: Infinity,
                              repeatType: 'loop',
                              duration: 77,
                              ease: 'linear'
                            }}
                            className="inline-flex flex-row flex-nowrap items-center"
                          >
                            <span className='relative inline-block uppercase whitespace-nowrap mr-[.26em] mb-[.15em]'>
                              {item.text}
                            </span>
                            <span className='relative inline-block uppercase whitespace-nowrap mr-[.26em] mb-[.15em]'>
                              {item.text}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='absolute flex items-center justify-center w-[33.33333vw] max-h-[70vh] h-[calc(100%-60px)]'>
                    <img src={item.center} alt="center visual" className='absolute w-full h-full object-contain object-center' />
                  </div>
                </div>

                {/* 하단 */}
                <div className='absolute bottom-0 w-full flex flex-shrink-0 justify-center items-center'>
                  <div className='relative w-full h-full flex justify-center items-end'>
                    <span className='text-[1.5625vw] px-[1vw] text-center uppercase leading-4'>{item.text}</span>
                  </div>
                  <div className='relative w-full flex justify-center'>
                    <a href={item.buttonLink} className='relative text-[1.5625vw] flex flex-grow-0 justify-center mt-[1vw] mb-[1vw] py-[8px] px-[24px]'>
                      <div className='absolute top-0 w-full h-full rounded-[100px] bg-[rgb(215,30,40)]'></div>
                      <span className='relative block'>VISIT NOW</span>
                    </a>
                  </div>
                  <div className='relative flex w-full h-full items-end justify-center'>
                    <span className='text-[1.5625vw] px-[1vw] text-center uppercase'>Portfolio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}


    </section>
  )
}

export default Portfolio;
