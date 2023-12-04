import pino from 'pino';
import {context} from '../utills/async-context/async-context';
import environmentConfig from './environment.config';

const hideLogs = true;

const logger = pino({
  level: environmentConfig.nodeEnv === 'development' ? 'debug' : 'info',
  enabled: !hideLogs,
  // transport: {
  //   target: 'pino-pretty',
  // },
  // name: __filename,
  mixin() {
    return {
      requestId: context.getStore()?.requestId,
    };
  },
});

export default logger;
