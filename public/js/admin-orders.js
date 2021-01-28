$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged && getCookie("type") == 4) {
      $("#header-user-logged").show();
      $("#header-user-not-logged").hide();
   }
   else {
      var url = "./index.html";
      redirectPage(url);
      return;
   }

   var html = getHtmlUserInfoOnHeader();
   $("#header-user-info").append(html);
   var html = getHtmlAdminHeaderItems();
   $("#header-menu").append(html);
   var html = getHtmlImgEditPhoto();
   $("#img-photo").append(html);
   getAdminData();

   getUserOrders();

   $("#id_truebtn").click(() => {
      deleteUser();
   });

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });
});