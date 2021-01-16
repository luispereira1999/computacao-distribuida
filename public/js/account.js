$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged) {
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
   var html = getHtmlImgEditPhoto();
   $("#img-photo").append(html);
   getUserData();

   $("input[name='file']").change(() => {
      $('#form-edit-user-photo').trigger('submit');
      editUserPhoto();
   });
});