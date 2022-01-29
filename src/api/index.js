const api = {
  getJSON: async name => {
    const response = await fetch(`${window.location.pathname}/jsons/${name}.json`, {
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    })
    const json = await response.json()
    return (json)
  }
}

export default api
