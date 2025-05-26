import { Link } from 'react-router-dom';
import styles from './Concept.module.css';

export default function Concept() {
  return (
    
     <div className={styles.conceptContainer}>
      <div className={styles.conceptLogo}>
      <Link to="/factory" className={styles.conceptLink}>
        <img src="/concept_btn.gif" height="800"></img>
      </Link>
      </div>
      </div>
  );
}