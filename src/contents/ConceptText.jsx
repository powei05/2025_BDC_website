import { motion } from 'framer-motion';
import { Abstract } from '../components';
import styles from './MaterialIntro.module.css';

export default function ConceptText() {
  return (
    <div className={styles.MaterialContainer}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Abstract />
      </motion.div>
    </div>
  );
}