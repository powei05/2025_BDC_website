import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomeMap.module.css';

import S2Fnew     from '../../img/s2f_new.svg?react';
import theaterGif from '../../img/theater.gif';
import facGif     from '../../img/ds.gif';
import dsGif      from '../../img/idea.gif';

import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
gsap.registerPlugin(MotionPathPlugin);

export default function HomeMap() {
  const containerRef = useRef(null);

  const [phase, setPhase]       = useState('init');   // 控制一次點擊
  const [isClicked, setClicked] = useState(false);    // 控制 brush 是否保持顯示
  const navigate = useNavigate();

  /* ---------- ① 初始：隱藏 path / brush / needle ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const needlePath  = svg.querySelector('#needlepath');
    const brushGroup  = svg.querySelector('#brush');
    const wholeNeedle = svg.querySelector('#whole_needle_homemap');

    if (needlePath) {
      const len = needlePath.getTotalLength();
      needlePath.style.strokeDasharray  = len;
      needlePath.style.strokeDashoffset = len;
    }
    if (brushGroup)  gsap.set(brushGroup,  { autoAlpha: 0 });
    if (wholeNeedle) gsap.set(wholeNeedle, { autoAlpha: 0 });
  }, []);

  /* ---------- ② 動態擺放三個 GIF ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const update = () => {
      const svgRect = svg.querySelector('#S2Fsvg').getBoundingClientRect();
      const map = [
        ['theater_bg', styles.theater],
        ['Fac_bg',     styles.fac],
        ['DS_bg',      styles.ds],
      ];

      map.forEach(([rectId, cls]) => {
        const rect = svg.querySelector(`#${rectId}`);
        const div  = svg.querySelector(`.${cls}`);
        if (!rect || !div) return;

        const r = rect.getBoundingClientRect();
        Object.assign(div.style, {
          left:   `${r.left - svgRect.left}px`,
          top:    `${r.top  - svgRect.top }px`,
          width:  `${r.width }px`,
          height: `${r.height}px`,
        });
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ---------- ③ Hover：進入顯示、離開隱藏（點擊後不再隱藏） ---------- */
  useEffect(() => {
    const svg = containerRef.current;
    if (!svg) return;

    const brushGroup = svg.querySelector('#brush');
    const facBg      = svg.querySelector('#Fac_bg');
    if (!brushGroup || !facBg) return;

    const enter = () =>
      gsap.to(brushGroup, { autoAlpha: 1, duration: 0.6, ease: 'power2.out' });

    const leave = () => {
      if (isClicked) return; // 已點擊就保持顯示
      gsap.to(brushGroup, { autoAlpha: 0, duration: 0.4, ease: 'power2.in' });
    };

    facBg.addEventListener('mouseenter', enter);
    facBg.addEventListener('mouseleave', leave);
    return () => {
      facBg.removeEventListener('mouseenter', enter);
      facBg.removeEventListener('mouseleave', leave);
    };
  }, [isClicked]);

  /* ---------- ④ Click：播放路徑動畫、zoom in、並固定 brush ---------- */
  const handleClick = e => {
    if (phase !== 'init' || e.target.id !== 'Fac_bg') return;
    setPhase('animating');
    setClicked(true);                      // 使 brush 以後一直顯示

    const svg          = containerRef.current;
    const needlePath   = svg.querySelector('#needlepath');
    const wholeNeedle  = svg.querySelector('#whole_needle_homemap');
    const brushGroup   = svg.querySelector('#brush');
    const facBg        = svg.querySelector('#Fac_bg');
    if (!needlePath || !wholeNeedle || !facBg) return;

    /* zoom 參考點 */
    const bbox  = facBg.getBBox();
    const vb    = svg.querySelector('#S2Fsvg').viewBox.baseVal;
    const oxPct = ((bbox.x + bbox.width  / 2) / vb.width ) * 100 + '%';
    const oyPct = ((bbox.y + bbox.height / 2) / vb.height) * 100 + '%';

    /* 動畫流程 */
    const tl = gsap.timeline({ onComplete: () => navigate('/materialintro') });

    tl.to(brushGroup,  { autoAlpha: 1, duration: 1.2, ease: 'power2.out' }, 0)
      .set(wholeNeedle, { autoAlpha: 1 }, 0)
      .to(wholeNeedle, {
        duration: 3,
        ease: 'none',
        motionPath: { path: needlePath, align: needlePath, autoRotate: false, alignOrigin: [0.35, 0.1] }
      }, 0)
      .to(needlePath, { strokeDashoffset: 0, duration: 3, ease: 'none' }, 0)
      .to(svg, {
        duration: 1,
        scale: 2,
        transformOrigin: `${oxPct} ${oyPct}`,
        ease: 'power1.inOut'
      }, '>-0.2');

    /* 讓 transform 生效 */
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



