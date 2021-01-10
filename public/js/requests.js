function registerClient() {
   var form = $("#form-register-client");
   var formData = getFormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "register/client/",

      success: res => {
         setSession(res);
         var url = "./index.html";
         showMessageAndRedirect(res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function registerMerchant() {
   var form = $("#form-register-merchant")[0];
   var formData = new FormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: urlApi + "register/merchant/",

      success: res => {
         var url = "./index.html";
         showMessageAndRedirect(res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function registerDriver() {
   var form = $("#form-register-driver")[0];
   var formData = new FormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: urlApi + "register/driver/",

      success: res => {
         var url = "./index.html";
         showMessageAndRedirect(res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function registerAdmin() {
   var form = $("#form-register-admin");
   var formData = getFormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "register/admin/",

      success: res => {
         var url = "./index.html";
         showMessageAndRedirect(res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function login() {
   var form = $("#form-login");
   var formData = getFormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "login/",

      success: res => {
         setSession(res);
         var url = "./index.html";
         showMessageAndRedirect(res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function createProduct() {
   var form = $("#form-create-product")[0];
   var formData = new FormData(form);
   var token = sessionStorage.getItem("token");

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      processData: false,
      type: "post",
      url: urlApi + "products/create/",

      success: res => {
         var redirectPage = "../index.html";
         showSuccessMessage(res.message, redirectPage);
      },
      error: err => {
         console.log(err.responseJSON.message);
      }
   });
}