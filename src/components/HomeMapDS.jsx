import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMapDS.module.css';
import '../containers/Bootstrapcss.css';
import S2Fnew from '../../img/studio.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/ds.gif';
import dsGif      from '../../img/idea.gif';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

export default function HomeMapDS() {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState('init');
  const navigate = useNavigate();

  // 動態讀取 SVG rect 位置，來定位 GIF
  useEffect(() => {
    const svgContainer = containerRef.current;
    if (!svgContainer) return;

    const updateGifs = () => {
      const svgEl   = svgContainer.querySelector('#Studiosvg');
      const svgRect = svgEl.getBoundingClientRect();

      const map = [
        ['theater_bg_Studio', styles.theater],
        ['Fac_bg_Studio',     styles.fac],
        ['DS_bg_Studio',      styles.ds],
      ];

      map.forEach(([rectId, cls]) => {
        const rectEl = svgContainer.querySelector(`#${rectId}`);
        const gifDiv = svgContainer.querySelector(`.${cls}`);
        if (rectEl && gifDiv) {
          const r = rectEl.getBoundingClientRect();
          Object.assign(gifDiv.style, {
            left:   `${r.left - svgRect.left}px`,
            top:    `${r.top  - svgRect.top}px`,
            width:  `${r.width}px`,
            height: `${r.height}px`,
          });
        }
      });
    };

    updateGifs();
    window.addEventListener('resize', updateGifs);
    return () => window.removeEventListener('resize', updateGifs);
  }, []);

  // 點擊 DS_bg_Studio → 放大 ＋ 跳頁
  const handleClick = e => {
    if (phase !== 'init' || e.target.id !== 'DS_bg_Studio') return;
    setPhase('animating');

    const svgContainer = containerRef.current;
    const dsBg         = svgContainer.querySelector('#DS_bg_Studio');
    if (!dsBg) return;

    const bbox  = dsBg.getBBox();
    const svgEl = svgContainer.querySelector('#Studiosvg');
    const vb    = svgEl.viewBox.baseVal;
    const originX = ((bbox.x + bbox.width/2) / vb.width)   * 100 + '%';
    const originY = ((bbox.y + bbox.height/2) / vb.height) * 100 + '%';

    const tl = gsap.timeline({
      onComplete: () => navigate('/idea')
    });

    // 直接放大 container
    tl.to(svgContainer, {
      duration: 1,
      scale: 2,
      transformOrigin: `${originX} ${originY}`,
      ease: 'power1.inOut'
    });

    // 確保 CSS transform-origin 生效
    gsap.set(svgContainer, { transformOrigin: '0 0' });
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onClick={handleClick}
    >
      <S2Fnew id="Studiosvg" className={styles.svg} />

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



