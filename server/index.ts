import express from 'express'
import bodyParser from 'body-parser'
import { URL } from './models'
import status, { code } from './status'

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.route('/api/urls').get(async (req, res) => {
  res.status(200).json(await URL.findAll({ raw: true }))
})

app.route('/api/url').post((req, res) => {
  if (!req.body.url) {
    res.status(200).json(status(code.SHORTEN_URL.CREATE_FAIL, '網址不能為空'))
    return
  }

  URL.findOrCreate({
    where: { url: req.body.url }
  }).then((result) => {
    res
      .status(201)
      .json(status(code.SHORTEN_URL.CREATE_SUCCESS, { result: result[0] }))
  })
})
