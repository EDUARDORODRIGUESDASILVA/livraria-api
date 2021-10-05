
import dotenv from 'dotenv'
import clienteService from '../services/cliente.service.js'
dotenv.config()

async function basicAuth (req, res, next) {
  if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
    return res.status(401).json({ error: 'Missing Authorization Header' })
  }

  const base64Credentials = req.headers.authorization.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  const isAdmin = authAdmin(username, password)

  if (isAdmin) {
    global.logger.info('Logged as admin')
    req.user = { isAdmin }
    return next()
  }

  const user = JSON.parse(JSON.stringify(await clienteService.authenticateCliente(username, password)))
  console.log('user', user)
  if (!user) {
    user.isAdmin = false
    global.logger.info(`Invalid Authentication as ${username}`)
    return res.status(401).json({ message: 'Invalid Authentication Credencials' })
  }

  req.user = user
  return next()
}

function authAdmin (username, password) {
  const adminUser = process.env.ROOT_USER
  const adminPassword = process.env.ROOT_PASS

  if (adminUser === username && adminPassword === password) {
    return true
  }
  return false
}

export { basicAuth }
