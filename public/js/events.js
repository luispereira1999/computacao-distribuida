$(window).ready(() => {
   // GENERAL
   startModal($("div-create-product"));
   startModal($("div-edit-product-data"));
   startModal($("div-edit-product-photo"));

   var userLogged = checkUserLogged();
   if (userLogged) {
      $("#header-user-logged").show();
      $("#header-user-not-logged").hide();
   }
   else {
      $("#header-user-logged").hide();
      $("#header-user-not-logged").show();
   }

   
   // REGISTER
   $("#form-register-client").submit(e => {
      e.preventDefault();
      registerClient();
   });

   $("#form-register-merchant").submit(e => {
      e.preventDefault();
      registerMerchant();
   });

   $("#form-register-driver").submit(e => {
      e.preventDefault();
      registerDriver();
   });

   $("#form-register-admin").submit(e => {
      e.preventDefault();
      registerAdmin();
   });

   // clicar na checkbox de receber publicidades nos registos
   $("input[name='receive_advertising']").change(() => {
      var currentElement = $("input[name='receive_advertising']");
      var isChecked = currentElement.is(":checked");

      if (isChecked)
         currentElement.val("1");
      else
         currentElement.val("0");
   });


   // LOGIN
   $("#form-login").submit(e => {
      e.preventDefault();
      login();
   });


   // USERS
   $("#button-get-user-data").click(() => {
      getUserData();
   });

   $("#button-get-users-not-accepted").click(() => {
      getUsersNotAccepted();
   });

   $("#table-users-not-accepted").on("click", ".td-accept .button-accept-user", function () {
      acceptUser($(this));
   });


   // PRODUCTS
   $("#button-get-products").click(() => {
      getProducts();
   });

   $("#table-products").on("click", ".td-get-by-id .button-get-by-id", function () {
      getProductById($(this));
   });

   $("#form-create-product").submit(e => {
      e.preventDefault();
      createProduct();
   });

   $("#table-products").on("click", ".td-edit-data .button-edit-data", function () {
      document.getElementById("div-edit-product-data").style.display = "block";

      var data = {
         "id": $(this).parent().parent().children(".td-id").text(),
         "name": $(this).parent().parent().children(".td-name").text(),
         "stock": $(this).parent().parent().children(".td-stock").text(),
         "price": $(this).parent().parent().children(".td-price").text(),
         "description": $(this).parent().parent().children(".td-description").text()
      };

      setFormData(data);
   });

   $("#table-products").on("click", ".td-edit-photo .button-edit-photo", function () {
      document.getElementById("div-edit-product-photo").style.display = "block";

      var data = {
         "id": $(this).parent().parent().children(".td-id").text(),
         "name": $(this).parent().parent().children(".td-name").text(),
         "stock": $(this).parent().parent().children(".td-stock").text(),
         "price": $(this).parent().parent().children(".td-price").text(),
         "description": $(this).parent().parent().children(".td-description").text()
      };

      setFormData(data);
   });

   $("#form-edit-product-data").submit(e => {
      e.preventDefault();
      editProductData();
   });

   $("#form-edit-product-photo").submit(e => {
      e.preventDefault();
      editProductPhoto();
   });

   $("#table-products").on("click", ".td-delete .button-delete-product", function (e) {
      e.preventDefault();
      deleteProduct($(this));
   });


   // ORDERS
   $("#button-get-orders-from-user").click(() => {
      getOrdersFromUser();
   });

   $("#table-products").on("click", ".td-create-order .button-create-order", function (e) {
      e.preventDefault();
      createOrder($(this));
   });

   $("#table-orders-from-user").on("click", ".td-cancel .button-cancel", function (e) {
      e.preventDefault();
      cancelOrder($(this));
   });
});