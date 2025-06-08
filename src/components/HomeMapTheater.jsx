import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMapTheater.module.css';

import S2Fnew     from '../../img/f2t.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/ds.gif';
import dsGif      from '../../img/idea.gif';

import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

export default function HomeMapTheater() {
  const containerRef = useRef(null);
  const [phase, setPhase]     = useState('init');
  const [isClicked, setClick] = useState(false);
  const navigate = useNavigate();

  /* ---------- ① 初始化隱藏 ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const needlePath  = svg.querySelector('#needlepath_theater');
    const wholeNeedle = svg.querySelector('#whole_needle_theater');
    const brushGroup  = svg.querySelector('#brush');           // ⬅️ brush

    if (needlePath) {
      const len = needlePath.getTotalLength();
      needlePath.style.strokeDasharray  = len;
      needlePath.style.strokeDashoffset = len;
    }
    if (wholeNeedle) gsap.set(wholeNeedle, { autoAlpha: 0 });
    if (brushGroup)  gsap.set(brushGroup,  { autoAlpha: 0 });
  }, []);

  /* ---------- ② 讀取 <rect> 定位 GIF ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const update = () => {
      const baseRect = svg.querySelector('#S2Fsvg').getBoundingClientRect();
      const map = [
        ['theater_bg_theater', styles.theater],
        ['Fac_bg_theater',     styles.fac],
        ['DS_bg_theater',      styles.ds],
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

  /* ---------- ③ Hover 顯示 / 隱藏 brush ---------- */
  useEffect(() => {
    const svg        = containerRef.current;
    if (!svg) return;
    const brushGroup = svg.querySelector('#brush');
    const theaterBg  = svg.querySelector('#theater_bg_theater');
    if (!brushGroup || !theaterBg) return;

    const enter = () =>
      gsap.to(brushGroup, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });

    const leave = () => {
      if (isClicked) return;       // 點擊後就不再隱藏
      gsap.to(brushGroup, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' });
    };

    theaterBg.addEventListener('mouseenter', enter);
    theaterBg.addEventListener('mouseleave', leave);
    return () => {
      theaterBg.removeEventListener('mouseenter', enter);
      theaterBg.removeEventListener('mouseleave', leave);
    };
  }, [isClicked]);

  /* ---------- ④ Click 動畫 ---------- */
  const handleClick = e => {
    if (phase !== 'init' || e.target.id !== 'theater_bg_theater') return;
    setPhase('animating');
    setClick(true);                         // 之後保持 brush 顯示

    const svg          = containerRef.current;
    const needlePath   = svg.querySelector('#needlepath_theater');
    const wholeNeedle  = svg.querySelector('#whole_needle_theater');
    const brushGroup   = svg.querySelector('#brush');
    const theaterBg    = svg.querySelector('#theater_bg_theater');
    if (!needlePath || !wholeNeedle || !theaterBg) return;

    /* 取得 zoom 中心 */
    const bbox = theaterBg.getBBox();
    const vb   = svg.querySelector('#S2Fsvg').viewBox.baseVal;
    const ox   = ((bbox.x + bbox.width / 2) / vb.width ) * 100 + '%';
    const oy   = ((bbox.y + bbox.height/ 2) / vb.height) * 100 + '%';

    const tl = gsap.timeline({ onComplete: () => navigate('/pov') });

    tl.to(brushGroup,  { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .set(wholeNeedle, { autoAlpha: 1 }, 0)
      .to(wholeNeedle, {
        duration: 3,
        ease: 'none',
        motionPath: {
          path: needlePath,
          align: needlePath,
          autoRotate: false,
          alignOrigin: [0.75, 0.08],
        }
      }, 0)
      .to(needlePath, { strokeDashoffset: 0, duration: 3, ease: 'none' }, 0)
      .to(svg, {
        duration: 1,
        scale: 2,
        transformOrigin: `${ox} ${oy}`,
        ease: 'power1.inOut'
      }, '>-0.2');

    gsap.set(svg, { transformOrigin: '0 0' });
  };

  /* ---------- ⑤ JSX ---------- */
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



