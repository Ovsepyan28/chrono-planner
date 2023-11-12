import styles from './styles.module.css';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <p className={styles.logo}>Chrono Planner</p>
    </div>
  );
};
