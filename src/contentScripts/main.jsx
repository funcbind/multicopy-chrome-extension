// import '../common/rollbarConfig.js';
// import '../common/rollbar.min.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import styles1 from '../index.css?inline';
import styles2 from './main.scss?inline';
import MainContent from './MainContent';

console.log(`inside content script on gitlab.com`);
// window.addEventListener('load', onWindowLoaded, false);
setTimeout(onWindowLoaded, 4000);

function onWindowLoaded() {
	console.log(`allwebPages.jsx - window loaded`);
	init();
}

function init() {
	const contentRoot = document.createElement('div');
	contentRoot.id = 'nc-root';
	const shadowRoot = contentRoot.attachShadow({ mode: 'open' });
	const shadowWrapper = document.createElement('div');
	shadowWrapper.id = 'root';
	document.body.append(contentRoot);
	shadowRoot.append(shadowWrapper);

	// Attach a shadow root to the host
	ReactDOM.createRoot(shadowWrapper).render(
		<React.StrictMode>
			<style type='text/css'>
				{styles1}
				{styles2}
			</style>
			<MainContent />
		</React.StrictMode>
	);
}
