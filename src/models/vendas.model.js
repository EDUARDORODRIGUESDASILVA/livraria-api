import { Sequelize } from 'sequelize'
import db from '../repositories/db.js'
import Cliente from './clientes.model.js'
import Livro from './livros.model.js'

const Venda = db.define(
  'vendas',
  {
    vendaId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    valor: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    data: {
      type: Sequelize.DATE,
      allowNull: false
    },
    clienteId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    livroId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  },
  { underscored: true }
)
Venda.belongsTo(Cliente, { foreignKey: 'cliente_id' })
// Venda.hasOne(Cliente)

Venda.belongsTo(Livro, { foreignKey: 'livro_id' })
// Venda.hasOne(Livro)

export default Venda
