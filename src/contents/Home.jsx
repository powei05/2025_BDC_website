import  { useState } from 'react';
import '../containers/Bootstrapcss.css';
import { NeedleButton,  HomeMapDS } from '../components';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  // 控制要顯示動畫還是地圖
  const [showMap, setShowMap] = useState(false);

  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        {showMap ? (
          <motion.div
            key="map"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <HomeMapDS />
          </motion.div>
        ) : (
          <motion.div
            key="button"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <NeedleButton
              onComplete={() => setTimeout(() => setShowMap(true), 300)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
