const database = require("../utils/database");
var Order = require("../models/order");
var Delivery = require("../models/delivery");


module.exports = {
   accept: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, 1);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var orderExist = await checkOrderExist(db, req.body.order_id);
      if (!orderExist.exist)
         return res.status(400).json({ "message": orderExist.message });

      var allData = Object.assign({ "order_id": req.body.order_id, "user_id": req.user.id });
      var delivery = new Delivery(allData);

      // inserir na tabela encomendas
      var sql = "INSERT INTO Deliveries (order_id, user_id, pending, completed) VALUES (?, ?, 1, 0)";
      var params = [delivery.order_id, delivery.user_id];
      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         var order = new Order({ "id": req.body.order_id });

         // atualizar entrega na base de dados
         var sql = "UPDATE Orders SET accepted = 1 WHERE id = ? AND user_id = ?";
         var params = [order.id, delivery.user_id];
         db.run(sql, params, err => {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });
         });

         res.status(201).json({ "message": "Entrega aceite com sucesso!" });
      });

      db.close();
   },


   complete: async (req, res) => {
      const db = database.connect();

      var allData = Object.assign({ "order_id": req.body.order_id, "user_id": req.user.id });
      var delivery = new Delivery(allData);

      // atualizar entrega na base de dados
      var sql = "UPDATE Deliveries SET pending = 0, completed = 1 WHERE order_id = ? AND user_id = ? AND pending = 1 AND completed = 0";
      var params = [delivery.order_id, delivery.user_id];
      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! A entrega não existe ou já foi entregue pelo condutor." });

         res.status(200).json({ "message": "Entrega concluída com sucesso!" });
      });

      db.close();
   }
};


function checkInvalidFields(req) {
   var errors = [];

   if (!req.body.order_id)
      errors.push("Ups! O ID da encomenda não foi preenchido.");

   if (errors.length)
      return ({ "exist": true, "message": errors });
   else return ({ "exist": false });
}


function checkOrderExist(db, orderId) {
   return new Promise(resolve => {
      var order = new Order({ "id": orderId });
      var sql = "SELECT accepted FROM Orders WHERE id = ? AND canceled = 0";
      var params = order.id;
      var orderExist = { "exist": false, "message": "Ups! A encomenda não existe ou foi cancelada." };

      db.each(sql, params, (err, row) => {
         if (err)
            return orderExist = { "exist": false, "message": "Oh! " + err.message };

         if (row.accepted == 1)
            return orderExist = { "exist": false, "message": "Ups! A encomenda já foi aceitada." };

         return orderExist = { "exist": true };
      }, () => {
         resolve(orderExist);
      });
   });
}