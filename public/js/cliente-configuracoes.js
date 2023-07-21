$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged && getCookie("type") == 1) {
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
   var html = getHtmlClientHeaderItems();
   $("#header-menu").append(html);
   var html = getHtmlImgEditPhoto();
   $("#img-photo").append(html);
   getClientData();

   $("#file-photo").change(() => {
      $("#form-edit-user-photo").trigger("submit");
      editUserPhoto();
   });

   $("#id_truebtn").click(() => {
      deleteUser();
   });

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });

   $("#form-edit-user-data").submit(e => {
      e.preventDefault();
      editUserData();
   });

   $("#form-edit-password").submit(e => {
      e.preventDefault();
      editPassword();
   });

   $("#form-edit-user-photo").submit(e => {
      e.preventDefault();
      editUserPhoto();
   });
});