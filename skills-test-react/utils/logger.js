
const levels = {
  error: 'error',
  warn: 'warn',
  info: 'log',
  debug: 'debug',
};
const logger = {
  error: (msg) => console[levels.error](msg),
  warn: (msg) => console[levels.warn](msg),
  info: (msg) => console[levels.info](msg),
  debug: (msg) => console[levels.debug](msg),
};
export default logger;

