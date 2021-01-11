$(window).ready(() => {
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


   $("#form-login").submit(e => {
      e.preventDefault();
      login();
   });


   $("#form-create-product").submit(e => {
      e.preventDefault();
      createProduct();
   });


   $("#button-get-users-not-accepted").click(() => {
      getUsersNotAccepted();
   });


   $("#table-users-not-accepted").on("click", ".td-accept .button-accept-user", function (e) {
      e.preventDefault();
      acceptUser($(this));
   });


   $("#button-get-user-data").click(() => {
      getUserData();
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


   var modal = document.getElementById('id01');
   window.onclick = function (event) {
      if (event.target == modal) {
         modal.style.display = "none";
      }
   }
});