import styles from "./app.module.css";
import { data } from "../../utils/data";
import Desktop from "../desktop/desktop";

function App() {
  return (
    <div className={styles.app}>
      <Desktop>
      </Desktop>
    </div>
  );
}

export default App;
