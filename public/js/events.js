$(window).ready(() => {
   // GENERAL
   startModal($("id1"));
   startModal($("id2"));


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

   $("#table-users-not-accepted").on("click", ".td-accept .button-accept-user", function (e) {
      e.preventDefault();
      acceptUser($(this));
   });


   // PRODUCTS
   $("#button-get-products").click(() => {
      getProducts();
   });

   $("#button-get-product").click(() => {
      document.getElementById('id2').style.display = "block";
      getProduct();
   });

   $("#form-create-product").submit(e => {
      e.preventDefault();
      createProduct();
   });

   $("#form-edit-product-data").submit(e => {
      e.preventDefault();
      editProductData();
   });

   $("#table-products").on("click", ".td-delete .button-delete-product", function (e) {
      e.preventDefault();
      deleteProduct($(this));
   });

   $("#table-products").on("click", ".td-create-order .button-create-order", function (e) {
      e.preventDefault();
      createOrder($(this));
   });

   $("#table-products").on("click", ".td-cancel-order .button-cancel-order", function (e) {
      e.preventDefault();
      cancelOrder($(this));
   });
});