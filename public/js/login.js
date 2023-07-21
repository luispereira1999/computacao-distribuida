$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged) {
      var url = "./index.html";
      redirectPage(url);
      return;
   }

   $("#form-login").submit(e => {
      e.preventDefault();
      login();
   });
});