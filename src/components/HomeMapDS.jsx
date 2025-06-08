import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMapDS.module.css';
import '../containers/Bootstrapcss.css';

import S2Fnew     from '../../img/studio.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/ds.gif';
import dsGif      from '../../img/idea.gif';

import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

export default function HomeMapDS() {
  const containerRef = useRef(null);

  const [phase, setPhase]     = useState('init');
  const [isClicked, setClick] = useState(false);
  const navigate = useNavigate();

  /* ---------- ① 初始化：隱藏 brush ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;
    const brush = svg.querySelector('#brush');
    if (brush) gsap.set(brush, { autoAlpha: 0 });
  }, []);

  /* ---------- ② 依 <rect> 定位 GIF ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const update = () => {
      const baseRect = svg.querySelector('#Studiosvg').getBoundingClientRect();
      const map = [
        ['theater_bg_Studio', styles.theater],
        ['Fac_bg_Studio',     styles.fac],
        ['DS_bg_Studio',      styles.ds],
      ];
      map.forEach(([id, cls]) => {
        const rect = svg.querySelector(`#${id}`);
        const div  = svg.querySelector(`.${cls}`);
        if (!rect || !div) return;
        const r = rect.getBoundingClientRect();
        Object.assign(div.style, {
          left:   `${r.left - baseRect.left}px`,
          top:    `${r.top  - baseRect.top }px`,
          width:  `${r.width }px`,
          height: `${r.height}px`,
        });
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ---------- ③ Hover：淡入 / 淡出 brush ---------- */
  useEffect(() => {
    const svg  = containerRef.current;
    if (!svg) return;

    const brush = svg.querySelector('#brush');
    const dsBg  = svg.querySelector('#DS_bg_Studio');
    if (!brush || !dsBg) return;

    const enter = () =>
      gsap.to(brush, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });

    const leave = () => {
      if (isClicked) return; // 點擊後保持顯示
      gsap.to(brush, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' });
    };

    dsBg.addEventListener('mouseenter', enter);
    dsBg.addEventListener('mouseleave', leave);
    return () => {
      dsBg.removeEventListener('mouseenter', enter);
      dsBg.removeEventListener('mouseleave', leave);
    };
  }, [isClicked]);

  /* ---------- ④ Click：放大並固定 brush ---------- */
  const handleClick = e => {
    if (phase !== 'init' || e.target.id !== 'DS_bg_Studio') return;
    setPhase('animating');
    setClick(true);                           // 之後 brush 永遠顯示

    const svg   = containerRef.current;
    const dsBg  = svg.querySelector('#DS_bg_Studio');
    const brush = svg.querySelector('#brush');
    if (!dsBg) return;

    /* Zoom 中心 */
    const bbox = dsBg.getBBox();
    const vb   = svg.querySelector('#Studiosvg').viewBox.baseVal;
    const ox   = ((bbox.x + bbox.width / 2) / vb.width ) * 100 + '%';
    const oy   = ((bbox.y + bbox.height/ 2) / vb.height) * 100 + '%';

    const tl = gsap.timeline({ onComplete: () => navigate('/idea') });

    tl.to(brush, { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .to(svg, {
        duration: 1,
        scale: 2,
        transformOrigin: `${ox} ${oy}`,
        ease: 'power1.inOut'
      }, 0);

    gsap.set(svg, { transformOrigin: '0 0' });
  };

  /* ---------- ⑤ JSX ---------- */
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




