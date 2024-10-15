// customLogger.js

const originalConsole = {
  log: console.log.bind(console),
  error: console.error.bind(console),
  warn: console.warn.bind(console),
  info: console.info.bind(console),
  debug: console.debug.bind(console),
};

const logger = (debug = true) => {
  console.log = (...args) => {
    if (debug) {
      originalConsole.log(...args);
    }
  };

  console.error = (...args) => {
    if (debug) {
      originalConsole.error(...args);
    }
  };

  console.warn = (...args) => {
    if (debug) {
      originalConsole.warn(...args);
    }
  };

  console.info = (...args) => {
    if (debug) {
      originalConsole.info(...args);
    }
  };

  console.debug = (...args) => {
    if (debug) {
      originalConsole.debug(...args);
    }
  };
};

// Export the custom logger and original console methods
export { logger, originalConsole };
