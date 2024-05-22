// import '../common/rollbarConfig.js';
// import '../common/rollbar.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Options from './Options.jsx';
import '../index.css';
import appLogger from '../utils/appLogger.js';

appLogger.log(`Inside options.jsx !!!!`);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Options />
	</React.StrictMode>
);
