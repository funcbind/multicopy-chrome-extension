window._rollbarConfig = {
	accessToken: 'ACCESS_TOKEN',
	captureUncaught: true,
	captureUnhandledRejections: true,
	includeItemsInTelemetry: false,
	sendConfig: false,
	reportLevel: 'error',
	checkIgnore(isUncaught, args, payload) {
		return true;
	},
	itemsPerMinute: 1,
	maxItems: 5,
	scrubTelemetryInputs: true,
	autoInstrument: {
		network: false,
		log: false,
		dom: true,
		navigation: false,
		connectivity: false,
		contentSecurityPolicy: false,
		errorOnContentSecurityPolicy: false,
	},
	payload: {
		environment: 'testenv',
		// context: 'rollbar/test'
		client: {
			javascript: {
				code_version: '1.0',
				// source_map_enabled: true,
				// guess_uncaught_frames: true
			},
		},
	},
};
