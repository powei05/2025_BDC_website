import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './NeedleButton.css';

import InitialSVG from '../../img/needleNline_initial.svg?react';
import EndSVG from '../../img/needleNline_end.svg?react';

export default function NeedleButton({ onComplete }) {
  const [phase, setPhase] = useState('init'); // init → midAnim → middleAnim → endAnim
  const containerRef = useRef(null);

  // initial phase hide all path
  useEffect(() => {
    if (phase !== 'midAnim') return;
    const svg = containerRef.current.querySelector('svg');
    const mid = svg.querySelector('#mid-path');
    const middle = svg.querySelector('#middle-path');
    const end = svg.querySelector('#end-path');
    if (!mid || !middle || !end) return;

    // 隱藏三段線
  // === mid-path ===
  const lenMid = mid.getTotalLength();
  mid.style.strokeDasharray = lenMid;
  mid.style.strokeDashoffset = lenMid;      // 隱藏
  mid.style.transition = 'none';             // 先清除 transition
  mid.getBoundingClientRect();               // 强制重排
  mid.style.transition = 'stroke-dashoffset 0.5s linear';

  // === middle-path ===
  const lenMiddle = middle.getTotalLength();
  middle.style.strokeDasharray = lenMiddle;
  middle.style.strokeDashoffset = lenMiddle;
  middle.style.transition = 'none';
  middle.getBoundingClientRect();
  let duration = 0.5*(lenMiddle/lenMid);
  middle.style.transition = `stroke-dashoffset ${duration}s linear`;

  // === end-path ===
  const lenEnd = end.getTotalLength();
  end.style.strokeDasharray = lenEnd;
  end.style.strokeDashoffset = lenEnd;
  end.style.transition = 'none';
  end.getBoundingClientRect();
  duration = 0.4*(lenEnd/lenMid);
  end.style.transition = `stroke-dashoffset ${duration}s linear`;

    // play mid-path
    requestAnimationFrame(() => {
      mid.style.strokeDashoffset = '0';
    });
    mid.addEventListener('transitionend', () => setPhase('middleAnim'), { once: true });
  }, [phase]);

  // second phase play middle-path
  useEffect(() => {
    if (phase !== 'middleAnim') return;
    const svg = containerRef.current.querySelector('svg');
    const middle = svg.querySelector('#middle-path');
    if (!middle) return;

    requestAnimationFrame(() => {
      middle.style.strokeDashoffset = '0';
    });
    middle.addEventListener('transitionend', () => setPhase('endAnim'), { once: true });
  }, [phase]);

  // third phase play end-path
  useEffect(() => {
    if (phase !== 'endAnim') return;
    const svg = containerRef.current.querySelector('svg');
    const end = svg.querySelector('#end-path');
    if (!end) return;

    requestAnimationFrame(() => {
      end.style.strokeDashoffset = '0';
    });
    end.addEventListener('transitionend', () => onComplete(), { once: true });
  }, [phase, onComplete]);

  // button click event
  const handleClick = (e) => {
    if (phase === 'init' && e.target.id === 'acbutton') {
      setPhase('midAnim');
    }
  };

  return (
    <div className="needle-container" ref={containerRef} onClick={handleClick}>
      {phase === 'init' ? (
        <InitialSVG className="needle-svg" />
      ) : (
        <EndSVG className="needle-svg" />
      )}
    </div>
  );
}

NeedleButton.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

