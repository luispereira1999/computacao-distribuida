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

   $("#get-user-orders").on("click", ".order_cancel", function () {
      var id = $(this).parent().parent().parent().parent().parent().attr("id");

      $("#id_order_truebtn").attr("class", id);
      $("#id_order_confrmdiv").css("display", "block");
   });

   $("#id_order_truebtn").click(function () {
      const idString = $(this).attr("class");

      const regexOrderId = /order-(\d+)/;
      const regexProductId = /product-(\d+)/;

      const matchOrderId = idString.match(regexOrderId);
      const matchProductId = idString.match(regexProductId);

      const orderId = parseInt(matchOrderId[1]);
      const productId = parseInt(matchProductId[1]);

      cancelOrder(orderId, productId);
   });

   $("#id_truebtn").click(() => {
      deleteUser();
   });

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });
});