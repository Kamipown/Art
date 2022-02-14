const headers = {
  "Content-type": "application/json"
}

const get = async (uri, params) => {
  let path = window.location.pathname + uri
  if (params)
    path += '?' + (new URLSearchParams(params)).toString()
  const response = await fetch(path, { method: "GET", headers })
  return response
}

const post = async (uri, data) => {
  const path = window.location.pathname + uri
  const body = JSON.stringify(data)
  const response = await fetch(path, { method: "POST", headers, body })
  return response.json()
}

const api = {
  getJSON: async name => {
    const response = await get(`/jsons/${name}.json`)
    const json = await response.json()
    return (json)
  }
}

export default api
