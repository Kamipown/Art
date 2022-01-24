const loadImage = file => new Promise((resolve, reject) => {

  const reader = new FileReader()
  const img = new Image()
  // const canvas = document.createElement('canvas')
  // const ctx = canvas.getContext('2d')

  reader.addEventListener("load", () => {
    img.addEventListener("load", () => {
      // canvas.width = img.width
      // canvas.height = img.height
      // ctx.drawImage(img, 0, 0)
      // const imageData = ctx.getImageData(0, 0, img.width, img.height).data
      resolve({
        name: file.name,
        size: file.size,
        date: file.lastModifiedDate,
        src: reader.result,
        // imageData,
        width: img.width,
        height: img.height
      })
    })
    img.src = reader.result
  }, false)
  reader.readAsDataURL(file)
})

export default loadImage
