$(window).ready(() => {
   getMerchantsToIndex();

   var userLogged = checkUserLogged();
   if (userLogged) {
      $("#header-user-logged").show();
      $("#header-user-not-logged").hide();
   }
   else {
      $("#header-user-logged").hide();
      $("#header-user-not-logged").show();
      return;
   }

   var html = getHtmlUserInfoOnHeader();
   $("#header-user-info").append(html);
});