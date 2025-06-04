import styles from './TeamMembers.module.css';

export default function TeamMembers() {
  return (
    <div style={{ textAlign: 'center' }}>
    <span style={{ display: 'inline-block', transform: 'translateX(50px)' }}>
        <b>Emergency Website Fix</b>
    </span>
    <br />
    <br />
    <div className={styles.construction}></div>
    </div>
  );
}