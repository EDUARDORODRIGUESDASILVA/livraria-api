import { Sequelize } from 'sequelize'
import db from '../repositories/db.js'
import Autor from './autores.model.js'

const Livro = db.define(
  'livros',
  {
    livroId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    valor: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    estoque: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    autorId: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  { underscored: true }
)

Livro.belongsTo(Autor, { foreignKey: 'autor_id' })
// Livro.hasOne(Autor)

export default Livro
