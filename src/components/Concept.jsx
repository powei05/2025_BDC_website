import { Link } from 'react-router-dom';
import styles from './Concept.module.css';

export default function Concept() {
  return (
    <div className={styles.conceptContainer}>
      <div className={styles.conceptLogo}>
        <Link to="/concepttext" className={styles.conceptLink}>
          <img
            src="/concept_btn.gif"
            className={styles.conceptButton}
            alt="Concept Button"
          />
        </Link>
      </div>
    </div>
  );
}