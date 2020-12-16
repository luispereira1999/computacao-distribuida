const database = require("../utils/database");
var Merchant = require("../models/merchant");
var Product = require("../models/product");


module.exports = {
   getAll: async (req, res) => {
      const db = database.connect();

      // selecionar produtos na base de dados
      var sql = "SELECT * FROM Products";
      var params = [];
      db.all(sql, params, function (err, rows) {
         if (err) {
            return res.status(500).json({ "error": err.message });
         }

         res.json({
            "message": "Produtos obtidos com sucesso!",
            "data": rows
         });
      });

      db.close();
   },


   getOne: async (req, res) => {
      const db = database.connect();

      var product = new Product(req.params);

      // selecionar produto na base de dados
      var sql = "SELECT * FROM Products WHERE id = ?";
      var params = [product.id];
      db.get(sql, params, function (err, row) {
         if (err) {
            return res.status(500).json({ "error": err.message });
         }

         if (row) {
            res.json({
               "message": "Produto obtido com sucesso!",
               "data": row
            });
         }
         else
         res.json({
            "message": "Oh! Produto não existe!"
         });
      });

      db.close();
   },


   new: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 1);
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var product = new Product(req.body);
      var merchant = new Merchant({ "id": req.user.id })

      // inserir na tabela produtos
      var sql = "INSERT INTO Products (name, stock, merchant_id) VALUES (?, ?, ?)";
      var params = [product.name, product.stock, merchant.id];
      db.run(sql, params, function (err) {
         if (err) {
            return res.status(500).json({ "error": err.message });
         }

         res.json({
            "message": "Produto registado com sucesso!",
         });
      });

      db.close();
   },
};


function checkFields(req, typeUser) {
   var errors = [];

   if (typeUser == 1) {
      if (!req.body.name) {
         errors.push("O nome do produto não foi preenchido.");
      }
      if (!req.body.stock) {
         errors.push("A quantidade de stock não foi preenchida.");
      }
      if (!req.body.merchant_id) {
         errors.push("O ID da empresa não foi preenchida.");
      }
      if (errors.length) {
         return ({
            "exist": true,
            "message": errors
         });
      }
   }

   return ({ "exist": false });
}