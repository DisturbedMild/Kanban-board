import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import './mockServer/server.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);
