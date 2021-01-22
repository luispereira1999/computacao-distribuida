let currentOrigin = window.location.origin;

if (currentOrigin == "file://")
   var urlApi = "http://localhost:8080/api/";
else if (currentOrigin == "http://localhost:8080")
   var urlApi = "http://localhost:8080/api/";
else
   var urlApi = "http://picandgo.westeurope.cloudapp.azure.com/api/";
