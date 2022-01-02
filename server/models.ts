import 'dotenv/config'
import { Sequelize, Model, DataTypes } from 'sequelize'

const isProduction = process.env.NODE_ENV === 'production'

export const sequelize = new Sequelize(
  isProduction
    ? process.env.DATABASE_URL || ''
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
)

interface UrlInstance extends Model {
  url: string
}

export const URL = sequelize.define<UrlInstance>('urls', {
  url: DataTypes.STRING,
})

sequelize.sync({ alter: true })
