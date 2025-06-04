import { useState } from 'react';
import { motion } from 'framer-motion';
import { Abstract} from '../components';
import styles from './MaterialIntro.module.css';

export default function MaterialIntro() {
  const [showMap, setShowMap] = useState(false);

  return (
    <div className={styles.MaterialContainer}>
      <motion.div
        key={showMap ? 'map' : 'abstract'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {showMap
          ? <HomeMap />
          : <Abstract onNext={() => setShowMap(true)} />}
      </motion.div>
    </div>
  );
}