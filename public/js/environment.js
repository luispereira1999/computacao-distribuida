let currentOrigin = window.location.origin;

if (currentOrigin == "file://")
   var urlApi = "http://localhost:4000/api/";
else
   var urlApi = "https://picandgo.azurewebsites.net/api/";