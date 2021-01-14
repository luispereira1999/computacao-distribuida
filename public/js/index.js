$(window).ready(() => {
   console.log(getSession("name"))
   var html = getHtmlUserInfoOnHeader();
   $("#header-user-info").append(html);
   getProductsToIndex();
});