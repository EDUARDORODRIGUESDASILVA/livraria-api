import db from './db.js'
import Autor from '../models/autores.model.js'
import Cliente from '../models/clientes.model.js'
import Livro from '../models/livros.model.js'
import Venda from '../models/vendas.model.js'

async function start (req, res, next) {
  try {
    await db.authenticate()
    global.logger.info('Connection has been established successfully.')
  } catch (error) {
    global.logger.info('Unable to connect to the database:', error)
  }

  try {
    await Autor.sync()
    await Cliente.sync()
    await Livro.sync()
    await Venda.sync()
    await db.sync()
  } catch (error) {
    global.logger.info('Unable to sync database', error)
  }
  next()
}
export default start
