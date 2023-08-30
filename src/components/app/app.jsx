import styles from './app.module.css';
import { data } from '../../utils/data';
import Header from '../header/header';

export const isActive = false;

function App() {
  return (
    <div className={styles.app}>
      <Header>
      </Header>
    </div>
  );
}

export default App;
