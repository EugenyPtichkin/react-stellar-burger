import styles from './app.module.css';
import Header from '../header/header';
import Main from '../main/main';

export const isActive = false;

function App() {
  return (
    <div className={styles.app}>
      <Header/>
      <Main/>
    </div>
  );
}

export default App;
