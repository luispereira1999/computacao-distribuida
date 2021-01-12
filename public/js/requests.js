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
         showModalAndRedirect(res.message, url);
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
         showModalAndRedirect(res.message, url);
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
         showModalAndRedirect(res.message, url);
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

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "register/admin/",

      success: res => {
         var url = "./index.html";
         showModalAndRedirect(res.message, url);
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

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      type: "post",
      url: urlApi + "login/",

      success: res => {
         setSession(res);
         var url = "./index.html";
         showModalAndRedirect(res.message, url);
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
   var div = $("#user-data");

   var htmlExists = checkHtmlExists(div.html());
   if (htmlExists) {
      destroyElement(div.find("label"));
      destroyElement(div.find("input"));
      destroyElement(div.find("br"));
   }

   var token = getToken();

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

   var token = getToken();

   // pedido ao servidor
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
   var token = getToken();
   var userId = currentButtonClicked.parent().parent().children(".td-id").text();

   // pedido ao servidor
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

   var token = getToken();

   // pedido ao servidor
   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "products/",

      success: res => {
         var table = $("#table-products");
         createTableWithData(res.data, table);

         var elements = [{
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

function getProduct() {
   // pedido ao servidor
   $.ajax({
      cache: false,
      type: "get",
      url: urlApi + "products/" + 1,

      success: res => {
         setFormData(res.data);
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
   var token = getToken();

   // pedido ao servidor
   $.ajax({
      cache: false,
      contentType: false,
      data: formData,
      processData: false,
      headers: { Authorization: "Bearer " + token },
      type: "post",
      url: urlApi + "products/create/",

      success: res => {
         var modal = $("#id1");
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
   var token = getToken();

   // pedido ao servidor
   $.ajax({
      cache: false,
      data: formData,
      headers: { Authorization: "Bearer " + token },
      type: "patch",
      url: urlApi + "products/edit-data/1",

      success: res => {
         var modal = $("#id2");
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

function deleteProduct(currentButtonClicked) {
   var token = getToken();
   var productId = currentButtonClicked.parent().parent().children(".td-id").text();

   // pedido ao servidor
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
function getOrdersFromUser() {
   var thead = $("#table-orders-from-user thead");
   var tbody = $("#table-orders-from-user tbody");

   var htmlExists = checkHtmlExists(tbody.html());
   if (htmlExists) {
      destroyElement(thead.find("tr"));
      destroyElement(tbody.find("tr"));
   }

   var token = getToken();

   // pedido ao servidor
   $.ajax({
      cache: false,
      headers: { Authorization: "Bearer " + token },
      type: "get",
      url: urlApi + "orders/",

      success: res => {
         var table = $("#table-orders-from-user");
         createTableWithData(res.data, table);

         var elements = [{
            "selector": ".td-cancel",
            "table": table,
            "th": $("<th>Cancelar</th>"),
            "td": $("<td class='td-cancel'></td>"),
            "button": $("<button class='button-cancel'>Cancelar</button>"),
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

function createOrder(currentButtonClicked) {
   // var data = { "product_id":  };
   var token = getToken();
   var data = { "product_id": currentButtonClicked.parent().parent().children(".td-id").text() };

   // pedido ao servidor
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
   var token = getToken();
   var orderId = currentButtonClicked.parent().parent().children(".td-id").text();
   var productId = currentButtonClicked.parent().parent().children(".td-product_id").text();
   var data = { "order_id": orderId, "product_id": productId };

   // pedido ao servidor
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