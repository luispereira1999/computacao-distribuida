$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged || getCookie("type") == 3) {
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
   var html = getHtmlDriverHeaderItems();
   $("#header-menu").append(html);
   var html = getHtmlImgEditPhoto();
   $("#img-photo").append(html);
   getDriverData();

   $("#form-edit-user-photo input[name='file']").change(() => {
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
      $("input[name='description']").val($("textarea").val());
      editUserData();
   });

   $("#form-edit-driving-license").submit(e => {
      e.preventDefault();
      editDrivingLicense();
   });

   $("#form-edit-password").submit(e => {
      e.preventDefault();
      editPassword();
   });
});