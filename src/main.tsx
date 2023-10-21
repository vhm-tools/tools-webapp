import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	import.meta.env.PROD || import.meta.env.MODE === 'production' ? (
		<React.StrictMode>
			<App />
		</React.StrictMode>
	) : (
		<App />
	)
);
