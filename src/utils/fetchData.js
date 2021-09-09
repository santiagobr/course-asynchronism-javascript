let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const fetchData = (url_api) => {
  return new Promise((resolve, reject) => {
    const xhttp = new XMLHttpRequest()
    xhttp.open('GET', url_api, true)
    xhttp.onreadystatechange = () => {
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
        xhttp.status === 200
          ? resolve(JSON.parse(xhttp.responseText))
          : reject(new Error('Error', url_api))
      }
    }
    xhttp.send()
  })
}

module.exports = fetchData
