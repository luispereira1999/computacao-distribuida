function registerClient() {
   var form = $("#form-register-client");
   var formData = getFormData(form);

   // pedido ao servidor
   $.post("http://localhost:4000/api/register/client/", formData).done((res) => {
      console.log(res);
   }).fail((err) => {
      console.log(err.responseJSON.error);
   });
}


function registerMerchant() {
   var form = document.querySelector("form");
   formData = new FormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: "http://localhost:4000/api/register/merchant/",

      success: (res) => {
         console.log(res);
      },
      error: (err) => {
         console.log(err.responseJSON.error);
      }
   });
}


function registerDriver() {
   var form = document.querySelector("form");
   formData = new FormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: "http://localhost:4000/api/register/driver/",

      success: (res) => {
         console.log(res);
      },
      error: (err) => {
         console.log(err.responseJSON.error);
      }
   });
}


function registerAdmin() {
   var form = $("#form-register-admin");
   var formData = getFormData(form);
 
   // pedido ao servidor
   $.post("http://localhost:4000/api/register/admin/", formData).done((res) => {
      console.log(res);
   }).fail((err) => {
      console.log(err.responseJSON.error);
   });
}


function getFormData(form) {
   var unindexedData = form.serializeArray();
   var indexedData = {};

   $.map(unindexedData, function (n) {
      indexedData[n["name"]] = n["value"];
   });

   return indexedData;
}