// const get = async path => await fetch(`/api${path}`, {
//   method: "GET",
//   headers: {
//     "Content-type": "application/json"
//   }
// })

const post = async (path, data) => await fetch(`/api${path}`, {
  method: "POST",
  body: JSON.stringify(data),
  headers: {
    "Content-type": "application/json"
  }
})

const api = {
  getJSON: async name => {
    const response = await fetch(`/jsons/${name}.json`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    const json = await response.json()
    return (json)
  },
  addImages: async data => {
    const response = await post('/addImages', data)
    console.log(response)
    return (response)
  },
  // add: async data => {
  //   const response = await post('/add', data)
  //   return (response)
  // },
  addSession: async data => {
    const response = await post('/addSession', data)
    return (response)
  },
  addProject: async data => {
    const response = await post('/addProject', data)
    return (response)
  }
}

export default api
