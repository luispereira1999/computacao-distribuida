$(window).ready(() => {
   const urlParams = new URLSearchParams(window.location.search);
   const merchantID = urlParams.get('id');

   getMerchantInProducts(merchantID);
   getProductsInProducts(merchantID);

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
      const data = {
         "product_id": $(this).parent().parent().attr("id").split("-")[1],
         "price": $(this).parent(".list-option").children(".data-price").text().split("€")[0]
      };

      const pickUpFee = 0.90;
      let totalWithoutVat = Number(data.price) + pickUpFee;
      totalWithoutVat = totalWithoutVat.toFixed(2);
      totalWithoutVat = Number(totalWithoutVat);

      const vat = 0.23;
      let totalWithVat = totalWithoutVat * (1 + vat);
      totalWithVat = totalWithVat.toFixed(2);
      totalWithVat = Number(totalWithVat);

      data.vat = vat;
      data.pickUpFee = pickUpFee;
      data.total = totalWithVat;

      $("#pickUpFee").val(pickUpFee);
      $("#totalWithoutVat").val(totalWithoutVat);
      $("#totalWithVat").val(totalWithVat);

      setFormData(data);
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