$(window).ready(() => {
   // clicar no botão de registar cliente
   $("#form-register-client").submit((e) => {
      e.preventDefault();
      registerClient();
   });


   // clicar no botão de registar empresa
   $("#form-register-merchant").submit((e) => {
      e.preventDefault();
      registerMerchant();
   });


   // clicar no botão de registar condutor
   $("#form-register-driver").submit((e) => {
      e.preventDefault();
      registerDriver();
   });


   // clicar no botão de registar admin
   $("#form-register-admin").submit((e) => {
      e.preventDefault();
      registerAdmin();
   });


   $("input[name='receive_advertising']").change(() => {
      var currentElement = $("input[name='receive_advertising']");
      var isChecked = currentElement.is(":checked");

      if (isChecked)
         currentElement.val("1");
      else
         currentElement.val("0");
   });
});