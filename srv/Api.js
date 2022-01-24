const express = require('express')
const path = require('path')
const fs = require('fs-extra')

const Api = express.Router()

Api.get('/test', (_, res) => res.send({ data: 'Yo' }))

// Api.get('/json', (req, res) => {
//   res.send({ data: 'loool' })
// })

Api.post('/add', async (req, res) => {
  console.log(req.body)
  res.sendStatus(200)
})

Api.post('/addImages', async (req, res) => {
  try {
    const items = req.body
    const images = req.app.get('images')
    for (let item of items.sort((a, b) => a.from < b.from)) {
      images.push({
        id: images.length ? images[images.length - 1].id + 1 : 1,
        from: item.from,
        to: item.to
      })
    }
    await fs.writeJSON(path.join(__dirname + '/../public/jsons/images.json'), sessions)
    console.log(images)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500) // change
  }
})

Api.post('/addSession', async (req, res) => {
  console.log(req.body)
  try {
    const sessions = req.app.get('sessions')
    sessions.push({
      id: sessions.length ? sessions[sessions.length - 1].id + 1 : 1,
      ...req.body
    })
    await fs.writeJSON(path.join(__dirname + '/../public/jsons/sessions.json'), sessions)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

Api.post('/addProject', async (req, res) => {
  console.log(req.body)
  try {
    const projects = req.app.get('projects')
    projects.push({
      id: projects.length ? projects[projects.length - 1].id + 1 : 1
    })
    await fs.writeJSON(path.join(__dirname + '/../public/jsons/projects.json'), projects)
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = Api
