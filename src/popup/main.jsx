// import '../common/rollbarConfig.js';
// import '../common/rollbar.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Popup from './Popup.jsx';
import '../index.css';
import appLogger from '../utils/appLogger.js';

appLogger.log(`Inside popup.jsx`);
appLogger.trace(`Inside popup.jsx`);
appLogger.debug(`Inside popup.jsx`);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Popup />
	</React.StrictMode>
);
