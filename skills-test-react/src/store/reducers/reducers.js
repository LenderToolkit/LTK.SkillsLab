
import logger from './logger';
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'ADD':
      logger.info('ADD action dispatched');
      return state + 1;
    default:
      return state;
  }
};
