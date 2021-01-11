// REGISTER
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
            showErrorMessage(err.responseJSON.message);
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
            showErrorMessage(err.responseJSON.message);
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
            showErrorMessage(err.responseJSON.message);
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
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


// LOGIN
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
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


// USERS
function getUserData() {
   var div = $("#user-data");

   var contentInsideDiv = checkContentInsideTable(div.html());
   if (contentInsideDiv) {
      destroyElement(div.find("label"));
      destroyElement(div.find("input"));
   }

   var token = sessionStorage.getItem("token");

   // pedido ao servidor
   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "post",
      url: urlApi + "users/account/",

      success: res => {
         var i = -1;
         for (const [key, value] of Object.entries(res.data)) {
            var label = $("<label>" + key + "</label>");
            var input = $("<input type='text' value='" + value + "' />");
            div.append(label);
            div.append(input);

            if (i % 2 == 0) {
               var br = $("<br />");
               div.append(br);
            }
            i++;
         }
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}

function getUsersNotAccepted() {
   var thead = $("#table-users-not-accepted thead");
   var tbody = $("#table-users-not-accepted tbody");

   var contentInsideTable = checkContentInsideTable(tbody.html());
   if (contentInsideTable) {
      destroyElement(thead.find("tr"));
      destroyElement(tbody.find("tr"));
   }

   var token = sessionStorage.getItem("token");

   // pedido ao servidor
   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/not-accepted/",

      success: res => {
         var table = $("#table-users-not-accepted");
         createTableWithData(res.data, table);
         addButtonColumnsToTable(table);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}

function acceptUser(currentButtonClicked) {
   var token = sessionStorage.getItem("token");
   var userId = currentButtonClicked.parent().parent().children(".td-id").text();

   // pedido ao servidor
   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "put",
      url: urlApi + "users/accept/" + userId,

      success: res => {
         $("#button-get-users-not-accepted").trigger("click");
         showSuccessMessage(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


// PRODUCTS
function getProduct() {
   var token = sessionStorage.getItem("token");

   // pedido ao servidor
   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "products/" + 1,

      success: res => {
         var form = $("#form-edit-product-data");
         setFormData(res.data, form);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorMessage(err.responseJSON.message);
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
         showSuccessMessage(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}

function editProductData() {
   var form = $("#form-edit-product-data");
   var formData = getFormData(form);

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      type: "patch",
      url: urlApi + "products/edit-data/2",

      success: res => {
         var url = "./index.html";
         showMessageAndRedirect(res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorMessage(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}