const database = require("../utils/database");
var Product = require("../models/product");
var Order = require("../models/order");
var User = require("../models/user");


module.exports = {
   create: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 1);
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var user = new User(req.user);

      // inserir na tabela encomendas
      var sql = "INSERT INTO Orders (accepted, canceled, client_id) VALUES (0, 0, ?)";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": err.message });

         var product = new Product(req.body);
         var order = new Order({ "id": this.lastID });

         // inserir na tabela produtos-encomendas
         var sql = "INSERT INTO ProductsOrders (product_id, order_id) VALUES (?, ?)";
         var params = [product.id, order.id];
         db.run(sql, params, function (err) {
            if (err)
               return res.status(500).json({ "error": err.message });

            res.status(201).json({ "message": "Encomenda criada com sucesso!" });
         });
      });

      db.close();
   },


   cancel: async (req, res) => {
      const db = database.connect();

      var product = new Product(req.params);
      var user = new User(req.user);

      // atualizar produto na base de dados
      var sql = "UPDATE Products SET deleted = 1 WHERE id = ? AND user_id = ?";
      var params = [product.id, user.id];
      db.run(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "error": err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O produto não existe ou não pertence a esta empresa." });

         res.status(200).json({ "message": "Produto excluído com sucesso!" });
      });

      db.close();
   }
};


function checkFields(req) {
   var errors = [];

   if (!req.body.id) {
      errors.push("O ID do produto não foi preenchido.");
   }
   if (errors.length) {
      return ({
         "exist": true,
         "message": errors
      });
   }

   return ({ "exist": false });
}