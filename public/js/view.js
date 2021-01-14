function getHtmlProductsOnIndex(data) {
   return $('\
      <li class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
      <div class="list-post featured">\
         <div class="img-holder">\
            <figure><a href="#"><img src="../uploads/products/'+ data.url_photo + '" class="img-thumb wp-post-image" alt=""></a></figure>\
            <span class="restaurant-status open">\
               <em class="bookmarkRibbon"></em>'+ data.stock + '\
            </span>\
         </div>\
         <div class="text-holder">\
            <div class="post-title">\
               <h5>\
                  <a href="#">'+ data.product_name + '</a>\
                  <span class="sponsored text-color">Sponsored</span>\
               </h5>\
            </div>\
            <address>'+ data.user_name + '<span></address>\
            <div class="delivery-potions">\
               <div class="post-time">\
                  <image width="25" height="25" src="./images/euro.png"></image>\
               </div>\
               <span>20.3€</span>\
            </div>\
         </div>\
         <div class="list-option">\
            <a href="javascript:void(0);" class="shortlist-btn" data-toggle="modal" data-target="#sign-in">\
               <i class="icon-heart-o"></i>\
            </a>\
         </div>\
      </div>\
   </li>\
   ');
}


function getHtmlUserInfoOnHeader() {
   return $('\
      <figure class="profile-image">\
         <img src="../uploads/photos/'+ getSession("url_photo") + '" alt="Foto do utilizador">\
      </figure>\
      <span>'+ getSession("name") + '</span>\
   ');
}