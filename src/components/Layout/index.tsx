import { Header } from '../Header';

import styles from './styles.module.css';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};
