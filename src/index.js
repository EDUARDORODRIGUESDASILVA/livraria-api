/* eslint-disable import/extensions */
import express from 'express';
import winston from 'winston';
import sync from './repositories/db.sync.js';

import { handleError } from './util/error.handler.js';

const app = express();

global.logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  global.logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

app.use(express.json());
app.use(sync);
// app.use('/proprietario', proprietariosRouter);
// app.use('/animal', animaisRouter);
// app.use('/servico', servicosRouter);
// app.use('/post', postsRouter);
// app.use('/comentario', comentariosRouter);

app.get('/', (req, res) => {
  res.send('Bootcamp IGTI: Desenvolvedor Node JS - Desafio Final. Bem vindo à livraria-api.');
});

app.use((err, req, res) => {
  handleError(err, res);
});

app.listen(3000, () => {
  global.logger.info('API Stared');
});
