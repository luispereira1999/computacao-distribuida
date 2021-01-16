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
         <img src="./uploads/photos/'+ getCookie("url_photo") + '" alt="Foto do utilizador">\
      </figure>\
      <span>'+ getCookie("name") + '</span>\
   ');
}


function getHtmlTitle(data) {
   return $('\
      <div class="img-holder">\
         <figure>\
            <img src="./uploads/photos/' + getCookie("url_photo") + '"">\
         </figure>\
      </div>\
      <div class="text-holder">\
         <span class="restaurant-title">'+ getCookie("name") + '</span>\
         <ul class="user-info-contact">\
            <li class="cell">\
               <i class="icon-phone"></i><a href="tel:912545988">'+ data.phone_number + '</a>\
            </li>\
            <li class="email">\
               <i class="icon-mail5"></i><a href="mail:josetomas@gmail.com">'+ getCookie("email") + '</a>\
            </li>\
         </ul>\
      </div>\
   ');
}


function getHtmlImgEditPhoto() {
   return $('<img src="./uploads/photos/' + getCookie("url_photo") + '">');
}


function getHtmlUserDataInAccount1(data) {
   return $('\
      <div class="row">\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Nome*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="name" value="'+ data.name + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Apelido*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="surname" value="'+ data.surname + '" form="form-edit-user-data">\
            </div>\
            </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Email*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="email" value="'+ data.email + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Nome de Utilizador*</label>\
               <input type="text" class="form-control gllpLongitude" name="username" value="'+ data.username + '" form="form-edit-user-data">\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlUserDataInAccount2(data) {
   return $('\
      <div class="opt-conts">\
         <div class="row">\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Nº Telemóvel*</label>\
                  <input type="text" class="form-control gllpLongitude" name="phone_number" value="'+ data.phone_number + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Morada*</label>\
                  <input type="text" class="form-control gllpLongitude" name="address" value="'+ data.address + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Código Postal*</label>\
                  <input type="text" class="form-control gllpLongitude" name="zip_code" value="'+ data.zip_code + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder"></div>\
               <div class="field-holder search-location-map input-button-loader">\
                  <input type="submit" class="acc-submit cs-section-update cs-color gllpSearchButton" value="Alterar dados" form="form-edit-user-data">\
               </div>\
            </div>\
         </div>\
      </div>\
   ');
}