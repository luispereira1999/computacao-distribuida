const database = require("../utils/database");
var User = require("../models/user");
var Product = require("../models/product");
var Order = require("../models/order");


module.exports = {
   getFromUser: async (req, res) => {
      const db = database.connect();

      var user = new User(req.user);

      // selecionar produtos na base de dados
      var sql = "SELECT * FROM Orders WHERE user_id = ?";
      var params = user.id;
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem encomendas." });
         else
            res.status(200).json({ "message": "Encomendas obtidas com sucesso!", "data": rows });
      });

      db.close();
   },


   getFromMerchant: async (req, res) => {
      const db = database.connect();

      var user = new User(req.user);

      // selecionar produtos na base de dados
      var sql = "SELECT Orders.id, Orders.accepted, Orders.canceled, Orders.user_id, Products.name FROM Orders INNER JOIN Products ON Orders.user_id = Products.id WHERE Orders.user_id = ?";
      var params = user.id;
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem encomendas." });
         else
            res.status(200).json({ "message": "Encomendas obtidas com sucesso!", "data": rows });
      });

      db.close();
   },


   create: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var stock = await checkStockAvailable(db, req.body.product_id);
      if (!stock.available)
         return res.status(400).json({ "message": stock.message });

      var order = new Order({ "product_id": req.body.product_id, "user_id": req.user.id });

      // inserir na tabela encomendas
      var sql = "INSERT INTO Orders (accepted, canceled, product_id, user_id) VALUES (0, 0, ?, ?)";
      var params = [order.product_id, order.user_id];
      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         // atualizar entrega na base de dados
         var sql = "UPDATE Products SET stock = stock - 1 WHERE id = ?";
         var params = [order.product_id];
         db.run(sql, params, err => {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });
         });

         res.status(201).json({ "message": "Encomenda criada com sucesso!" });
      });

      db.close();
   },


   cancel: async (req, res) => {
      const db = database.connect();

      var product = new Product({ "id": req.body.product_id });
      var order = new Order({ "id": req.body.order_id, "product_id": req.body.product_id, "user_id": req.user.id });

      var stock = await getStock(db, product.id);
      if (stock.error)
         return res.status(400).json({ "message": stock.message });
      else
         product.stock = stock.value - 1;
      console.log("a:::", stock)
      // atualizar encomenda na base de dados
      var sql = "UPDATE Orders SET canceled = 1 WHERE id = ? AND product_id = ? AND user_id = ? AND accepted = 0 AND canceled = 0";
      var params = [order.id, order.product_id, order.user_id];
      db.run(sql, params, async function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! A encomenda não está disponível para cancelar." });

         var updatedStock = await updateStock(db, product);
         if (updatedStock.error)
            return res.status(400).json({ "message": updatedStock.message });

         res.status(200).json({ "message": "Encomenda cancelada com sucesso!" });
      });

      db.close();
   }
};


function checkInvalidFields(req) {
   var errors = [];

   if (!req.body.product_id)
      errors.push("Ups! O ID do produto não foi preenchido.");

   if (errors.length)
      return { "exist": true, "message": errors };
   return { "exist": false };
}


function checkStockAvailable(db, productId) {
   return new Promise(resolve => {
      var product = new Product({ "id": productId });

      var sql = "SELECT stock FROM Products WHERE id = ?";
      var params = product.id;
      var stock = { "available": false, "message": "Ups! O produto não existe." };

      db.each(sql, params, (err, row) => {
         if (err)
            return stock = { "available": false, "message": "Oh! " + err.message };

         if (row.stock <= 0)
            stock = { "available": false, "message": "Ups! O stock esgotou." };
         else
            return stock = { "available": true };
      }, () => {
         resolve(stock);
      });
   });
}


function getStock(db, productId) {
   return new Promise(resolve => {
      var product = new Product({ "id": productId });

      var sql = "SELECT stock FROM Products WHERE id = ?";
      var params = product.id;
      var stock = { "error": true, "message": "Ups! O produto não existe." };

      db.each(sql, params, (err, row) => {
         if (err)
            return stock = { "error": true, "message": "Oh! " + err.message };

         return stock = { "error": false, "value": row.stock };
      }, () => {
         resolve(stock);
      });
   });
}


function updateStock(db, product) {
   return new Promise(resolve => {
      var sql = "UPDATE Products SET stock = ? WHERE id = ?";
      var params = [product.stock, product.id];
      var stock = { "error": false };

      db.run(sql, params, err => {
         if (err)
            return stock = { "error": true, "message": "Oh! " + err.message };

         return stock = { "error": false };
      }, () => {
         resolve(stock);
      });
   });
}