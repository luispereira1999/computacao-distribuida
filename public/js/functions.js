function getFormData(form) {
   var unindexedData = form.serializeArray();
   var indexedData = {};

   $.map(unindexedData, function (n) {
      indexedData[n["name"]] = n["value"];
   });

   return indexedData;
}


function setSession(res) {
   sessionStorage.setItem("token", res.token);
   sessionStorage.setItem("id", res.data.id);
   sessionStorage.setItem("username", res.data.username);
   sessionStorage.setItem("name", res.data.name);
   sessionStorage.setItem("email", res.data.email);
   sessionStorage.setItem("type", res.data.type);
}


function showMessage(text) {
   alertify.set("notifier", "position", "top-center");
   alertify.notify(text, "error");
}


function showMessageAndRedirect(text, url) {
   alertify.alert().setting({
      "title": "Sucesso",
      "label": "Confirmar",
      "message": text,
      "onok": () => redirectPage(url)
   }).show();
}


function redirectPage(url) {
   location.href = url;
}


function getStatus(err) {
   return err.status;
}