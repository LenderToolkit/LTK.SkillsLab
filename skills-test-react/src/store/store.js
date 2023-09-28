
import { createStore } from 'redux';
import counterReducer from './reducers';
import logger from './logger';
const store = createStore(counterReducer);
logger.info('Redux store created');

