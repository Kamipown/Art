const express = require('express')
const path = require('path')
const fs = require('fs-extra')

const Api = require('./api')

const app = express()

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + '/../dist'))

app.use('/api', Api)

app.get('*', (req, res) => {
  console.log('Screen requested')
  console.log(req.originalUrl)
  res.sendFile(path.join(__dirname + '/../dist/index.html'))
})

app.listen(3000, async () => {
  app.set('images', await fs.readJson(path.join(__dirname + '/../public/jsons/images.json')))
  app.set('projects', await fs.readJson(path.join(__dirname + '/../public/jsons/projects.json')))
  app.set('sessions', await fs.readJson(path.join(__dirname + '/../public/jsons/sessions.json')))
  console.log(`[${(new Date()).toLocaleTimeString()}] Listening at http://localhost:${3000}`)
})
