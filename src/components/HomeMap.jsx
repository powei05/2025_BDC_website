import  { useRef, useEffect, useState } from 'react';
import styles from './HomeMap.module.css';
import S2Fnew from '../../img/S2F_new.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/fac.gif';
import dsGif      from '../../img/ds.gif';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function NeedleAnimation({ onComplete }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('init');

  useEffect(() => {
    const svgContainer = containerRef.current;
    if (!svgContainer) return;

    const needlePath = svgContainer.querySelector('#needlepath');
    if (needlePath) {
      const pathLength = needlePath.getTotalLength();
      needlePath.style.strokeDasharray = pathLength;
      needlePath.style.strokeDashoffset = pathLength;
    }

    const wholeNeedle = svgContainer.querySelector('#whole_needle_homemap');
    if (wholeNeedle) {
      gsap.set(wholeNeedle, { autoAlpha: 0 });
    }
  }, []);

  const handleClick = (e) => {
    if (phase !== 'init') return;
    if (e.target.id !== 'Fac_bg') return;
    setPhase('animating');

    const svgContainer = containerRef.current;
    if (!svgContainer) return;
    const needlePath = svgContainer.querySelector('#needlepath');
    const wholeNeedle = svgContainer.querySelector('#whole_needle_homemap');
    if (!needlePath || !wholeNeedle) return;

    const tl = gsap.timeline({
      onStart: () => tl.set(wholeNeedle, { autoAlpha: 1 }, 0),
      onComplete: () => {
        setPhase('done');
        typeof onComplete === 'function' && onComplete();
      }
    });

    tl.to(wholeNeedle, {
      duration: 3,
      ease: 'none',
      motionPath: {
        path: needlePath,
        align: needlePath,
        autoRotate: false,
        alignOrigin: [0.35, 0.1]
      }
    }, 0);

    tl.to(needlePath, {
      strokeDashoffset: 0,
      duration: 3,
      ease: 'none'
    }, 0);
  };

  return (
    <div ref={containerRef} className={styles.container} onClick={handleClick}>
      <S2Fnew id="S2Fsvg" className={styles.svg} />

      {/* GIF 容器 */}
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


