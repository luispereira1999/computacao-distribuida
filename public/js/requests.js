// REGISTER
function registerClient() {
   var form = $("#form-register-client");
   var formData = getFormData(form);

   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "register/client/",

      success: res => {
         setCookie(res.token);
         for (const [key, value] of Object.entries(res.data))
            setCookie(key, value, 3);

         var url = "./index.html";
         showModalAndRedirect("Sucesso", res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
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

   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: urlApi + "register/merchant/",

      success: res => {
         var url = "./index.html";
         showModalAndRedirect("Sucesso", res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
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

   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      type: "post",
      url: urlApi + "register/driver/",

      success: res => {
         var url = "./index.html";
         showModalAndRedirect("Sucesso", res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
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

   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "register/admin/",

      success: res => {
         var url = "./index.html";
         showModalAndRedirect("Sucesso", res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
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

   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "login/",

      success: res => {
         setCookie("token", res.token, 3);
         for (const [key, value] of Object.entries(res.data))
            setCookie(key, value, 3);

         var url = "./index.html";
         showModalAndRedirect("Sucesso", res.message, url);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


// USERS
function getClientData() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/account/",

      success: res => {
         var html = getHtmlTitle(res.data);
         $("#title-info").append(html);

         var html = getHtmlClientData1(res.data);
         $("#user-data-1").append(html);
         var html = getHtmlClientData2(res.data);
         $("#user-data-2").append(html);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getMerchantData() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/account/",

      success: res => {
         var html = getHtmlTitle(res.data);
         $("#title-info").append(html);

         var html = getHtmlMerchantData1(res.data);
         $("#user-data-1").append(html);
         var html = getHtmlMerchantData2(res.data);
         $("#user-data-2").append(html);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getDriverData() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/account/",

      success: res => {
         var html = getHtmlTitle(res.data);
         $("#title-info").append(html);

         var html = getHtmlDriverData1(res.data);
         $("#user-data-1").append(html);
         var html = getHtmlDriverData2(res.data);
         $("#user-data-2").append(html);

         $("select").val(res.data.driving_license);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getAdminData() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/account/",

      success: res => {
         var html = getHtmlTitle(res.data);
         $("#title-info").append(html);

         var html = getHtmlAdminData1(res.data);
         $("#user-data-1").append(html);
         var html = getHtmlAdminData2(res.data);
         $("#user-data-2").append(html);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getMerchantsToIndex() {
   $.ajax({
      cache: false,
      type: "get",
      url: urlApi + "users/get-merchants/8",

      success: res => {
         for (var i = 0; i < 8; i++) {
            var html = getHtmlMerchantsInIndex(res.data[i]);
            $("#ul-get-merchants").append(html);
         }
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getMerchantsInMerchants() {
   $.ajax({
      cache: false,
      type: "get",
      url: urlApi + "users/get-merchants/50",

      success: res => {
         console.log(res.data)
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlMerchantsInMerchants(res.data[i]);
            $("#ul-merchants").append(html);
         }
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getUsersAccepted() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/accepted",

      success: res => {
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlAllUsers(res.data[i]);
            $("#table-users").append(html);
         }

         $(".type-user:contains('1')").text("Cliente");
         $(".type-user:contains('2')").text("Restaurante");
         $(".type-user:contains('3')").text("Condutor");
         $(".type-user:contains('4')").text("Admin");

         $("span[data-type~='1']").css("background-color", "#047a06");
         $("span[data-type~='1']").text("Definir Admin");
         $("span[data-type~='1']").addClass("set-admin");
         $("span[data-type~='2']").css("background-color", "#047a06");
         $("span[data-type~='2']").text("Definir Admin");
         $("span[data-type~='2']").addClass("set-admin");
         $("span[data-type~='3']").css("background-color", "#047a06");
         $("span[data-type~='3']").text("Definir Admin");
         $("span[data-type~='3']").addClass("set-admin");
         $("span[data-type~='4']").css("background-color", "#c33332");
         $("span[data-type~='4']").text("Remover Admin");
         $("span[data-type~='4']").addClass("remove-admin");

         $("span[data-type]").css("cursor", "pointer");

         $(".user-id:contains('" + getCookie("id") + "')").parent().hide();
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getUsersNotAccepted() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/not-accepted",

      success: res => {
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlAllUsersNotAccepted(res.data[i]);
            $("#table-users").append(html);
            var html = getHtmlModalUserDetail(res.data[i]);
            $("#modals-user-detail").append(html);
         }

         $(".type-user:contains('1')").text("Cliente");
         $(".type-user:contains('2')").text("Restaurante");
         $(".type-user:contains('3')").text("Condutor");
         $(".type-user:contains('4')").text("Admin");

         $("span[data-type]").css("background-color", "#047a06");
         $("span[data-type]").text("Aceitar");
         $("span[data-type]").addClass("accept");

         $("span[data-type]").css("cursor", "pointer");

         $(".user-id:contains('" + getCookie("id") + "')").parent().hide();

         $("div[data-driving-license~='1']").hide();
         $("div[data-driving-license~='2']").hide();
         $("div[data-driving-license~='4']").hide();
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function editUserData() {
   var form = $("#form-edit-user-data");
   var formData = getFormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "put",
      url: urlApi + "users/edit-data/",

      success: res => {
         setCookie(res.token);
         for (const [key, value] of Object.entries(res.data))
            setCookie(key, value, 3);

         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function editDrivingLicense() {
   var form = $("#form-edit-driving-license")[0];
   var formData = new FormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "users/edit-driving-license/",

      success: res => {
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function editPassword() {
   var form = $("#form-edit-password");
   var formData = getFormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "users/edit-password/",

      success: res => {
         setCookie(res.token);
         for (const [key, value] of Object.entries(res.data))
            setCookie(key, value, 3);

         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function editUserPhoto() {
   var form = $("#form-edit-user-photo")[0];
   var formData = new FormData(form);
   var file = $('#file-photo')[0].files[0];
   formData.append('file', file);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "users/edit-photo/",

      success: res => {
         setCookie(res.token);
         for (const [key, value] of Object.entries(res.data))
            setCookie(key, value, 3);

         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function deleteUser() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "delete",
      url: urlApi + "users/delete/",

      success: (res) => {
         logout(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function setAdmin(id) {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "users/set-admin/" + id,

      success: res => {
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function removeAdmin(id) {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "users/remove-admin/" + id,

      success: res => {
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function acceptUser(id) {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "users/accept/" + id,

      success: res => {
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


// PRODUCTS
function getProductsInAccount() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "products/",

      success: res => {
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlProductsInAccount(res.data[i]);
            $("#get-user-products").append(html);
         }
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getProductsToIndex() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "products/",

      success: res => {
         for (var i = 0; i < 6; i++) {
            var html = getHtmlProductsInIndex(res.data[i]);
            $("#ul-get-products").append(html);
         }

         $("#ul-get-products .restaurant-status:contains(' 0 ')").removeClass("open").addClass("close");
         $("#ul-get-products .restaurant-status:contains(' 0 ')").text("Esgotado");
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getProductById(currentButtonClicked) {
   var productId = currentButtonClicked.parent().parent().children(".td-id").text();

   $.ajax({
      cache: false,
      type: "get",
      url: urlApi + "products/" + productId,

      success: res => {
         console.log(res.data)
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
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
   var token = getCookie("token");

   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      headers: { Authorization: "Bearer " + token },
      type: "post",
      url: urlApi + "products/create/",

      success: res => {
         var modal = $("#div-create-product");
         closeModal(modal);
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
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
   var token = getCookie("token");

   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "put",
      url: urlApi + "products/edit-data/" + formData.id,

      success: res => {
         var modal = $("#div-edit-product-data");
         closeModal(modal);
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function editProductPhoto() {
   var form = $("#form-edit-product-photo")[0];
   var formData = new FormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "products/edit-photo/" + formData.get("id"),

      success: res => {
         var modal = $("#div-edit-product-photo");
         closeModal(modal);
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function deleteProduct(productId) {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "delete",
      url: urlApi + "products/delete/" + productId,

      success: res => {
         var modal = $("#id_product_confrmdiv");
         closeModal(modal);
         showModalAndRefresh(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


// ORDERS
function getUserOrders() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "orders/",

      success: res => {
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlUserOrders(res.data[i]);
            $("#get-user-orders").append(html);
            var html = getHtmlModalOrders(res.data[i]);
            $("#modals-orders").append(html);
         }

         $("span[data-accepted~='0']").css("background-color", "#1e73be");
         $("span[data-accepted~='0']").text("Pendente");
         $("span[data-accepted~='1']").css("background-color", "#047a06");
         $("span[data-accepted~='1']").text("Entregue");
         $("span[data-canceled~='1']").css("background-color", "#c33332");
         $("span[data-canceled~='1']").text("Cancelada");
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function getMerchantOrders() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "orders/merchant",

      success: res => {
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlMerchantOrders(res.data[i]);
            $("#table-orders").append(html);
            var html = getHtmlModalMerchantOrders(res.data[i]);
            $("#modals-merchant-orders").append(html);
         }

         $("[data-accepted~='0']").css("background-color", "#1e73be");
         $("[data-accepted~='0']").text("Pendente");
         $("[data-accepted~='1']").css("background-color", "#047a06");
         $("[data-accepted~='1']").text("Entregue");
         $("[data-canceled~='1']").css("background-color", "#c33332");
         $("[data-canceled~='1']").text("Cancelada");
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function createOrder(currentButtonClicked) {
   // var data = { "product_id":  };
   var token = getCookie("token");
   var data = { "product_id": currentButtonClicked.parent().parent().children(".td-id").text() };

   $.ajax({
      cache: false,
      data: data,
      headers: { Authorization: "Bearer " + token },
      type: "post",
      url: urlApi + "orders/create/",

      success: res => {
         openModal(res.message);
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}


function cancelOrder(currentButtonClicked) {
   var token = getCookie("token");
   var orderId = currentButtonClicked.parent().parent().children(".td-id").text();
   var productId = currentButtonClicked.parent().parent().children(".td-product_id").text();
   var data = { "order_id": orderId, "product_id": productId };

   $.ajax({
      cache: false,
      data: data,
      headers: { Authorization: "Bearer " + token },
      type: "delete",
      url: urlApi + "orders/cancel/",

      success: res => {
         openModal(res.message);
         $("#button-get-orders-from-user").trigger("click");
      },
      error: err => {
         var status = getStatus(err);

         if (status >= 400 && status <= 599 != 404)
            showErrorAlert(err.responseJSON.message);
         else if (status == 0 || status == 404) {
            var url = "./404.html";
            redirectPage(url);
         }
      }
   });
}