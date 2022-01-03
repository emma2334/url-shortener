import express from 'express'
import bodyParser from 'body-parser'
import URL from './features/url'

const app = express()
const port = process.env.PORT || 3001

app.set('view engine', 'pug')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.route('/api/urls').get(async (req, res) => {
  res.status(200).json(await URL.find())
})

app.route('/api/url').post(async (req, res) => {
  const result = await URL.create(req.body.url)
  res.status(result.code === 1000 ? 201 : 200).json(result)
})

app.route('/:id').get(async (req, res) => {
  const target = await URL.findOne({ id: req.params.id })
  target.code === 1004 && target.result
    ? res.status(200).render('template', {
      id: target.result.id,
      url: target.result.url,
      ogTitle: target.result.ogTitle,
      ogType: target.result.ogType,
      ogImage: target.result.ogImage,
      ogUrl: target.result.ogUrl,
      ogDescription: target.result.ogDescription,
      favicon: target.result.favicon
    })
    : res.status(404).render('404')
})
