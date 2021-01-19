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

   if (getCookie("type") == 1) {
      var html = getHtmlClientHeaderItems();
      $("#header-menu").append(html);
   }
   else if (getCookie("type") == 2) {
      var html = getHtmlMerchantHeaderItems();
      $("#header-menu").append(html);
   }
   else if (getCookie("type") == 3) {
      var html = getHtmlDriverHeaderItems();
      $("#header-menu").append(html);
   }
   else if (getCookie("type") == 4) {
      var html = getHtmlAdminHeaderItems();
      $("#header-menu").append(html);
   }

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });
});