$(window).ready(() => {
   // clicar no botão de registar cliente
   $("#form-register-client").submit(e => {
      e.preventDefault();
      registerClient();
   });


   // clicar no botão de registar empresa
   $("#form-register-merchant").submit(e => {
      e.preventDefault();
      registerMerchant();
   });


   // clicar no botão de registar condutor
   $("#form-register-driver").submit(e => {
      e.preventDefault();
      registerDriver();
   });


   // clicar no botão de registar admin
   $("#form-register-admin").submit(e => {
      e.preventDefault();
      registerAdmin();
   });


   // clicar no botão de fazer login
   $("#form-login").submit(e => {
      e.preventDefault();
      login();
   });


   // clicar no botão de criar produto
   $("#form-create-product").submit(e => {
      e.preventDefault();
      createProduct();
   });


   // clicar na checkbox de receber publicidades no registo
   $("input[name='receive_advertising']").change(() => {
      var currentElement = $("input[name='receive_advertising']");
      var isChecked = currentElement.is(":checked");

      if (isChecked)
         currentElement.val("1");
      else
         currentElement.val("0");
   });
});