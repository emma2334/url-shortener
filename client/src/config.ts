import 'dotenv/config'

const config: { [key: string]: any } = {
  development: { apiBase: 'http://localhost:3001' },
  production: { apiBase: process.env.PUBLIC_URL }
}

export default config[process.env.NODE_ENV]
