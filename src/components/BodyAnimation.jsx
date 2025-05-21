// src/components/BodyAnimation.jsx
import styles from './BodyAnimation.module.css';
import transitionGif from '../../img/BodyAnimation.gif?react';

export default function BodyAnimation() {
  return (
    <div className={styles.animationContainer}>
      <img
        src={transitionGif}
        alt="Body Animation"
        className={styles.fullscreenGif}
      />
    </div>
  );
}