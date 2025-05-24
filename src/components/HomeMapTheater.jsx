import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMapTheater.module.css';
import S2Fnew from '../../img/f2t.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/fac.gif';
import dsGif      from '../../img/ds.gif';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';


gsap.registerPlugin(MotionPathPlugin);

export default function HomeMap() {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('init');
  const navigate = useNavigate();
  
  useEffect(() => {
    const svgContainer = containerRef.current;
    if (!svgContainer) return;

    // initial phase hide all path
    const needlePath = svgContainer.querySelector('#needlepath_theater');
    if (needlePath) {
      const length = needlePath.getTotalLength();
      needlePath.style.strokeDasharray = length;
      needlePath.style.strokeDashoffset = length;
    }

    // initial phase hide whole needle
    const wholeNeedle = svgContainer.querySelector('#whole_needle_theater');
    if (wholeNeedle) gsap.set(wholeNeedle, { autoAlpha: 0 });
  }, []);
    
    useEffect(() => {
    const svgContainer = containerRef.current;
    if (!svgContainer) return;

    // hide path & wholeNeedle
    const needlePath = svgContainer.querySelector('#needlepath_theater');
    if (needlePath) {
      const length = needlePath.getTotalLength();
      needlePath.style.strokeDasharray = length;
      needlePath.style.strokeDashoffset = length;
    }
    const wholeNeedle = svgContainer.querySelector('#whole_needle_theater');
    if (wholeNeedle) gsap.set(wholeNeedle, { autoAlpha: 0 });
  }, []);

  // ------------------------------------------------
  // 2) find rect position
  //    and set gif position
  // ------------------------------------------------
  useEffect(() => {
    const svgContainer = containerRef.current;
    if (!svgContainer) return;

    const updateGifs = () => {
     
      const svgRect = svgContainer
        .querySelector('#S2Fsvg')
        .getBoundingClientRect();

      
      const map = [
        ['theater_bg_theater', styles.theater],
        ['Fac_bg_theater',     styles.fac],
        ['DS_bg_theater',      styles.ds],
      ];

      map.forEach(([rectId, cls]) => {
        const rectEl = svgContainer.querySelector(`#${rectId}`);
        const gifDiv = svgContainer.querySelector(`.${cls}`);
        if (rectEl && gifDiv) {
          const r = rectEl.getBoundingClientRect();
          // 轉成相對 container 的 px
          const left   = r.left   - svgRect.left;
          const top    = r.top    - svgRect.top;
          const width  = r.width;
          const height = r.height;

          Object.assign(gifDiv.style, {
            left:   `${left}px`,
            top:    `${top}px`,
            width:  `${width}px`,
            height: `${height}px`,
          });
        }
      });
    };

    updateGifs();
    window.addEventListener('resize', updateGifs);
    return () => window.removeEventListener('resize', updateGifs);
  }, []);

  const handleClick = e => {
    if (phase !== 'init' || e.target.id !== 'theater_bg_theater') return;
    setPhase('animating');

    const svgContainer = containerRef.current;
    const needlePath    = svgContainer.querySelector('#needlepath_theater');
    const wholeNeedle   = svgContainer.querySelector('#whole_needle_theater');
    const theaterBg         = svgContainer.querySelector('#theater_bg_theater');

    if (!needlePath || !wholeNeedle || !theaterBg) return;

    // set theater bbox position
    const bbox = theaterBg.getBBox();
    const svgEl = svgContainer.querySelector('#S2Fsvg');
    const vb = svgEl.viewBox.baseVal;
    const originX = ((bbox.x + bbox.width/2) / vb.width)  * 100 + '%';
    const originY = ((bbox.y + bbox.height/2) / vb.height)* 100 + '%';

    // setup timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // navigate('/factory');
        navigate('/pov');
      }
    });

    // 1. path animation
    tl.set(wholeNeedle, { autoAlpha: 1 }, 0)
      .to(wholeNeedle, {
        duration: 3,
        ease: 'none',
        motionPath: {
          path: needlePath,
          align: needlePath,
          autoRotate: false,
          alignOrigin: [0.75, 0.08]
        }
      }, 0)
      .to(needlePath, {
        strokeDashoffset: 0,
        duration: 3,
        ease: 'none'
      }, 0);

    // 2. zoomin factory
    tl.to(svgContainer, {
      duration: 1,
      scale: 2,                   
      transformOrigin: `${originX} ${originY}`,
      ease: 'power1.inOut'
    }, '>-0.2');  

    
    gsap.set(svgContainer, { transformOrigin: '0 0' });
  };

  return (
    <div ref={containerRef} className={styles.container} onClick={handleClick}>
      <S2Fnew id="S2Fsvg" className={styles.svg} />

      <div className={`${styles.gifContainer} ${styles.theater}`}>
        <img src={theaterGif} alt="theater" />
      </div>
      <div className={`${styles.gifContainer} ${styles.fac}`}>
        <img src={facGif} alt="factory" />
      </div>
      <div className={`${styles.gifContainer} ${styles.ds}`}>
        <img src={dsGif} alt="dance studio" />
      </div>
    </div>
  );
}


