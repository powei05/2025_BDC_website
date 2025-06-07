import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NeedleButton.css';

import InitialSVG from '../../img/needleNline_initial.svg?react';
import EndSVG from '../../img/needleNline_end.svg?react';

export default function NeedleButton({ onComplete }) {
  const [phase, setPhase] = useState('init');      // init → midAnim → middleAnim → endAnim → textAnim
  const containerRef = useRef(null);

  /* ---------- phase 1：midAnim 先隱藏三段線 + 文字 ---------- */
  useEffect(() => {
    if (phase !== 'midAnim') return;

    const svg = containerRef.current.querySelector('svg');
    const mid = svg.querySelector('#mid-path');
    const middle = svg.querySelector('#middle-path');
    const end = svg.querySelector('#end-path');
    const text = svg.querySelector('#yenshantxt');
    if (!mid || !middle || !end || !text) return;

    /* 隱藏三段路徑（strokeDashoffset） */
    const hidePath = (el, durationRatio) => {
      const len = el.getTotalLength();
      el.style.strokeDasharray = len;
      el.style.strokeDashoffset = len;
      el.style.transition = 'none';
      el.getBoundingClientRect();
      el.style.transition = `stroke-dashoffset ${0.8 * durationRatio}s linear`;
    };

    hidePath(mid, 1);
    hidePath(middle, middle.getTotalLength() / mid.getTotalLength());
    hidePath(end, end.getTotalLength() / mid.getTotalLength());

    /* 文字先整個隱藏 */
    text.style.opacity = 0;
    text.style.transition = 'none';

    /* 播放第一段路徑 */
    requestAnimationFrame(() => {
      mid.style.strokeDashoffset = 0;
    });
    mid.addEventListener('transitionend', () => setPhase('middleAnim'), { once: true });
  }, [phase]);

  /* ---------- phase 2：middleAnim 播放 middle-path ---------- */
  useEffect(() => {
    if (phase !== 'middleAnim') return;
    const middle = containerRef.current.querySelector('#middle-path');
    if (!middle) return;

    requestAnimationFrame(() => (middle.style.strokeDashoffset = 0));
    middle.addEventListener('transitionend', () => setPhase('endAnim'), { once: true });
  }, [phase]);

  /* ---------- phase 3：endAnim 播放 end-path ---------- */
  useEffect(() => {
    if (phase !== 'endAnim') return;
    const end = containerRef.current.querySelector('#end-path');
    if (!end) return;

    requestAnimationFrame(() => (end.style.strokeDashoffset = 0));
    end.addEventListener('transitionend', () => setPhase('textAnim'), { once: true });
  }, [phase]);

  /* ---------- phase 4：textAnim 淡入文字，完成後呼叫 onComplete ---------- */
  useEffect(() => {
    if (phase !== 'textAnim') return;
    const text = containerRef.current.querySelector('#yenshantxt');
    if (!text) return;

    // 設定文字的淡入
    text.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => (text.style.opacity = 1));

    text.addEventListener('transitionend', onComplete, { once: true });
  }, [phase, onComplete]);

  /* ---------- 點擊觸發 ---------- */
  const handleClick = (e) => {
    if (phase === 'init' && e.target.id === 'acbutton') setPhase('midAnim');
  };

  return (
    <div className="needle-container" ref={containerRef} onClick={handleClick}>
      {phase === 'init' ? <InitialSVG className="needle-svg" /> : <EndSVG className="needle-svg" />}
    </div>
  );
}

NeedleButton.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

