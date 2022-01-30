const tools = {
  add: require('./add'),
  deploy: require('./deploy')
}

const [execPath, execFile, name, ...args] = process.argv

if (tools[name]) {
  if (tools[name](...args)) {
    console.log('Success')
    return 0
  }
}
else
  console.error(`Command not found: '${name}'\nAvailable commandes:${Object.keys(tools).map(t => `\n\t- ${t}`).join('')}`)
return 1
