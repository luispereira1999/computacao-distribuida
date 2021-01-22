$(window).ready(() => {
   var userLogged = checkUserLogged();
   if (userLogged && getCookie("type") == 2) {
      $("#header-user-logged").show();
      $("#header-user-not-logged").hide();
   }
   else {
      var url = "./index.html";
      redirectPage(url);
      return;
   }

   startModal($("div-create-product"));
   startModal($("div-edit-product-data"));
   startModal($("div-edit-product-photo"));

   var html = getHtmlUserInfoOnHeader();
   $("#header-user-info").append(html);
   var html = getHtmlMerchantHeaderItems();
   $("#header-menu").append(html);
   var html = getHtmlImgEditPhoto();
   $("#img-photo").append(html);
   getMerchantData();
   getProductsInAccount();

   $("#get-user-products").on("click", ".span-edit-product-photo", function () {
      var data = {
         "id": $(this).parent().parent().parent().attr("id").split("-")[1],
      };

      setFormData(data);
   });

   $("#form-edit-product-photo").submit(e => {
      e.preventDefault();
      editProductPhoto();
   });

   $("#get-user-products").on("click", ".delete-product", function () {
      var id = $(this).parent().parent().parent().attr("id").split("-")[1];
      $("#id_product_truebtn").attr("class", id);
      $("#id_product_confrmdiv").css("display", "block");
   });

   $("#id_product_truebtn").click(function () {
      deleteProduct($(this).attr("class"));
   });

   $("#id_truebtn").click(() => {
      deleteUser();
   });

   $(".a-logout").click(() => {
      logout("Sessão terminada com sucesso!");
   });
});