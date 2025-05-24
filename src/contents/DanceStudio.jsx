// src/components/DanceStudio.jsx
import  { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {Concept, BodyAnimation} from '../components';
import styles from './DanceStudio.module.css';

export default function DanceStudio() {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnimation(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.danceStudioContainer}>
      <AnimatePresence>
        {showAnimation ? (
          <motion.div
            key="body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <BodyAnimation />
          </motion.div>
        ) : (
          <motion.div
            key="concept"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <Concept />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}