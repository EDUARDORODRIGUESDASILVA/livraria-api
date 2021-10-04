import express from 'express'
import winston from 'winston'
import sync from './repositories/db.sync.js'

import clientesRouter from './routes/clientes.routes.js'
import autorRouter from './routes/autor.routes.js'
import livrosRouter from './routes/livros.routes.js'
import vendasRouter from './routes/vendas.routes.js'

import { handleError } from './util/error.handler.js'

const app = express()

global.logger = winston.createLogger({
  level: 'silly',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: './logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: './logs/combined.log' })
  ]
})

if (process.env.NODE_ENV !== 'production') {
  global.logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }))
}

app.use(express.json())
app.use(sync)
app.get('/', (req, res) => {
  res.send('Bootcamp IGTI: Desenvolvedor Node JS - Desafio Final. Bem vindo à livraria-api.')
})

app.use('/cliente', clientesRouter)
app.use('/autor', autorRouter)
app.use('/livro', livrosRouter)
app.use('/venda', vendasRouter)

app.use(handleError)

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    statusCode: 500,
    message: 'Ocorreu um erro, tente novamente mais tarde.'
  })
  global.logger.error({ erro: JSON.stringify(err) })
})

app.listen(3000, () => {
  global.logger.info('API Stared')
})
