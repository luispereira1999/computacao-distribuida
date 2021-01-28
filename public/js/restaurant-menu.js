
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

   $("#get-user-products").on("click", ".span-edit-product-data", function () {
      var price = $(this).parent().parent().children(".author-info").children(".text-holder").children(".data-price").text().split("€")[0];

      var data = {
         "id": $(this).parent().parent().parent().attr("id").split("-")[1],
         "name": $(this).parent().parent().children(".author-info").children(".text-holder").children("h6").children(".data-product-name").text(),
         "stock": $(this).parent().parent().children(".author-info").children(".text-holder").children(".data-stock").text(),
         "price": price,
         "description": $(this).parent().parent().children(".post-time").children(".data-description").text()
      };

      setFormData(data);
   });

   $("#get-user-products").on("click", ".span-edit-product-photo", function () {
      var data = {
         "id": $(this).parent().parent().parent().attr("id").split("-")[1],
      };

      setFormData(data);
   });

   $("#form-create-product").submit(e => {
      e.preventDefault();
      createProduct();
   });

   $("#form-edit-product-data").submit(e => {
      e.preventDefault();
      editProductData();
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

   $('body').click((e) => {
      if ($(e.target).is('#div-create-product')) {
         $("#div-create-product").hide();
      }
      if ($(e.target).is('#div-edit-product-data')) {
         $("#div-edit-product-data").hide();
      }
      if ($(e.target).is('#div-edit-product-photo')) {
         $("#div-edit-product-photo").hide();
      }
   });
});