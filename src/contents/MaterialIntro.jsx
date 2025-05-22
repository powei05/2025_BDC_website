import  { useState } from 'react';

import {Clce, Gel, Cotton, HomeMapTheater} from '../components';
import styles from './MaterialIntro.module.css';

const phases = [
  { key: 'clce', component: Clce },
  { key: 'gel', component: Gel },
  { key: 'cotton', component: Cotton },
  { key: 'homeMap', component: HomeMapTheater }
];
export default function MaterialIntro() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const nextPhase = () => {
    setPhaseIndex(idx => Math.min(idx + 1, phases.length - 1));
  };
  const Current = phases[phaseIndex].component;

  return (
    <div className={styles.MaterialContainer}>
      {/* 如果不是最後一個階段，就傳 onNext 給子組件 */}
      {phaseIndex < phases.length - 1 
        ? <Current onNext={nextPhase} /> 
        : <Current />
      }
    </div>
  );
}