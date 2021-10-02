import db from './db.js';

async function start(req, res, next) {
  try {
    await db.authenticate();
    global.logger.info('Connection has been established successfully.');
  } catch (error) {
    global.logger.info('Unable to connect to the database:', error);
  }
  await db.sync();

  next();
}
export default start;
