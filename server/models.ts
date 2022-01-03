import 'dotenv/config'
import { Sequelize, Model, DataTypes } from 'sequelize'

const isProduction = process.env.NODE_ENV === 'production'

export const sequelize = new Sequelize(
  isProduction
    ? process.env.DATABASE_URL || ''
    : `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
)

interface UrlInstance extends Model {
  id: number;
  url: string;
  view: number;
  ogTitle?: string;
  ogType?: string;
  ogImage?: string;
  ogUrl?: string;
  ogDescription?: string;
  favicon?: string;
}

export const URL = sequelize.define<UrlInstance>('urls', {
  url: { type: DataTypes.STRING, allowNull: false },
  view: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  ogTitle: DataTypes.STRING,
  ogType: DataTypes.STRING,
  ogImage: DataTypes.STRING,
  ogUrl: DataTypes.STRING,
  ogDescription: DataTypes.TEXT,
  favicon: DataTypes.STRING
})

sequelize.sync({ alter: true })
