import { create } from 'zustand';

const loggerMiddleware = (config) => (set, get, api) => {
	const patchedSet = (...args) => {
		const prevState = get();
		console.groupCollapsed(
			`%cZustand Action @ ${new Date().toLocaleTimeString()}`,
			'color: #8B0000; font-weight: bold;'
		);
		console.log(
			'\n%cprev state',
			'color: #9E9E9E; font-weight: bold;',
			prevState
		);
		console.log(
			'%caction    ',
			'color: #03A9F4; font-weight: bold;',
			args,
			String(args)
		);
		set(...args);
		const nextState = get();
		console.log(
			'%cnext state',
			'color: #4CAF50; font-weight: bold;',
			nextState
		);
		console.groupEnd();
	};
	api.setState = patchedSet;
	return config(patchedSet, get, api);
};

export default loggerMiddleware;

function createZustand(enableLogging = false) {
	const loggerMiddleware = (config) => (set, get, api) => {
		const patchedSet = (...args) => {
			if (enableLogging) {
				const prevState = get();
				console.groupCollapsed(
					`%cZustand Action @ ${new Date().toLocaleTimeString()}`,
					'color: #8B0000; font-weight: bold;'
				);
				console.log(
					'%cprev state',
					'color: #9E9E9E; font-weight: bold;',
					prevState
				);
				console.log('%caction    ', 'color: #03A9F4; font-weight: bold;', args);
				set(args);
				const nextState = get();
				console.log(
					'%cnext state',
					'color: #4CAF50; font-weight: bold;',
					nextState
				);
				console.groupEnd();
			} else {
				set(args);
			}
		};
		api.setState = patchedSet;
		return config(patchedSet, get, api);
	};
	return function (initializer) {
		const withLogger = loggerMiddleware(initializer);
		return create(withLogger);
	};
}

export { createZustand };
