import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'scrollTest/scrollApp.css';

const BoxComponents = ({ animate = 'fade' }) => {
  return (
    <div
      className="box-wrapper aos-init"
      data-aos={animate}
      data-aos-offset="150"
      data-aos-duration="600"
    >
      <span className="boxName">{animate}</span>
      <span className="lastPx">--000px</span>
      <div>--100px</div>
      <div>--200px</div>
      <div>--300px</div>
      <div>--400px</div>
    </div>
  );
};

const ScrollApp = ({ darkMode }) => {
  useEffect(() => {
    AOS.init();
  }, []);
  const animationList = [
    'fade',
    'fade-up',
    'fade-down',
    'fade-left',
    'fade-right',
    'fade-up-right',
    'fade-up-left',
    'fade-down-right',
    'fade-down-left',
    'flip-up',
    'flip-down',
    'flip-left',
    'flip-right',
    'slide-up',
    'slide-down',
    'slide-left',
    'slide-right',
    'zoom-in',
    'zoom-in-up',
    'zoom-in-down',
    'zoom-in-left',
    'zoom-in-right',
    'zoom-out',
    'zoom-out-up',
    'zoom-out-down',
    'zoom-out-left',
    'zoom-out-right',
  ];
  return (
    <div
      className="scrollApp-container"
      style={{ backgroundColor: darkMode ? '#000' : '#fff' }}
    >
      <div className="scrollApp-wrapper">
        {animationList.map((animation) => (
          <BoxComponents animate={animation} />
        ))}
      </div>
    </div>
  );
};

export default ScrollApp;
