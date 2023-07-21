$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged) {
      var url = "./index.html";
      redirectPage(url);
      return;
   }

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
});