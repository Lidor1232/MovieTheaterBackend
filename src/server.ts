import environmentConfig from './config/environment.config';
import app from './app';
import mongoose from 'mongoose';
import logger from './config/logger';

mongoose
  .connect(environmentConfig.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    const dbConnectionLog = 'DB connection successful!';
    console.log(dbConnectionLog);
    logger.info(dbConnectionLog);
  });

app.listen(environmentConfig.port, () => {
  const runningLog = `App ${environmentConfig.nodeEnv} is running on port: ${environmentConfig.port}`;
  console.log(runningLog);
});
