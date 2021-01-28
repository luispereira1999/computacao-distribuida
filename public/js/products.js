$(window).ready(() => {
   getProductsInProducts();

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

   startModal($("div-create-order"));

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

   $("#ul-products").on("click", ".span-create-order", function () {
      var data = {
         "product_id": $(this).parent().parent().attr("id").split("-")[1],
         "price": $(this).parent(".list-option").children(".data-price").text().split("€")[0]
      };

      var vat = 0.23 + parseInt(data.price);
      var pickUpFee = 3.5 + parseInt(data.price);
      var total = vat + pickUpFee + data.price;

      setFormData(data);
      $("#vat").val(0.27)
   });

   $("#form-create-order").submit(e => {
      e.preventDefault();
      createOrder();
   });

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });

   $('body').click((e) => {
      if ($(e.target).is('#div-create-order')) {
         $("#div-create-order").hide();
      }
   });
});