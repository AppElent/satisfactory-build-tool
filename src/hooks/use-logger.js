import { useEffect, useState } from 'react';
import useLocalStorage from './use-local-storage';

// Custom hook for logging
const useLogger = (initialDebug) => {
  const [debug, setDebug] = useLocalStorage('debug', initialDebug);

  useEffect(() => {
    setDebug(debug);
  }, [setDebug, debug]);

  // Save the original console methods and bind them to window.console
  const [originalConsole] = useState({
    log: window.console.log.bind(window.console),
    error: window.console.error.bind(window.console),
    warn: window.console.warn.bind(window.console),
    info: window.console.info.bind(window.console),
    debug: window.console.debug.bind(window.console),
  });

  useEffect(() => {
    // Override all the console methods
    window.console.log = (...args) => {
      if (debug) {
        originalConsole.log(...args);
      }
    };

    window.console.error = (...args) => {
      if (debug) {
        originalConsole.error(...args);
      }
    };

    window.console.warn = (...args) => {
      if (debug) {
        originalConsole.warn(...args);
      }
    };

    window.console.info = (...args) => {
      if (debug) {
        originalConsole.info(...args);
      }
    };

    window.console.debug = (...args) => {
      if (debug) {
        originalConsole.debug(...args);
      }
    };

    // Cleanup on unmount: restore the original console methods
    return () => {
      window.console.log = originalConsole.log;
      window.console.error = originalConsole.error;
      window.console.warn = originalConsole.warn;
      window.console.info = originalConsole.info;
      window.console.debug = originalConsole.debug;
    };
  }, [originalConsole, debug]);

  // Function to force log without checking debug setting
  const forceLog = {
    log: (...args) => originalConsole.log(...args),
    error: (...args) => originalConsole.error(...args),
    warn: (...args) => originalConsole.warn(...args),
    info: (...args) => originalConsole.info(...args),
    debug: (...args) => originalConsole.debug(...args),
  };

  return [debug, setDebug, forceLog];
};

export default useLogger;
