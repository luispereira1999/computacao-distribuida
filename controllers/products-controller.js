const database = require("../utils/database");
const fs = require("fs");
const globalConfig = require("../utils/global-config.json");
var User = require("../models/user");
var Product = require("../models/product");


module.exports = {
   getByUserId: async (req, res) => {
      const db = database.connect();

      var user = new User(req.body);

      // selecionar produtos na base de dados
      var sql = "\
         SELECT\
            p.id, p.name AS product_name, p.stock, p.price, p.description, p.url_photo,\
            u.name AS user_name FROM Products AS p\
         INNER JOIN Users AS u ON u.id = p.user_id\
         WHERE p.deleted = 0 AND u.id = ?\
      ";
      var params = user.id;
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem produtos." });
         else
            res.status(200).json({ "message": "Produtos obtidos com sucesso!", "data": rows });
      });

      db.close();
   },


   getById: async (req, res) => {
      const db = database.connect();

      var product = new Product(req.params);

      // selecionar produto na base de dados
      var sql = "SELECT name, stock, price, url_photo, description FROM Products WHERE id = ? AND deleted = 0";
      var params = [product.id];
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (row)
            res.status(200).json({ "message": "Produto obtido com sucesso!", "data": row });
         else
            res.status(400).json({ "message": "Ups! O produto não existe." });
      });

      db.close();
   },


   getByName: async (req, res) => {
      const db = database.connect();

      var error = await checkFilter(req.params.filter);
      if (error.exist)
         return res.status(400).json({ "message": "Ups! O filtro não está disponível." });

      var product = new Product(req.params);

      // selecionar produto na base de dados
      var sql = "SELECT * FROM Products WHERE name LIKE ?";
      var params = "%" + product.name + "%";
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem produtos com este filtro." });
         else
            res.status(200).json({ "message": "Produto(s) obtido(s) com sucesso!", "data": rows });
      });

      db.close();
   },


   create: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "create");
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var allData = Object.assign(req.body, { "url_photo": req.file.filename });
      var product = new Product(allData);
      var user = new User(req.user);

      // inserir produto na base de dados
      var sql = "INSERT INTO Products (name, stock, price, description, url_photo, deleted, user_id) VALUES (?, ?, ?, ?, ?, 0, ?)";
      var params = [product.name, product.stock, product.price, product.description, product.url_photo, user.id];
      db.run(sql, params, err => {
         if (err) {
            removeFile(req.file.path);
            return res.status(500).json({ "message": "Oh! " + err.message });
         }

         res.status(201).json({ "message": "Produto criado com sucesso!" });
      });

      db.close();
   },


   editData: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "edit-data");
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var allData = Object.assign(req.body, { "id": req.params.id, "user_id": req.user.id });
      var product = new Product(allData);

      // atualizar dados do produto na base de dados
      var sql = "UPDATE Products SET name = ?, stock = ?, price = ?, description = ? WHERE id = ? AND user_id = ?";
      var params = [product.name, product.stock, product.price, product.description, product.id, product.user_id];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O produto não existe ou não pertence a esta empresa." });

         res.status(200).json({ "message": "Dados do produto editados com sucesso!" });
      });

      db.close();
   },


   editPhoto: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "edit-photo");
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var allData = Object.assign(req.body, { "id": req.params.id, "url_photo": req.file.filename, "user_id": req.user.id });
      var product = new Product(allData);

      // atualizar foto do produto na base de dados
      var sql = "UPDATE Products SET url_photo = ? WHERE id = ? AND user_id = ?";
      var params = [product.url_photo, product.id, product.user_id];
      db.run(sql, params, function (err) {
         if (err) {
            removeFile(req.file.path);
            return res.status(500).json({ "message": "Oh! " + err.message });
         }

         if (this.changes == 0) {
            removeFile(req.file.path);
            return res.status(400).json({ "message": "Ups! O produto não existe ou não pertence a esta empresa." });
         }

         res.status(200).json({ "message": "Foto do produto editada com sucesso!" });
      });

      db.close();
   },


   delete: async (req, res) => {
      const db = database.connect();

      var product = new Product(req.params);
      var user = new User(req.user);

      // atualizar estado do produto na base de dados
      var sql = "UPDATE Products SET deleted = 1 WHERE id = ? AND user_id = ?";
      var params = [product.id, user.id];
      db.run(sql, params, async function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O produto não existe ou não pertence a esta empresa." });

         res.status(200).json({ "message": "Produto excluído com sucesso!" });
      });

      db.close();
   }
};


function checkInvalidFields(req, operation) {
   var errors = [];

   switch (operation) {
      case "create":
         if (!req.body.name)
            errors.push("Ups! O nome do produto não foi preenchido.");
         if (!req.body.stock)
            errors.push("O stock não foi preenchida.");
         if (!req.body.price)
            errors.push("O preço não foi preenchido.");
         if (!req.body.description)
            errors.push("A descrição não foi preenchida.");
         if (!req.file)
            errors.push("A foto do produto não foi preenchida.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg")
               errors.push("O foto do produto foi inserida incorretamente.");
            if (errors.length > 0)
               removeFile(req.file.path);
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      case "edit-data":
         if (!req.body.name)
            errors.push("Ups! O nome do produto não foi preenchido.");
         if (!req.body.stock)
            errors.push("O stock não foi preenchida.");
         if (!req.body.price)
            errors.push("O preço não foi preenchido.");
         if (!req.body.description)
            errors.push("A descrição não foi preenchida.");

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      case "edit-photo":
         if (!req.file)
            errors.push("A foto do produto não foi preenchida.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg")
               errors.push("O foto do produto foi inserida incorretamente.");
            if (errors.length > 0)
               removeFile(req.file.path);
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      default:
         return { "exist": false };
   }
}


function checkFilter(filter) {
   if (filter == "name")
      return { "exist": false };
   else
      return { "exist": true };
}


function getUrlPhoto(db, productId) {
   return new Promise(resolve => {
      var product = new Product({ "id": productId });

      // selecionar foto do produto na base de dados
      var sql = "SELECT url_photo FROM Products WHERE id = ?";
      var params = product.id;
      var urlPhoto = { "error": false, "value": "" };

      db.each(sql, params, (err, row) => {
         if (err)
            return urlPhoto = { "error": true, "message": "Oh! " + err.message };

         return urlPhoto = { "error": false, "value": globalConfig.path.UPLOADS + globalConfig.path.PRODUCTS + row.url_photo };
      }, () => {
         resolve(urlPhoto);
      });
   });
}


function removeFile(path) {
   fs.unlinkSync(path);
}