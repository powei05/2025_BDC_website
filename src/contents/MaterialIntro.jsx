import  { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    setPhaseIndex((idx) => Math.min(idx + 1, phases.length - 1));
  };

  const Current = phases[phaseIndex].component;

  return (
    <div className={styles.MaterialContainer}>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={phases[phaseIndex].key}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          {/* 最後一個 phase(HomeMap) 不需要 onNext */}
          {phaseIndex < phases.length - 1 ? (
            <Current onNext={nextPhase} />
          ) : (
            <Current />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}