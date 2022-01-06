import express from 'express'
import cors from 'cors'
import path from 'path'
import URL from './features/url'

const app = express()
const port = process.env.PORT || 3001

app.set('view engine', 'pug')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../client/build')))
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.route('/api/urls').get(async (req, res) => {
  res.status(200).json(await URL.find())
})

app.route('/api/url').post(async (req, res) => {
  const result = await URL.create(req.body.url, req.headers.host)
  res.status(result.status === 'successed' ? 200 : 400).json(result)
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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
