const database = require("../utils/database");
var User = require("../models/user");
var Product = require("../models/product");
var Order = require("../models/order");


module.exports = {
   getFromUser: async (req, res) => {
      const db = database.connect();

      var user = new User(req.user);

      // selecionar encomendas do utilizador na base de dados
      var sql = "\
         SELECT\
            Orders.id, Orders.address, Orders.zip_code, Orders.date, Orders.vat, Orders.pick_up_fee, Orders.total, Orders.accepted, Orders.canceled,\
            Products.name as product_name, Products.price, Products.description, Products.urL_photo as url_photo,\
            Merchants.name as merchant_name,\
            Clients.name as client_name, Clients.email as client_email, Clients.phone_number as client_phone_number\
         FROM Orders\
         INNER JOIN Products ON Orders.product_id = Products.id\
         INNER JOIN Users as Clients ON Clients.id = Orders.user_id\
         INNER JOIN Users as Merchants ON Merchants.id = Products.user_id\
         WHERE Orders.user_id = ?\
      ";
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

      // selecionar encomendas da empresa feitas por utilizadores na base de dados
      var sql = "\
         SELECT\
            Orders.id, Orders.address, Orders.date, Orders.vat, Orders.pick_up_fee, Orders.total, Orders.accepted, Orders.canceled,\
            Products.name as product_name, Products.price, Products.description,\
            Clients.name as client_name, Clients.email as client_email, Clients.phone_number as client_phone_number\
         FROM Orders\
         INNER JOIN Products ON Orders.user_id = Products.id\
         INNER JOIN Users as Clients ON Clients.id = Orders.user_id\
         WHERE Products.user_id = ?\
      ";

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


   getFromDriver: async (req, res) => {
      const db = database.connect();

      var user = new User(req.user);

      // selecionar encomendas do condutor entregues pelo condutor na base de dados
      var sql = "\
		   SELECT\
			   Orders.id as order_id, Orders.address, Orders.date, Orders.total, Deliveries.pending, Deliveries.completed,\
		      Deliveries.user_id as delivery_id,\
            Clients.name as client_name,\
            Products.name as product_name,\
			   Merchants.name as merchant_name\
		      FROM Deliveries\
         INNER JOIN Orders ON Orders.id = Deliveries.order_id\
         INNER JOIN Users as Clients ON Clients.id = Deliveries.user_id\
		   INNER JOIN Products ON Products.id = Deliveries.order_id\
		   INNER JOIN Users as Merchants ON Merchants.id = Products.user_id\
		   WHERE Deliveries.user_id = ?\
      ";

      var params = user.id;
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem encomendas entregues." });
         else
            res.status(200).json({ "message": "Encomendas entregues obtidas com sucesso!", "data": rows });
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

      var subtotal = await getPrice(db, req.body.product_id);
      if (subtotal.error)
         return res.status(400).json({ "message": subtotal.message });

      var date = new Date();
      var currentDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + ", " + date.getHours() + ":" + date.getMinutes();
      const vat = 0.23;
      const pickUpFee = 3.5;
      var total = calculateTotal(subtotal.value, vat, pickUpFee);

      var allData = Object.assign(req.body, { "user_id": req.user.id, "date": currentDate, "vat": vat, "pick_up_fee": pickUpFee, "total": total });
      var order = new Order(allData);

      // inserir encomenda na base de dados
      var sql = "INSERT INTO Orders (address, zip_code, date, vat, pick_up_fee, total, accepted, canceled, product_id, user_id) VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, ?)";
      var params = [order.address, order.zip_code, order.date, vat, pickUpFee, total, order.product_id, order.user_id];
      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         // atualizar stock do produto na base de dados
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

      // atualizar estado da encomenda na base de dados
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

   if (!req.body.address)
      errors.push("Ups! A morada não foi preenchida.");
   if (!req.body.zip_code)
      errors.push("Ups! O código postal não foi preenchido.");
   if (!req.body.product_id)
      errors.push("Ups! O ID do produto não foi preenchido.");

   if (errors.length)
      return { "exist": true, "message": errors };
   return { "exist": false };
}


function checkStockAvailable(db, productId) {
   return new Promise(resolve => {
      var product = new Product({ "id": productId });

      // selecionar stock na base de dados
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

      // selecionar stock do produto na base de dados
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


function getPrice(db, productId) {
   return new Promise(resolve => {
      var product = new Product({ "id": productId });

      // selecionar preço do produto na base de dados
      var sql = "SELECT price FROM Products WHERE id = ?";
      var params = product.id;
      var price = { "error": true, "message": "Ups! O produto não existe." };

      db.each(sql, params, (err, row) => {
         if (err)
            return price = { "error": true, "message": "Oh! " + err.message };

         return price = { "error": false, "value": row.price };
      }, () => {
         resolve(price);
      });
   });
}


function updateStock(db, product) {
   return new Promise(resolve => {
      // atualizar stock do produto na base de dados
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


function calculateTotal(subtotal, vat, pick_up_fee) {
   return (subtotal + pick_up_fee) * (1 + vat);
}