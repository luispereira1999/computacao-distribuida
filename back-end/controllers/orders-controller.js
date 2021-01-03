const database = require("../utils/database");
var Product = require("../models/product");
var Order = require("../models/order");


module.exports = {
   create: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req);
      if (errors.exist)
         return res.status(400).json({ "message": errors.message.join(" | ") });

      var stock = await checkStockAvailable(db, req.body.product_id);
      if (!stock.available)
         return res.status(400).json({ "message": stock.message });

      var order = new Order({ "product_id": req.body.product_id, "user_id": req.user.id });

      // inserir na tabela encomendas
      var sql = "INSERT INTO Orders (accepted, canceled, product_id, user_id) VALUES (0, 0, ?, ?)";
      var params = [order.product_id, order.user_id];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

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


function checkFields(req) {
   var errors = [];

   if (!req.body.product_id)
      errors.push("Ups! O ID do produto não foi preenchido.");

   if (errors.length)
      return { "exist": true, "message": errors };
   return { "exist": false };
}


function checkStockAvailable(db, productId) {
   return new Promise((resolve) => {
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
   return new Promise((resolve) => {
      var product = new Product({ "id": productId });

      var sql = "SELECT stock FROM Products WHERE id = ? AND deleted = 0";
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
   return new Promise((resolve) => {
      var sql = "UPDATE Products SET stock = ? WHERE id = ?";
      var params = [product.stock, product.id];
      var stock = { "error": false };

      db.run(sql, params, function (err) {
         if (err)
            return stock = { "error": true, "message": "Oh! " + err.message };

         return stock = { "error": false };
      }, () => {
         resolve(stock);
      });
   });
}