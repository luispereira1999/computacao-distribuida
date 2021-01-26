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
   getUsersNotAccepted();

   $("#table-users").on("click", ".accept", function () {
      var id = $(this).parent().parent().children(".user-id").text();
      acceptUser(id);
   });

   $("#table-users").on("click", ".decline", function () {
      var id = $(this).parent().parent().children(".user-id").text();
      declineUser(id);
   });

   $("#id_truebtn").click(() => {
      deleteUser();
   });

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });
});