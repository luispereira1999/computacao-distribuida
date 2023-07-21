function getHtmlMerchantsInIndex(data) {
   return $('\
      <li class="has-border">\
         <figure>\
            <a href="produtos.html?id=' + data.id + '"><img src="./uploads/photos/' + data.url_photo + '" class="attachment-full size-full wp-post-image" alt=""></a>\
         </figure>\
      </li>\
   ');
}


function getHtmlMerchantsInMerchants(data) {
   return $('\
      <li id="product-' + data.id + '">\
         <div class="img-holder">\
            <figure>\
               <a href="produtos.html?id=' + data.id + '"><img src="uploads/photos/' + data.url_photo + '" class="img-list wp-post-image" alt="Imagem do comerciante ' + data.name + '"></a>\
            </figure>\
         </div>\
         <div class="text-holder">\
            <div class="post-title">\
               <h5>\
                  <a href="produtos.html?id=' + data.id + '">' + data.name + '</a>\
               </h5>\
            </div>\
            <span class="post-categories">' + data.description + '</span>\
            <div class="delivery-potions">\
               <div class="post-time">\
                  <i class="icon-motorcycle"></i>\
               </div>\
               <span>' + data.address + ", " + data.zip_code + '</span>\
            </div>\
         </div>\
         <div class="list-option">\
            <a href="produtos.html?id=' + data.id + '" class="viewmenu-btn text-color">Ver Produtos</a>\
         </div>\
      </li>\
   ');
}


function getHtmlProductsInProducts(data) {
   if (!checkUserLogged()) {
      return $('\
         <li id="product-' + data.id + '">\
            <div class="img-holder">\
               <figure>\
                  <img src="./uploads/products/' + data.product_url_photo + '" class="img-list wp-post-image">\
               </figure>\
            </div>\
            <div class="text-holder">\
               <div class="post-title">\
                  <h5>' + data.product_name + '</h5>\
               </div>\
               <span class="post-categories">' + data.description + '</span>\
            </div>\
            <div class="list-option">\
               <span class="data-price" style="margin-right:40px;">' + data.price + '€</span>\
               <a style="color: black !important; border-color: black !important;" class="span-create-order viewmenu-btn text-color">Faça Login</a>\
            </div>\
         </li>\
      ');
   }
   else if (data.stock > 0) {
      return $('\
         <li id="product-' + data.id + '">\
            <div class="img-holder">\
               <figure>\
                  <img src="./uploads/products/' + data.product_url_photo + '" class="img-list wp-post-image">\
               </figure>\
            </div>\
            <div class="text-holder">\
               <div class="post-title">\
                  <h5>' + data.product_name + '</h5>\
               </div>\
               <span class="post-categories">' + data.description + '</span>\
            </div>\
            <div class="list-option">\
               <span class="data-price" style="margin-right:40px;">' + data.price + '€</span>\
               <a style="cursor:pointer" onclick="document.getElementById('+ "'div-create-order'" + ').style.display=' + "'block'" + '" class="span-create-order viewmenu-btn text-color">Encomendar</a>\
            </div>\
         </li>\
      ');
   }
   else {  // mostra stock indisponível, desativa o botão de encomendar
      return $('\
         <li id="product-' + data.id + '">\
            <div class="img-holder">\
               <figure>\
                  <img src="./uploads/products/' + data.product_url_photo + '" class="img-list wp-post-image">\
               </figure>\
            </div>\
            <div class="text-holder">\
               <div class="post-title">\
                  <h5>' + data.product_name + '</h5>\
               </div>\
               <span class="post-categories">' + data.description + '</span>\
            </div>\
            <div class="list-option">\
               <span class="data-price" style="margin-right:40px;">' + data.price + '€</span>\
               <a style="color: black !important; border-color: black !important;" class="span-create-order viewmenu-btn text-color">Indisponível</a>\
            </div>\
         </li>\
      ');
   }
}


function setMainCover(imageUrl) {
   $('#mainCover').css('background', 'url(uploads/photos/' + imageUrl + ') no-repeat scroll 0 0 / cover');
}


function getHtmlUserInfoOnHeader() {
   return $('\
      <figure class="profile-image">\
         <img src="./uploads/photos/'+ getCookie("url_photo") + '" alt="Foto do utilizador">\
      </figure>\
      <span>'+ getCookie("name") + '</span>\
   ');
}


function getHtmlClientHeaderItems() {
   return $('\
      <li><a href="cliente-configuracoes.html"><i class="icon-build"></i>Configurações</a></li>\
      <li><a href="cliente-encomendas.html" class="btn-edit-profile"><i class="icon-add_shopping_cart"></i>Encomendas</a></li>\
      <li><a class="a-logout" style="cursor: pointer;"><i class="icon-log-out"></i>Sair</a></li>\
   ');
}


function getHtmlMerchantHeaderItems() {
   return $('\
      <li><a href="comerciante-configuracoes.html"><i class="icon-build"></i>Configurações</a></li>\
      <li><a href="comerciante-produtos.html"><i class="icon-menu5"></i>Produtos</a></li>\
      <li><a href="comerciante-vendas.html"><i class="icon-bill"></i>Vendas</a></li>\
      <li><a href="comerciante-encomendas.html" class="btn-edit-profile"><i class="icon-add_shopping_cart"></i>Encomendas</a></li>\
      <li><a class="a-logout" style="cursor: pointer;"><i class="icon-log-out"></i>Sair</a></li>\
   ');
}


function getHtmlDriverHeaderItems() {
   return $('\
      <li><a href="condutor-configuracoes.html"><i class="icon-build"></i>Configurações</a></li>\
      <li><a href="condutor-aceitar-encomendas.html"><i class="icon-open_in_browser"></i>Aceitar Encomendas</a></li>\
      <li><a href="condutor-entregas.html"><i class="icon-bill"></i>Entregas</a></li>\
      <li><a href="condutor-encomendas.html" class="btn-edit-profile"><i class="icon-add_shopping_cart"></i>Encomendas</a></li>\
      <li><a class="a-logout" style="cursor: pointer;"><i class="icon-log-out"></i>Sair</a></li>\
   ');
}


function getHtmlAdminHeaderItems() {
   return $('\
      <li><a href="admin-configuracoes.html"><i class="icon-build"></i>Configurações</a></li>\
      <li><a href="admin-utilizadores-aceitados.html" class="btn-edit-profile"><i class="icon-users"></i>Utilizadores Aceites</a></li>\
      <li><a href="admin-aceitar-utilizadores.html" class="btn-edit-profile"><i class="icon-open_in_browser"></i>Aceitar utilizadores</a></li>\
      <li><a href="admin-encomendas.html" class="btn-edit-profile"><i class="icon-add_shopping_cart"></i>Encomendas</a></li>\
      <li><a class="a-logout" style="cursor: pointer;"><i class="icon-log-out"></i>Sair</a></li>\
   ');
}


function getHtmlTitle(data) {
   if (data.description == null || data.description == "") {
      return $('\
         <div class="img-holder">\
            <figure>\
               <img src="./uploads/photos/' + getCookie("url_photo") + '"">\
            </figure>\
         </div>\
         <div class="text-holder">\
            <span class="merchant-title">'+ getCookie("name") + '</span>\
            <ul class="user-info-contact">\
               <li class="cell">\
                  <i class="icon-phone"></i><a href="tel:912545988">' + data.phone_number + '</a>\
               </li>\
               <li class="email">\
                  <i class="icon-mail5"></i><a href="mail:josetomas@gmail.com">'+ getCookie("email") + '</a>\
               </li>\
            </ul>\
         </div>\
      ');
   } else {
      return $('\
         <div class="img-holder">\
            <figure>\
               <img src="./uploads/photos/' + getCookie("url_photo") + '"">\
            </figure>\
         </div>\
         <div class="text-holder">\
            <span class="merchant-title">'+ getCookie("name") + '</span>\
            <ul class="user-info-contact">\
               <li class="cell">\
                  <i class="icon-phone"></i><a href="tel:912545988">' + data.phone_number + '</a>\
               </li>\
               <li class="email">\
                  <i class="icon-mail5"></i><a href="mail:josetomas@gmail.com">'+ getCookie("email") + '</a>\
               </li>\
               <li class="description">\
                  <i class="icon-info2"></i><a>' + data.description + '</a>\
               </li>\
            </ul>\
         </div>\
      ');
   }
}


function getHtmlMerchantTitle(data) {
   return $('\
      <div class="img-holder">\
         <figure>\
            <img src="./uploads/photos/' + data.url_photo + '"">\
         </figure>\
      </div>\
      <div class="text-holder">\
         <span class="merchant-title">' + data.name + '</span>\
         <ul class="user-info-contact">\
            <li class="cell">\
               <i class="icon-address-book"></i><a href="">' + data.address + ", " + data.zip_code + '</a>\
            </li>\
            <li class="email">\
               <i class="icon-mail5"></i><a href="mail:josetomas@gmail.com">' + data.email + '</a>\
            </li>\
            <li class="description">\
               <i class="icon-info2"></i><a>' + data.description + '</a>\
            </li>\
         </ul>\
      </div>\
   ');
}


function getHtmlImgEditPhoto() {
   return $('<img src="./uploads/photos/' + getCookie("url_photo") + '">');
}


function getHtmlClientData1(data) {
   return $('\
      <div class="row">\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Nome*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="name" value="' + data.name + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Apelido*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="surname" value="' + data.surname + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Email*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="email" value="' + data.email + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Nome de Utilizador*</label>\
               <input type="text" class="form-control gllpLongitude" name="username" value="' + data.username + '" form="form-edit-user-data">\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlClientData2(data) {
   return $('\
      <div class="opt-conts">\
         <div class="row">\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Nº Telemóvel*</label>\
                  <input type="text" class="form-control gllpLongitude" name="phone_number" value="' + data.phone_number + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Morada*</label>\
                  <input type="text" class="form-control gllpLongitude" name="address" value="' + data.address + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Código Postal*</label>\
                  <input type="text" class="form-control gllpLongitude" name="zip_code" value="' + data.zip_code + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
               <div class="field-holder"></div>\
               <div class="field-holder search-location-map input-button-loader">\
                  <input type="submit" class="acc-submit cs-section-update cs-color gllpSearchButton" value="Alterar dados" form="form-edit-user-data">\
               </div>\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlMerchantData1(data) {
   return $('\
      <div class="row">\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Nome*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="name" value="' + data.name + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Nome de Utilizador*</label>\
               <input type="text" class="form-control gllpLongitude" name="username" value="' + data.username + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Email*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="email" value="' + data.email + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Nº Telemóvel*</label>\
               <input type="text" class="form-control gllpLongitude" name="phone_number" value="' + data.phone_number + '" form="form-edit-user-data">\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlMerchantData2(data) {
   return $('\
      <div class="opt-conts">\
         <div class="row">\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Morada*</label>\
                  <input type="text" class="form-control gllpLongitude" name="address" value="' + data.address + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Código Postal*</label>\
                  <input type="text" class="form-control gllpLongitude" name="zip_code" value="' + data.zip_code + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Descrição*</label>\
                  <input type="hidden" class="form-control gllpLongitude" name="description" value="' + data.description + '" form="form-edit-user-data">\
                  <textarea>' + data.description + '</textarea>\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>NIF*</label>\
                  <input type="text" class="form-control gllpLongitude" name="nif" value="' + data.nif + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
               <div class="field-holder search-location-map input-button-loader">\
                  <input type="submit" class="acc-submit cs-section-update cs-color gllpSearchButton" value="Alterar dados" form="form-edit-user-data">\
               </div>\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlDriverData1(data) {
   return $('\
      <div class="row">\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Nome*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="name" value="' + data.name + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Apelido*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="surname" value="' + data.surname + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Email*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="email" value="' + data.email + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Nome de Utilizador*</label>\
               <input type="text" class="form-control gllpLongitude" name="username" value="' + data.username + '" form="form-edit-user-data">\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlDriverData2(data) {
   return $('\
      <div class="opt-conts">\
         <div class="row">\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Morada*</label>\
                  <input type="text" class="form-control gllpLongitude" name="address" value="' + data.address + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Código Postal*</label>\
                  <input type="text" class="form-control gllpLongitude" name="zip_code" value="' + data.zip_code + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Nº Telemóvel*</label>\
                  <input type="text" class="form-control gllpLongitude" name="phone_number" value="' + data.phone_number + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>NIF*</label>\
                  <input type="text" class="form-control gllpLongitude" name="nif" value="' + data.nif + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
               <div class="field-holder search-location-map input-button-loader">\
                  <input type="submit" class="acc-submit cs-section-update cs-color gllpSearchButton" value="Alterar dados" form="form-edit-user-data">\
               </div>\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlAdminData1(data) {
   return $('\
      <div class="row">\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Nome*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="name" value="' + data.name + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
            <div class="field-holder">\
               <label>Apelido*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="surname" value="' + data.surname + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Email*</label>\
               <input type="text" class="foodbakery-dev-req-field" name="email" value="' + data.email + '" form="form-edit-user-data">\
            </div>\
         </div>\
         <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
            <div class="field-holder">\
               <label>Nome de Utilizador*</label>\
               <input type="text" class="form-control gllpLongitude" name="username" value="' + data.username + '" form="form-edit-user-data">\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlAdminData2(data) {
   return $('\
      <div class="opt-conts">\
         <div class="row">\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Nº Telemóvel*</label>\
                  <input type="text" class="form-control gllpLongitude" name="phone_number" value="' + data.phone_number + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Morada*</label>\
                  <input type="text" class="form-control gllpLongitude" name="address" value="' + data.address + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
               <div class="field-holder">\
                  <label>Código Postal*</label>\
                  <input type="text" class="form-control gllpLongitude" name="zip_code" value="' + data.zip_code + '" form="form-edit-user-data">\
               </div>\
            </div>\
            <div class="col-lg-6 col-md-6 col-sm-6 col-xs-6">\
               <div class="field-holder"></div>\
               <div class="field-holder search-location-map input-button-loader">\
                  <input type="submit" class="acc-submit cs-section-update cs-color gllpSearchButton" value="Alterar dados" form="form-edit-user-data">\
               </div>\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlUserOrders(data, disableOrderCancellation) {
   return $('\
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="order-' + data.id + '_product-' + data.product_id + '">\
         <div class="order-list">\
            <div class="author-info">\
               <div class="img-holder">\
                  <figure>\
                     <a href="#"><img src="./uploads/products/' + data.url_photo + '"> </a>\
                  </figure>\
               </div>\
               <div class="text-holder">\
                  <h6>' + data.merchant_name + '</h6>\
                  <address></address>' + data.product_name + '\
                  <span class="price">' + data.price + '€</span>\
               </div>\
            </div>\
            <div class="post-time">\
               <span data-disableOrderCancellation="'+ disableOrderCancellation + '">\
                  <span style="float: right; padding: 5px 0px 5px;">\
                     <a class="order_cancel" style="color: #c33332; cursor: pointer;">\
                        <i class="icon-delete" style="cursor: pointer; font-size: 20px"></i>\
                     </a>\
                  </span>\
               </span>\
               <span>' + data.zip_code + '</span>\
            </div>\
            <span class="date-time">' + data.date + '</span>\
            <div class="order-btn">\
               <a href="#" data-toggle="modal" data-target="#order_detail_' + data.id + '">Detalhes de Encomenda</a>\
               <span data-canceled="' + data.canceled + '" data-accepted="' + data.accepted + '" data-pending="' + data.pending + '" data-completed="' + data.completed + '" class="order-status"></span>\
            </div>\
         </div>\
      </div>\
   ');
}


function getHtmlMerchantOrders(data) {
   return $('\
      <li>\
         <div>' + data.id + '</div>\
         <div>' + data.product_name + '</div>\
         <div>' + data.date + '</div>\
         <div>' + data.total + '€</div>\
         <div>' + data.client_name + '</div>\
         <div class="order-btn">\
            <span data-canceled="' + data.canceled + '" data-accepted="' + data.accepted + '" data-pending="' + data.pending + '" data-completed="' + data.completed + '" class="order-status"></span>\
         </div>\
         <div>\
            <a href="#" data-toggle="modal" data-target="#order_detail_' + data.id + '"><i class="icon-plus2 text-color"></i></a>\
         </div>\
      </li>\
   ');
}


function getHtmlDriverOrders(data) {
   return $('\
      <li>\
         <div class="order-id">' + data.id + '</div>\
         <div>' + data.merchant_name + '</div>\
         <div>' + data.client_name + '</div>\
         <div>' + data.date + '</div>\
         <div class="order-btn">\
            <span data-pending="' + data.pending + '" data-completed="' + data.completed + '" class="order-status"></span>\
         </div>\
         <div>\
            <a href="#" data-toggle="modal" data-target="#order_detail_' + data.id + '"><i class="icon-plus2 text-color"></i></a>\
         </div>\
      </li>\
   ');
}


function getHtmlModalOrders(data) {
   return $('\
      <div class="modal fade menu-order-detail order-detail" id="order_detail_' + data.id + '" tabindex="-1" role="dialog">\
         <div class="modal-dialog" style="width: 60%;">\
            <div class="modal-content">\
               <div class="modal-header">\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\
                  <h2>Detalhes de Encomenda</h2>\
               </div>\
               <div class="modal-body">\
                  <div class="order-detail-inner">\
                     <div class="description-holder">\
                        <div class="row">\
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
                              <div class="list-detail-options has-checkbox">\
                                 <h3>Comerciante</h3>\
                                 <ul class="order-detail-options">\
                                    <li class="order-number">\
                                       <strong>ID de Encomenda:</strong>\
                                       <span>' + data.id + '</span>\
                                    </li>\
                                    <li class="order-number">\
                                       <strong>Nome do Comerciante:</strong>\
                                       <span>' + data.merchant_name + '</span>\
                                    </li>\
                                    <li class="created-date">\
                                       <strong>Data de Entrega:</strong>\
                                       <span>' + data.date + '</span>\
                                    </li>\
                                    <li class="order-type">\
                                       <strong>Pagamento:</strong>\
                                       <span>Aprovado</span>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div>\
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
                              <div class="list-detail-options has-checkbox">\
                                 <h3>Cliente</h3>\
                                 <ul class="order-detail-options">\
                                    <li>\
                                       <strong>Nome do Cliente:</strong>\
                                       <span>' + data.client_name + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Nº Telemóvel:</strong>\
                                       <span>' + data.client_phone_number + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Email:</strong>\
                                       <span>' + data.client_email + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Morada:</strong>\
                                       <span>' + data.address + ", " + data.zip_code + '</span>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div><br><br>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <h2 class="heading">Produtos </h2>\
                              <div class="responsive-table">\
                                 <ul class="categories-order table-generic">\
                                    <li class="order-heading-titles">\
                                       <div>Produto</div>\
                                       <div>Preço</div>\
                                    </li>\
                                    <li class="order-heading-titles">\
                                       <div>\
                                          <h4>' + data.product_name + '</h4>\
                                          <h5>' + data.description + '</h5>\
                                       </div>\
                                       <div><span class="category-price">' + data.price + '€</span>\
                                       </div>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="row">\
                                 <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">\
                                    <h3>Encomenda Total</h3>\
                                 </div>\
                                 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\
                                    <ul class="order-detail-options order-total">\
                                       <li class="created-date">\
                                          <strong>Subtotal:</strong>\
                                          <span>' + data.price + '€</span>\
                                       </li>\
                                       <li class="order-type">\
                                          <strong>\
                                             Portes de Envio:</strong>\
                                          <span>' + data.pick_up_fee + '€</span>\
                                       </li>\
                                       <li class="order-type">\
                                          <strong>IVA (' + data.vat / 0.01 + '%)</strong>\
                                          <span>' + (data.total / (1 + data.vat)).toFixed(2) + '€</span>\
                                       </li>\
                                       <li class="order-type total-price">\
                                          <strong>Total:</strong>\
                                          <span>' + data.total + '€</span>\
                                       </li>\
                                    </ul>\
                                 </div>\
                              </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
      <script>\
         (function ($) {\
            $(document).ready(function () {\
               $(".order-detail .modal-dialog .modal-content").mCustomScrollbar({\
                  setHeight: 570,\
                  theme: "minimal-dark",\
                  mouseWheelPixels: 100\
               });\
            });\
         })(jQuery);\
      </script>\
   ');
}


function getHtmlModalMerchantOrders(data) {
   return $('\
      <div class="modal fade menu-order-detail order-detail" id="order_detail_' + data.id + '" tabindex="-1" role="dialog">\
         <div class="modal-dialog" style="width: 60%;">\
            <div class="modal-content">\
               <div class="modal-header">\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\
                  <h2>Detalhes de Venda</h2>\
               </div>\
               <div class="modal-body">\
                  <div class="order-detail-inner">\
                     <div class="description-holder">\
                        <div class="row">\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="list-detail-options has-checkbox">\
                                 <h3>Cliente</h3>\
                                 <ul class="order-detail-options">\
                                    <li>\
                                       <strong>Nome do Cliente:</strong>\
                                       <span>' + data.client_name + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Nº Telemóvel do Cliente:</strong>\
                                       <span>' + data.client_phone_number + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Email do Cliente:</strong>\
                                       <span>' + data.client_email + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Morada do Cliente:</strong>\
                                       <span>' + data.address + ", " + data.zip_code + '</span>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div><br><br>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <h2 class="heading">Produtos </h2>\
                              <div class="responsive-table">\
                                 <ul class="categories-order table-generic">\
                                    <li class="order-heading-titles">\
                                       <div>Produto</div>\
                                       <div>Preço</div>\
                                    </li>\
                                    <li class="order-heading-titles">\
                                       <div>\
                                          <h4>' + data.product_name + '</h4>\
                                          <h5>' + data.description + '</h5>\
                                       </div>\
                                       <div><span class="category-price">' + data.price + '€</span>\
                                       </div>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="row">\
                                 <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">\
                                    <h3>Encomenda Total</h3>\
                                 </div>\
                                 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\
                                    <ul class="order-detail-options order-total">\
                                       <li class="created-date">\
                                          <strong>Subtotal:</strong>\
                                          <span>' + data.price + '€</span>\
                                       </li>\
                                       <li class="order-type">\
                                          <strong>\
                                             Portes de Envio:</strong>\
                                          <span>' + data.pick_up_fee + '€</span>\
                                       </li>\
                                       <li class="order-type">\
                                          <strong>IVA (' + data.vat / 0.01 + '%)</strong>\
                                          <span>' + (data.total / (1 + data.vat)).toFixed(2) + '€</span>\
                                       </li>\
                                       <li class="order-type total-price">\
                                          <strong>Total:</strong>\
                                          <span>' + data.total + '€</span>\
                                       </li>\
                                    </ul>\
                                 </div>\
                              </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
      <script>\
         (function ($) {\
            $(document).ready(function () {\
               $(".order-detail .modal-dialog .modal-content").mCustomScrollbar({\
                  setHeight: 570,\
                  theme: "minimal-dark",\
                  mouseWheelPixels: 100\
               });\
            });\
         })(jQuery);\
      </script>\
   ');
}


function getHtmlModalDriverOrders(data) {
   return $('\
      <div class="modal fade menu-order-detail order-detail" id="order_detail_' + data.id + '" tabindex="-1" role="dialog">\
         <div class="modal-dialog" style="width: 60%;">\
            <div class="modal-content">\
               <div class="modal-header">\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\
                  <h2>Detalhes de Entrega</h2>\
               </div>\
               <div class="modal-body">\
                  <div class="order-detail-inner">\
                     <div class="description-holder">\
                        <div class="row">\
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
                              <div class="list-detail-options has-checkbox">\
                                 <h3>Comerciante</h3>\
                                 <ul class="order-detail-options">\
                                    <li class="order-number">\
                                       <strong>ID de Encomenda:</strong>\
                                       <span>' + data.id + '</span>\
                                    </li>\
                                    <li class="order-number">\
                                       <strong>Nome do Comerciante:</strong>\
                                       <span>' + data.merchant_name + '</span>\
                                    </li>\
                                    <li class="created-date">\
                                       <strong>Data de Entrega:</strong>\
                                       <span>' + data.date + '</span>\
                                    </li>\
                                    <li class="order-type">\
                                       <strong>Pagamento:</strong>\
                                       <span>Aprovado</span>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div>\
                           <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
                              <div class="list-detail-options has-checkbox">\
                                 <h3>Cliente</h3>\
                                 <ul class="order-detail-options">\
                                    <li>\
                                       <strong>Nome do Cliente:</strong>\
                                       <span>' + data.client_name + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Nº Telemóvel:</strong>\
                                       <span>' + data.client_phone_number + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Email:</strong>\
                                       <span>' + data.client_email + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Morada:</strong>\
                                       <span>' + data.address + ", " + data.zip_code + '</span>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div><br><br>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <h2 class="heading">Produtos </h2>\
                              <div class="responsive-table">\
                                 <ul class="categories-order table-generic">\
                                    <li class="order-heading-titles">\
                                       <div>Produto</div>\
                                       <div>Preço</div>\
                                    </li>\
                                    <li class="order-heading-titles">\
                                       <div>\
                                          <h4>' + data.product_name + '</h4>\
                                          <h5>' + data.description + '</h5>\
                                       </div>\
                                       <div><span class="category-price">' + data.price + '€</span>\
                                       </div>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="row">\
                                 <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">\
                                    <h3>Encomenda Total</h3>\
                                 </div>\
                                 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\
                                    <ul class="order-detail-options order-total">\
                                       <li class="created-date">\
                                          <strong>Subtotal:</strong>\
                                          <span>' + data.price + '€</span>\
                                       </li>\
                                       <li class="order-type">\
                                          <strong>\
                                             Portes de Envio:</strong>\
                                          <span>' + data.pick_up_fee + '€</span>\
                                       </li>\
                                       <li class="order-type">\
                                          <strong>IVA (' + data.vat / 0.01 + '%)</strong>\
                                          <span>'+ (data.total / (1 + data.vat)).toFixed(2) + '€</span>\
                                       </li>\
                                       <li class="order-type total-price">\
                                          <strong>Total:</strong>\
                                          <span>' + data.total + '€</span>\
                                       </li>\
                                    </ul>\
                                 </div>\
                              </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
      <script>\
         (function ($) {\
            $(document).ready(function () {\
               $(".order-detail .modal-dialog .modal-content").mCustomScrollbar({\
                  setHeight: 570,\
                  theme: "minimal-dark",\
                  mouseWheelPixels: 100\
               });\
            });\
         })(jQuery);\
      </script>\
   ');
}


function getHtmlProductsInAccount(data) {
   return $('\
      <div class="col-lg-6 col-md-12 col-sm-12 col-xs-12" id="product-' + data.id + '">\
         <div class="order-list">\
            <div class="author-info">\
               <div class="img-holder">\
                  <figure>\
                     <a><img class="data.url_photo" src="./uploads/products/' + data.product_url_photo + '"> </a>\
                  </figure>\
               </div>\
               <div class="text-holder">\
                  <h6><a class="data-product-name">' + data.product_name + '</a></h6>\
                  <address class="data-stock">' + data.stock + '</address>\
                  <span class="price data-price">' + data.price + '€</span>\
               </div>\
            </div>\
            <div class="post-time">\
               <span class="data-description">' + data.description + '</span>\
            </div><br>\
            <div class="order-btn">\
               <a style="border:none;" data-target="#order_detail" data-toggle="modal" href="#"></a>\
               <span style="font-size: 11px;background-color: rgb(195, 51, 50);cursor: pointer;" data-accepted="1" data-canceled="0" class="delete-product order-status">Apagar</span>\
               <span onclick="document.getElementById('+ "'div-edit-product-data'" + ').style.display=' + "'block'" + '"  style="font-size: 11px;background-color: #1e73be; cursor: pointer;" data-accepted="1" data-canceled="0" class="span-edit-product-data order-status">Editar dados</span>\
               <span onclick="document.getElementById('+ "'div-edit-product-photo'" + ').style.display=' + "'block'" + '" style="font-size: 11px;background-color: #e6d415;cursor: pointer;" data-accepted="1" data-canceled="0" class="span-edit-product-photo order-status">Editar foto</span>\
            </div>\
            \
            <div class="modal fade menu-order-detail order-detail" id="order_detail" tabindex="-1" role="dialog">\
               <div class="modal-dialog">\
                  <div class="modal-content">\
                     <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\
                        <h2>Detalhes de Encomenda</h2>\
                     </div>\
                     <div class="modal-body">\
                        <div class="order-detail-inner">\
                           <div class="description-holder">\
                              <div class="row">\
                                 <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
                                    <div class="list-detail-options has-checkbox">\
                                       <h3>Comerciante de Demonstração </h3>\
                                       <ul class="order-detail-options">\
                                          <li class="order-number">\
                                             <strong>ID de Encomenda:</strong>\
                                             <span>' + data.id + '</span>\
                                          </li>\
                                          <li class="order-number">\
                                             <strong>Nome do Comerciante:</strong>\
                                             <span>' + data.merchant_name + '</span>\
                                          </li>\
                                          <li class="created-date">\
                                             <strong>Data de Entrega:</strong>\
                                             <span>' + data.date + '</span>\
                                          </li>\
                                          <li class="order-type">\
                                             <strong>Pagamento:</strong>\
                                             <span>Aprovado</span>\
                                          </li>\
                                       </ul>\
                                    </div>\
                                 </div>\
                                 <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">\
                                    <div class="list-detail-options has-checkbox">\
                                       <h3>Detalhe de Encomenda</h3>\
                                       <ul class="order-detail-options">\
                                          <li>\
                                             <strong>Nome do Cliente:</strong>\
                                             <span>' + data.client_name + '</span>\
                                          </li>\
                                          <li>\
                                             <strong>Nº Telemóvel:</strong>\
                                             <span>' + data.client_phone_number + '</span>\
                                          </li>\
                                          <li>\
                                             <strong>Email:</strong>\
                                             <span>' + data.client_email + '</span>\
                                          </li>\
                                          <li>\
                                             <strong>Morada:</strong>\
                                             <span>' + data.address + '</span>\
                                          </li>\
                                       </ul>\
                                    </div>\
                                 </div><br><br>\
                                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                                    <h2 class="heading">Produtos </h2>\
                                    <div class="responsive-table">\
                                       <ul class="categories-order table-generic">\
                                          <li class="order-heading-titles">\
                                             <div>Produto</div>\
                                             <div>Preço</div>\
                                          </li>\
                                          <li class="order-heading-titles">\
                                             <div>\
                                                <h4>' + data.product_name + '</h4>\
                                                <h5>' + data.description + '</h5>\
                                             </div>\
                                             <div><span class="category-price">' + data.price + '€</span>\
                                             </div>\
                                          </li>\
                                       </ul>\
                                    </div>\
                                 </div>\
                                 <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                                    <div class="row">\
                                       <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">\
                                          <h3>Encomenda Total</h3>\
                                       </div>\
                                       <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\
                                          <ul class="order-detail-options order-total">\
                                             <li class="created-date">\
                                                <strong>Subtotal:</strong>\
                                                <span>' + data.price + '€</span>\
                                             </li>\
                                             <li class="order-type">\
                                                <strong>\
                                                   Portes de Envio:</strong>\
                                                <span>' + data.pick_up_fee + '€</span>\
                                             </li>\
                                             <li class="order-type">\
                                                <strong>IVA (' + data.vat / 0.01 + '%)</strong>\
                                                <span>'+ (data.total / (1 + data.vat)).toFixed(2) + '€</span>\
                                             </li>\
                                             <li class="order-type total-price">\
                                                <strong>Total:</strong>\
                                                <span>' + data.total + '€</span>\
                                             </li>\
                                          </ul>\
                                       </div>\
                                    </div>\
                                 </div>\
                              </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
            <script>\
               (function ($) {\
                  $(document).ready(function () {\
                     $(".order-detail .modal-dialog .modal-content").mCustomScrollbar({\
                        setHeight: 575,\
                        theme: "minimal-dark",\
                        mouseWheelPixels: 100\
                     });\
                  });\
               })(jQuery);\
            </script>\
         </div>\
      </div>\
   ');
}


function getHtmlAllUsers(data) {
   return $('\
      <li>\
         <div class="user-id">' + data.id + '</div>\
         <div>' + data.username + '</div>\
         <div>' + data.email + '</div>\
         <div class="type-user">' + data.type + '</div>\
         <div>\
            <span data-type="' + data.type + '" class="order-status"></span>\
         </div>\
      </li>\
   ');
}


function getHtmlAllUsersNotAccepted(data) {
   return $('\
      <li>\
         <div class="user-id">' + data.id + '</div>\
         <div>' + data.username + '</div>\
         <div>' + data.name + '</div>\
         <div>' + data.email + '</div>\
         <div class="type-user">' + data.type + '</div>\
         <div>\
            <span data-type="' + data.type + '" class="order-status"></span>\
         </div>\
         <div>\
            <a href="#" data-toggle="modal" data-target="#order_detail_' + data.id + '"><i class="icon-plus2 text-color"></i></a>\
         </div>\
      </li>\
   ');
}


function getHtmlModalUserDetail(data) {
   return $('\
      <div class="modal fade menu-order-detail order-detail" id="order_detail_' + data.id + '" tabindex="-1" role="dialog">\
         <div class="modal-dialog" style="width: 35%;">\
            <div class="modal-content">\
               <div class="modal-header">\
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\
                  <h2>Detalhes de Utilizador</h2>\
               </div>\
               <div class="modal-body">\
                  <div class="order-detail-inner">\
                     <div class="description-holder">\
                        <div class="row">\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="list-detail-options has-checkbox">\
                                 <h3>Utilizador</h3>\
                                 <ul class="order-detail-options">\
                                    <li>\
                                       <strong>Nome do Utilizador:</strong>\
                                       <span>' + data.name + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Nº Telemóvel do Cliente:</strong>\
                                       <span>' + data.phone_number + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Email do Utilizador:</strong>\
                                       <span>' + data.email + '</span>\
                                    </li>\
                                    <li>\
                                       <strong>Morada do Utilizador:</strong>\
                                       <span>' + data.address + ", " + data.zip_code + '</span>\
                                    </li>\
                                 </ul>\
                              </div>\
                           </div><br><br>\
                           <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="row">\
                                 <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">\
                                    <h3>Foto</h3>\
                                 </div>\
                                 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\
                                    <ul class="order-detail-options order-total">\
                                       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                                          <figure>\
                                             <a><img src="./uploads/photos/' + data.url_photo + '" class="attachment-full size-full wp-post-image" alt=""></a>\
                                          </figure>\
                                       </div>\
                                    </ul>\
                                 </div>\
                              </div>\
                           </div><br><br>\
                           <div data-driving-license="' + data.type + '" class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                              <div class="row">\
                                 <div class="col-lg-8 col-md-8 col-sm-8 col-xs-12">\
                                    <h3>Carta de Condução</h3>\
                                 </div>\
                                 <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12">\
                                    <ul class="order-detail-options order-total">\
                                       <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">\
                                          <figure>\
                                             <a><img src="./images/pdf.png" class="attachment-full size-full wp-post-image" alt=""></a>\
                                          </figure>\
                                       </div>\
                                    </ul>\
                                 </div>\
                              </div>\
                           </div>\
                        </div>\
                     </div>\
                  </div>\
               </div>\
            </div>\
         </div>\
      </div>\
      <script>\
         (function ($) {\
            $(document).ready(function () {\
               $(".order-detail .modal-dialog .modal-content").mCustomScrollbar({\
                  setHeight: 450,\
                  theme: "minimal-dark",\
                  mouseWheelPixels: 100\
               });\
            });\
         })(jQuery);\
      </script>\
   ');
}


function getHtmlAllOrdersNotAccepted(data) {
   return $('\
      <li>\
         <div class="order-id">' + data.id + '</div>\
         <div>' + data.merchant_name + '</div>\
         <div>' + data.product_name + '</div>\
         <div>' + data.address + ", " + data.zip_code + '</div>\
         <div class="order-btn">\
            <span data-accepted="' + data.accepted + '" data-canceled="' + data.canceled + '" class="order-status"></span>\
         </div>\
         <div>\
            <a href="#" data-toggle="modal" data-target="#order_detail_' + data.id + '"><i class="icon-plus2 text-color"></i></a>\
         </div>\
      </li>\
   ');
}