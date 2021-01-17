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
function getUserData() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/account/",

      success: res => {
         var html = getHtmlTitle(res.data);
         $("#title-info").append(html);

         var html = getHtmlUserDataInAccount1(res.data);
         $("#user-data-1").append(html);
         var html = getHtmlUserDataInAccount2(res.data);
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

function editUserData() {
   var form = $("#form-edit-user-data");
   var formData = getFormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
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

function editPassword() {
   var form = $("#form-edit-password");
   var formData = getFormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "put",
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
      type: "put",
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

      success: () => {
         logout();
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
   var thead = $("#table-users-not-accepted thead");
   var tbody = $("#table-users-not-accepted tbody");

   var htmlExists = checkHtmlExists(tbody.html());
   if (htmlExists) {
      destroyElement(thead.find("tr"));
      destroyElement(tbody.find("tr"));
   }

   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "users/not-accepted/",

      success: res => {
         var table = $("#table-users-not-accepted");
         createTableWithData(res.data, table);

         var elements = [{
            "selector": ".td-accept",
            "table": table,
            "th": $("<th>Aceitar</th>"),
            "td": $("<td class='td-accept'></td>"),
            "button": $("<button class='button-accept-user'>Aceitar</button>"),
         }, {
            "selector": ".td-decline",
            "table": table,
            "th": $("<th>Recusar</th>"),
            "td": $("<td class='td-decline'></td>"),
            "button": $("<button class='button-decline-user'>Recusar</button>"),
         }];
         addButtonColumnToTable(elements);
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

function acceptUser(currentButtonClicked) {
   var token = getCookie("token");
   var userId = currentButtonClicked.parent().parent().children(".td-id").text();

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "put",
      url: urlApi + "users/accept/" + userId,

      success: res => {
         openModal(res.message);

         var rowCount = $("tbody tr").length;
         if (rowCount > 1) {
            var currentRow = $("tbody tr .td-id:contains('" + userId + "')").parent();
            destroyElement(currentRow);
         }
         else {
            destroyElement($("thead").find("tr"));
            destroyElement($("tbody").find("tr"));
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


// PRODUCTS
function getProducts() {
   var thead = $("#table-products thead");
   var tbody = $("#table-products tbody");

   var htmlExists = checkHtmlExists(tbody.html());
   if (htmlExists) {
      destroyElement(thead.find("tr"));
      destroyElement(tbody.find("tr"));
   }

   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "products/",

      success: res => {
         var table = $("#table-products");
         createTableWithData(res.data, table);

         var elements = [{
            "selector": ".td-get-by-id",
            "table": table,
            "th": $("<th>Obter pelo ID</th>"),
            "td": $("<td class='td-get-by-id'></td>"),
            "button": $("<button class='button-get-by-id'>Obter pelo ID</button>"),
         }, {
            "selector": ".td-edit-data",
            "table": table,
            "th": $("<th>Editar dados</th>"),
            "td": $("<td class='td-edit-data'></td>"),
            "button": $("<button class='button-edit-data'>Editar dados</button>"),
         }, {
            "selector": ".td-edit-photo",
            "table": table,
            "th": $("<th>Editar foto</th>"),
            "td": $("<td class='td-edit-photo'></td>"),
            "button": $("<button class='button-edit-photo'>Editar foto</button>"),
         }, {
            "selector": ".td-delete",
            "table": table,
            "th": $("<th>Remover</th>"),
            "td": $("<td class='td-delete'></td>"),
            "button": $("<button class='button-delete-product'>Remover</button>"),
         }, {
            "selector": ".td-create-order",
            "table": table,
            "th": $("<th>Encomendar</th>"),
            "td": $("<td class='td-create-order'></td>"),
            "button": $("<button class='button-create-order'>Encomendar</button>"),
         }];

         addButtonColumnToTable(elements);
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

function editProductData() {
   var form = $("#form-edit-product-data");
   var formData = getFormData(form);
   var token = getCookie("token");

   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "products/edit-data/" + formData.id,

      success: res => {
         var modal = $("#div-edit-product-data");
         closeModal(modal);
         openModal(res.message);
         $("#button-get-products").trigger("click");
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
      type: "put",
      url: urlApi + "products/edit-photo/" + formData.get("id"),

      success: res => {
         var modal = $("#div-edit-product-photo");
         closeModal(modal);
         openModal(res.message);
         $("#button-get-products").trigger("click");
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

function deleteProduct(currentButtonClicked) {
   var token = getCookie("token");
   var productId = currentButtonClicked.parent().parent().children(".td-id").text();

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "delete",
      url: urlApi + "products/delete/" + productId,

      success: res => {
         openModal(res.message);

         var rowCount = $("tbody tr").length;
         if (rowCount > 1) {
            var currentRow = $("tbody tr .td-id:contains('" + productId + "')").parent();
            destroyElement(currentRow);
         }
         else {
            destroyElement($("thead").find("tr"));
            destroyElement($("tbody").find("tr"));
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


// ORDERS
function getUserOrders() {
   var token = getCookie("token");

   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "orders/",

      success: res => {
         console.log(res.data)
         for (var i = 0; i < res.data.length; i++) {
            var html = getHtmlUserOrders(res.data[i]);
            $("#get-user-orders").append(html);
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