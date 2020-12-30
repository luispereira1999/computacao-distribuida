const database = require("../utils/database");
var Order = require("../models/order");
var Delivery = require("../models/delivery");
var User = require("../models/user");


module.exports = {
   accept: async (req, res) => {
      const db = database.connect();

      var orderExist = await checkOrderExist(db, req);
      if (!orderExist.exist)
         return res.status(400).json({ "error": orderExist.message });

      var allData = Object.assign({ "order_id": req.body.id, "user_id": req.user.id });
      var delivery = new Delivery(allData);

      // inserir na tabela encomendas
      var sql = "INSERT INTO Deliveries (pending, completed, order_id, user_id) VALUES (1, 0, ?, ?)";
      var params = [delivery.order_id, delivery.user_id];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "error": err.message });

         res.status(201).json({ "message": "Entrega aceite com sucesso!" });
      });

      db.close();
   },


   complete: async (req, res) => {
      const db = database.connect();

      var order = new Order(req.params);
      var user = new User(req.user);

      // atualizar produto na base de dados
      var sql = "UPDATE Orders SET canceled = 1 WHERE id = ? AND client_id = ? AND accepted = 0";
      var params = [order.id, user.id];
      db.run(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "error": err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! A encomenda não existe ou já foi aceite pelo condutor." });

         res.status(200).json({ "message": "Encomenda excluída com sucesso!" });
      });

      db.close();
   }
};


function checkOrderExist(db, req) {
   return new Promise((resolve) => {
      var order = new Order(req.body);
      var sql = "SELECT id FROM Orders WHERE id = ? LIMIT 1";
      var params = order.id;
      var orderExist = { "exist": false, "message": "Oh! A encomenda não existe." };

      db.each(sql, params, (err) => {
         if (err)
            return orderExist = {
               "exist": false,
               "message": err.message
            };

         return orderExist = { "exist": true };
      }, () => {
         resolve(orderExist);
      });
   });
}