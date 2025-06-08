import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMapEnd.module.css';

import S2Fnew     from '../../img/t2d.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/ds.gif';
import dsGif      from '../../img/idea.gif';

import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

export default function HomeMapEnd() {
  const containerRef = useRef(null);

  const [phase, setPhase]     = useState('init');
  const [isClicked, setClick] = useState(false);
  const navigate = useNavigate();

  /* ---------- ① 初始化：隱藏 path / needle / brush ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const needlePath  = svg.querySelector('#needlepath_end');
    const wholeNeedle = svg.querySelector('#whole_needle_end');
    const brushGroup  = svg.querySelector('#brush');

    if (needlePath) {
      const len = needlePath.getTotalLength();
      needlePath.style.strokeDasharray  = len;
      needlePath.style.strokeDashoffset = len;
    }
    if (wholeNeedle) gsap.set(wholeNeedle, { autoAlpha: 0 });
    if (brushGroup)  gsap.set(brushGroup,  { autoAlpha: 0 });
  }, []);

  /* ---------- ② 依 <rect> 定位三張 GIF ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const update = () => {
      const baseRect = svg.querySelector('#S2Fsvg').getBoundingClientRect();
      const map = [
        ['theater_bg_end', styles.theater],
        ['Fac_bg_end',     styles.fac],
        ['DS_bg_end',      styles.ds],
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
    const svg       = containerRef.current;
    if (!svg) return;

    const brush     = svg.querySelector('#brush');
    const dsBg      = svg.querySelector('#DS_bg_end');
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

  /* ---------- ④ Click：路徑動畫 + Zoom + 固定 brush ---------- */
  const handleClick = e => {
    if (phase !== 'init' || e.target.id !== 'DS_bg_end') return;
    setPhase('animating');
    setClick(true);                           // 之後 brush 永遠顯示

    const svg         = containerRef.current;
    const needlePath  = svg.querySelector('#needlepath_end');
    const wholeNeedle = svg.querySelector('#whole_needle_end');
    const brush       = svg.querySelector('#brush');
    const dsBg        = svg.querySelector('#DS_bg_end');
    if (!needlePath || !wholeNeedle || !dsBg) return;

    /* Zoom 中心 */
    const bbox = dsBg.getBBox();
    const vb   = svg.querySelector('#S2Fsvg').viewBox.baseVal;
    const ox   = ((bbox.x + bbox.width / 2) / vb.width ) * 100 + '%';
    const oy   = ((bbox.y + bbox.height/ 2) / vb.height) * 100 + '%';

    const tl = gsap.timeline({ onComplete: () => navigate('/description') });

    tl.to(brush,        { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .set(wholeNeedle, { autoAlpha: 1 }, 0)
      .to(wholeNeedle, {
        duration: 3,
        ease: 'none',
        motionPath: {
          path: needlePath,
          align: needlePath,
          autoRotate: false,
          alignOrigin: [0.9, 0.08],
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