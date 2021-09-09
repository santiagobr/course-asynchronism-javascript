let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
let API = 'https://rickandmortyapi.com/api/character/'

function fetchData(url_api, callback) {
  let xhttp = new XMLHttpRequest()
  xhttp.open('GET', url_api, true)
  xhttp.onreadystatechange = function (event) {
    /* Estado de las peticiones: 
        
        0: Inicializado, aún no se llama a Open
        1: Está cargando
        2: Ya se ha cargado
        3: Si hay alguna información para descargar
        4: Se ha completado la petición*/
    if (xhttp.readyState === 4) {
      /* Estado en el que se encuentra la petición:
      
         ESTADO 1xx (100 - 199): Indica que la petición esta siendo procesada.
         ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
         ESTADO 3xx (300 - 399): Indica que hay que tomar acciones adicionales para completar la solicitud. Por lo general indican redireccionamiento.
         ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
         ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
      */
      if (xhttp.status === 200) {
        /* Se debe parsear lo que se recibe a JSON porque la información que llega es un texto */
        callback(null, JSON.parse(xhttp.responseText))
      } else {
        const error = new Error('Error' + url_api)
        return callback(error, null)
      }
    }
  }
  xhttp.send()
}

fetchData(API, function (error1, data1) {
  if (error1) return console.error(error1)
  fetchData(API + data1.results[0].id, function (error2, data2) {
    if (error2) return console.error(error2)
    fetchData(data2.origin.url, function (error3, data3) {
      if (error3) return console.error(error3)
      console.log(data1.info.count)
      console.log(data2.name)
      console.log(data3.dimension)
    })
  })
})
