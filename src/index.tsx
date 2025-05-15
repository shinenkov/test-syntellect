import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from 'app/App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(<App />);

reportWebVitals();
