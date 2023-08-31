import styles from './app.module.css';
import { data } from '../../utils/data';
import Header from '../header/header';
import Main from '../main/main';

export const isActive = false;

function App() {
  return (
    <div className={styles.app}>
      <Header></Header>
      <Main></Main>
    </div>
  );
}

export default App;
