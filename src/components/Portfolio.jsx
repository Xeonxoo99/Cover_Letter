import React, { forwardRef } from 'react'; 
import PortfolioCard from './PortfolioCard';

import riot from '../images/portfolio/riot.avif';
import riotLogo from '../images/portfolio/riot.svg';
import riotCenter from '../images/portfolio/riotcenter.gif';

import subway from '../images/portfolio/main_video.mp4';
import subwayLogo from '../images/portfolio/subway_logo.svg';
import subwayCenter from '../images/portfolio/searchBetter_menu.png';

import demon from '../images/portfolio/introVideo.mp4';
import demonLogo from '../images/portfolio/demon_logo.png';
import demonCenter from '../images/portfolio/demon_center.png';

const portfolioData = [
  {
    id: 1,
    year: '2025',
    count: '1 / 3',
    logo: riotLogo,
    center: riotCenter,
    img: riot,
    video: null,
    text: 'My take on Riot Games',
    buttonLink: 'https://riot-nu.vercel.app/',
  },
  {
    id: 2,
    year: '2025',
    count: '2 / 3',
    logo: subwayLogo,
    center: subwayCenter,
    img: null,
    video: subway,
    text: 'My take on subway',
    buttonLink: 'https://subway-hyvxgv11r-xeonxoo99s-projects.vercel.app/',
  },
  {
    id: 3,
    year: '2025',
    count: '3 / 3',
    logo: demonLogo,
    center: demonCenter,
    img: null,
    video: demon,
    text: 'My Demon Slayer Website',
    buttonLink: 'https://demon-slayer-six.vercel.app/',
  },
];

// forwardRef로 감싸기
const Portfolio = forwardRef((props, ref) => {

  return (
    <section ref={ref} className="relative block w-full mb-[20vh] font-aeonik">
      {portfolioData.map((item) => (
        <PortfolioCard key={item.id} item={item} />
      ))}
    </section>
  );
});

export default Portfolio;
