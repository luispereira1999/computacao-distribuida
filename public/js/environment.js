let currentOrigin = window.location.origin;

// define a URL da API dependendo do servidor atual
if (currentOrigin == "file://" || currentOrigin == "http://localhost:8080")  // servidor local
   var urlApi = "http://localhost:8080/api/";
else  // servidor externo
   var urlApi = "http://picandgo.westeurope.cloudapp.azure.com/api/";  // exemplo