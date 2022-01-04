import express from 'express'
import cors from 'cors'
import URL from './features/url'

const app = express()
const port = process.env.PORT || 3001

app.set('view engine', 'pug')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
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
  const target = await URL.view(req.params.id)
  target.code === 1008 && target.data
    ? res.status(200).render('template', {
      id: target.data.id,
      url: target.data.url,
      ogTitle: target.data.ogTitle,
      ogType: target.data.ogType,
      ogImage: target.data.ogImage,
      ogUrl: target.data.ogUrl,
      ogDescription: target.data.ogDescription,
      favicon: target.data.favicon
    })
    : res.status(404).render('404')
})
