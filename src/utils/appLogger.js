/* eslint-disable no-undef */
import log from 'loglevel';

const isProduction = process.env.NODE_ENV === 'production';

const appLogger = log;

if (isProduction) {
	appLogger.setLevel('WARN');
} else {
	appLogger.setLevel('TRACE');
}

// false added so as to not persist logs in localstorage

// appLogger.warn(`Inside app logger...`);
// appLogger.info(`Inside app logger...`);
// appLogger.trace(`Inside app logger...`);
// appLogger.debug(`Inside app logger...`);

export default appLogger;

/**
 * 
 * Documentation Link - https://github.com/pimterry/loglevel
 * 
 *  LOG LEVELs IN LOGLEVEL
 *
 *  1. TRACE
 *  2. DEBUG
 *  3. INFO
 *  4. WARN
 *  5. ERROR
 
    # log.setDefaultLevel(level)
        This sets the current log level only if one has not been persisted and can’t be loaded. 
        This is useful when initializing modules or scripts; if a developer or user has previously called setLevel(), 
        this won’t alter their settings.
 */

/**
 * TO MODIFY DEFAULT loglevel FUNCTIONALITY
 */

/* var originalFactory = log.methodFactory;
log.methodFactory = function (methodName, logLevel, loggerName) {
	var rawMethod = originalFactory(methodName, logLevel, loggerName);

	return function () {
		var messages = ['Newsflash:'];
		Array.from(arguments).forEach((arg) => messages.push(arg));
		rawMethod.apply(undefined, messages);
	};
};
log.rebuild(); */
