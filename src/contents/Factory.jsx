// src/components/Factory.jsx
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BodyAnimation, HomeMap } from '../components';
import styles from './DanceStudio.module.css';   // 記得更換

export default function Factory() {
  const [showMap, setShowMap] = useState(false);

  // 5 秒後自動切換到地圖畫面
  useEffect(() => {
    const timer = setTimeout(() => setShowMap(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.danceStudioContainer}> {/* 記得更換*/}
      <AnimatePresence exitBeforeEnter>
        {!showMap ? (
          // 撥放 GIF 動畫
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
          // 動畫播完後顯示 HomeMap
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
