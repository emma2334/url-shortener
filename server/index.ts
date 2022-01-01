import express from 'express'
import bodyParser from 'body-parser'
import pool from './config'

const app = express()
const port = process.env.PORT || 3001

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

app.route('/urls').get((req, res) => {
  pool.query('SELECT * FROM urls', (error, results) => {
    if (error) throw error
    res.status(200).json(results.rows)
  })
})
