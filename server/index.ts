import express from 'express'
import bodyParser from 'body-parser'
import { URL } from './models'
import url from './features/url'

const app = express()
const port = process.env.PORT || 3001

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.route('/api/urls').get(async (req, res) => {
  res.status(200).json(await URL.findAll({ raw: true }))
})

app.route('/api/url').post(async (req, res) => {
  const result = await url.create(req.body.url)
  res.status(result.code === 1000 ? 201 : 200).json(result)
})

app.route('/:id').get(async (req, res) => {
  const target = await URL.findOne({ where: { id: req.params.id } })
  target
    ? res.status(301).render('template', { id: target.id, url: target.url })
    : res.status(404).render('404')
})
