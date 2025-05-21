import { Link } from 'react-router-dom';
import styles from './Concept.module.css';

export default function Concept() {
  return (
    <div className={styles.conceptContainer}>
      <Link to="/factory" className={styles.conceptLink}>
        Concept
      </Link>
    </div>
  );
}