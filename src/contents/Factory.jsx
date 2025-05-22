// src/components/Factory.jsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BodyAnimation, HomeMap } from '../components';
import styles from './DanceStudio.module.css';   

export default function Factory() {
  const [showMap, setShowMap] = useState(false);

 
  useEffect(() => {
    const timer = setTimeout(() => setShowMap(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.danceStudioContainer}> 
      <AnimatePresence exitBeforeEnter>
        {!showMap ? (
         
          <motion.div
            key="animation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <BodyAnimation />
          </motion.div>
        ) : (
         
          <motion.div
            key="map"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <HomeMap />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
