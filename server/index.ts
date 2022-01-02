import express from 'express'
import bodyParser from 'body-parser'
import { URL } from './models'

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.route('/urls').get(async (req, res) => {
  res.status(200).json(await URL.findAll({ raw: true }))
})
