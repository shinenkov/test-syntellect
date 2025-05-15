import styles from './styles.module.css';
import ClearHello from 'features/ClearHello';
import Alert from 'features/Alert';
import AutoComplit from 'features/AutoComplit';

function App() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ClearHello />
        <Alert />
        <AutoComplit max={3} />
        <AutoComplit max={10} />
      </div>
    </main>
  );
}

export default App;
