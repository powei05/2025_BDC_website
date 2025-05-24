import PropTypes from 'prop-types';
import styles from './Gel.module.css';
import hydrogelImg from '../../img/gel.jpg';
export default function Gel({ onNext }) {
  return (

    <div className={styles.card}>
      <div className={styles.left}>
        <img src={hydrogelImg} alt="Hydrogel" className={styles.image} />
        <h2 className={styles.title}>Hydrogel</h2>
      </div>
      <div className={styles.right}>
        <p className={styles.description}>
          Hydrogel is a network of polymer chains that are hydrophilic. They are often used in medical, agricultural, and wearable technologies.
        </p>
        <button
          
          onClick={onNext}
          className={styles.button}>
          GEL
        </button>
      </div>
    </div>    

  );
}
Gel.propTypes = {
  onNext: PropTypes.func.isRequired,
};