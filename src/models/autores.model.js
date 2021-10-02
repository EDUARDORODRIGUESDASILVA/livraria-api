import { Sequelize } from 'sequelize'
import db from '../repositories/db.js'

const Autor = db.define(
  'autores',
  {
    autorId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    telefone: {
      type: Sequelize.STRING,
      allowNull: false
    }
  },
  { underscored: true }
)
// Animal.belongsTo(Proprietario, { foreignKey: 'proprietario_id' });
// Animal.hasOne(Proprietario);

export default Autor
