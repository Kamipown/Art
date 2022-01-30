const { promisify } = require('util')
const path = require('path')
const prompt = require('prompt')
const fs = require('fs-extra')
const sizeOf = promisify(require('image-size'))
const dateFnsAdd = require('date-fns/add')

const getData = async () => await fs.readJSON(path.join(__dirname, '../docs/jsons/data.json'))

const getNewId = data => {
  let id = -1
  for (let month of data)
    month.images.map(img => {
      if (id < img.id)
        id = img.id
    })
  return id + 1
}

const schema = {
  properties: {
    date: {
      type: 'string',
      pattern: /^(\d{4})(-| )([01]\d)(-| )([0-3]\d)$/,
      required: false,
      default: new Date().toISOString().slice(0, 10)
    },
    time: {
      type: 'string',
      pattern: /^([0-2]\d)(:| )([0-5]\d)$/,
      required: false,
      default: '18:00'
    },
    duration: {
      type: 'number',
      pattern: /^\d{1,4}$/,
      required: false,
      default: 60
    }
  }
}

const add = async filepath => {
  try {
    if (!(await fs.pathExists(filepath)))
      throw (`Invalid path:\n${filepath}`)

    const { width, height, type } = await sizeOf(filepath)
    const { date, time, duration } = await prompt.get(schema)

    const data = await getData()

    const id = getNewId(data)
    const dateFrom = new Date(`${date.replace(/ /g, '-')}T${time.replace(/ /g, ':')}:00.000Z`)
    const dateTo = dateFnsAdd(dateFrom, { minutes: duration })
    const from = dateFrom.toISOString()
    const to = dateTo.toISOString()
    const month = from.slice(0, 7)

    await fs.ensureDir(path.join(__dirname, `../docs/files/${month}`))
    await fs.copy(filepath, path.join(__dirname, `../docs/files/${month}/${id}.${type}`))

    const image = { id, from, to, width, height, type }

    const index = data.findIndex(m => m.date === month)
    if (index === -1) {
      data.push({
        date: month,
        images: [image]
      })
      data.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    else
      data[index].images = [image, ...data[index].images].sort((a, b) => new Date(b.from) - new Date(a.from))

    await fs.writeJSON(path.join(__dirname, '../docs/jsons/data.json'), data)
  }
  catch (error) {
    console.error(error)
    return false
  }
  return true
}

module.exports = add
