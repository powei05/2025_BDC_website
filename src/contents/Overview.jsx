// src/components/Factory.jsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BodyAnimation, HomeMapEnd } from '../components';
import styles from './DanceStudio.module.css';   

export default function Overview() {
  const [showMap, setShowMap] = useState(false);

 
  useEffect(() => {
    const timer = setTimeout(() => setShowMap(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.overviewContainer}> 
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
            <HomeMapEnd />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}