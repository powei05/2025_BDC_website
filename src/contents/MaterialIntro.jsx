import { useState } from 'react';
import { Clce, HomeMapTheater } from '../components';
import styles from './MaterialIntro.module.css';

export default function MaterialIntro() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className={styles.MaterialContainer}>
      {showMap 
        ? <HomeMapTheater /> 
        : <Clce onNext={() => setShowMap(true)} />
      }
    </div>
  );
}