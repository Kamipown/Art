const path = require('path')
const fs = require('fs-extra')

const deploy = async () => {
  try {
    const from = '../build'
    const to = '../docs'
    const items = ['css', 'js', 'favicon.png', 'index.html']

    for (let item of items) {
      await fs.remove(path.join(__dirname, `${to}/${item}`))
      await fs.copy(
        path.join(__dirname, `${from}/${item}`),
        path.join(__dirname, `${to}/${item}`)
      )
    }
  }
  catch (error) {
    console.error(error)
    return false
  }
  return true
}

module.exports = deploy
