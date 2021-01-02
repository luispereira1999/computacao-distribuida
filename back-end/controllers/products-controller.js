const database = require("../utils/database");
var User = require("../models/user");
const fs = require("fs");
var Product = require("../models/product");


module.exports = {
   getAll: async (req, res) => {
      const db = database.connect();

      // selecionar produtos na base de dados
      var sql = "SELECT * FROM Products";
      var params = [];
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Oh! Não existem produtos." });
         else
            res.status(200).json({ "message": "Produtos obtidos com sucesso!", "data": rows });
      });

      db.close();
   },


   getById: async (req, res) => {
      const db = database.connect();

      var product = new Product(req.params);

      // selecionar produto na base de dados
      var sql = "SELECT * FROM Products WHERE id = ?";
      var params = [product.id];
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "message": err.message });

         if (row)
            res.status(200).json({ "message": "Produto obtido com sucesso!", "data": row });
         else
            res.status(400).json({ "message": "Oh! O produto não existe!" });
      });

      db.close();
   },


   getByName: async (req, res) => {
      const db = database.connect();

      var error = await checkFilter(req.params.filter);
      if (error.exist)
         return res.status(400).json({ "message": "Oh! O Filtro não está disponível." });

      var product = new Product(req.params);

      // selecionar produto na base de dados
      var sql = "SELECT * FROM Products WHERE name LIKE ?";
      var params = "%" + product.name + "%";
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Oh! Não existem produtos com este filtro." });
         else
            res.status(200).json({ "message": "Produtos obtidos com sucesso!", "data": rows });
      });

      db.close();
   },


   create: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req);
      if (errors.exist)
         return res.status(400).json({ "message": errors.message.join(" | ") });

      var allData = Object.assign(req.body, { "url_photo": req.file.path });
      var product = new Product(allData);
      var user = new User(req.user);

      // inserir na tabela produtos
      var sql = "INSERT INTO Products (name, stock, price, description, url_photo, deleted, user_id) VALUES (?, ?, ?, ?, ?, 0, ?)";
      var params = [product.name, product.stock, product.price, product.description, product.url_photo, user.id];
      db.run(sql, params, function (err) {
         if (err) {
            removeFile(req.file.path);
            return res.status(500).json({ "message": err.message });
         }

         res.status(201).json({ "message": "Produto criado com sucesso!" });
      });

      db.close();
   },


   edit: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, 1);
      if (errors.exist)
         return res.status(400).json({ "message": errors.message.join(" | ") });

      var allData = Object.assign(req.body, req.params);
      var product = new Product(allData);
      var user = new User(req.user);

      // atualizar produto na base de dados
      var sql = "UPDATE Products SET name = ?, stock = ?, price = ?, description = ? WHERE id = ? AND user_id = ?";
      var params = [product.name, product.stock, product.id, user.id];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O produto não existe ou não pertence a esta empresa." });

         res.status(200).json({ "message": "Produto editado com sucesso!" });
      });

      db.close();
   },


   delete: async (req, res) => {
      const db = database.connect();

      var product = new Product(req.params);
      var user = new User(req.user);

      // atualizar produto na base de dados
      var sql = "UPDATE Products SET deleted = 1 WHERE id = ? AND user_id = ?";
      var params = [product.id, user.id];
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Oh! O produto não existe ou não pertence a esta empresa." });

         res.status(200).json({ "message": "Produto excluído com sucesso!" });
      });

      db.close();
   }
};


function checkFields(req) {
   var errors = [];

   if (!req.body.name)
      errors.push("O nome do produto não foi preenchido.");
   if (!req.body.stock)
      errors.push("O stock não foi preenchida.");
   if (!req.body.price)
      errors.push("O preço não foi preenchido.");
   if (!req.body.description)
      errors.push("A descrição não foi preenchida.");
   if (!req.file)
      errors.push("A foto do produto não foi preenchida.");

   if (errors.length)
      return { "exist": true, "message": errors };
   else return { "exist": false };
}


function checkFilter(filter) {
   if (filter == "name")
      return { "exist": false };
   else
      return { "exist": true };
}


function removeFile(file) {
   fs.unlinkSync(file);
}