const database = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const globalConfig = require("../utils/global-config.json");
var User = require("../models/user");


module.exports = {
   view: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.user);

      // selecionar utilizador na base de dados
      var sql = "SELECT * FROM Users WHERE id = ?";
      var params = user.id;
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         res.status(200).json({ "message": "Dados do utilizador obtidos com sucesso!", "data": row });
      });

      db.close();
   },



   getMerchants: async (req, res, next) => {
      const db = database.connect();

      // selecionar utilizador na base de dados
      var sql = "SELECT id, username, name, email, url_photo, type FROM Users WHERE accepted = 1 AND deleted = 0 AND type = 2 LIMIT ?";
      var params = [req.params.quantity];
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem empresas." });
         else
            res.status(200).json({ "message": "Empresas obtidas com sucesso!", "data": rows });
      });

      db.close();
   },


   getByNotAccepted: async (req, res, next) => {
      const db = database.connect();

      // selecionar utilizador na base de dados
      var sql = "SELECT id, username, name, email, type FROM Users WHERE accepted = 0";
      var params = [];
      db.all(sql, params, function (err, rows) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (rows.length == 0)
            res.status(400).json({ "message": "Ups! Não existem utilizadores por aceitar." });
         else
            res.status(200).json({ "message": "Utilizadores obtidos com sucesso!", "data": rows });
      });

      db.close();
   },


   editData: async (req, res, next) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "edit-data", req.user.type);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var allData = Object.assign(req.body, { "id": req.user.id });
      var user = new User(allData);

      // atualizar dados do utilizador na base de dados
      var sql = "UPDATE Users SET username = ?, name = ?, surname = ?, email = ?, phone_number = ?, address = ?, zip_code = ?, nif = ?, description = ? WHERE id = ?";
      var params = [user.username, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, user.nif, user.description, user.id];

      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         // selecionar utilizador na base de dados
         var sql = "SELECT * FROM Users WHERE id = ?";
         var params = user.id;
         db.get(sql, params, async function (err, row) {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });

            var data = {
               id: row.id,
               username: row.username,
               name: row.name,
               email: row.email,
               url_photo: row.url_photo,
               type: row.type,
            };
            const token = generateToken(data);

            res.status(200).json({ "message": "Utilizador editado com sucesso!", "data": data, "token": token });
         });
      });

      db.close();
   },


   editPassword: async (req, res, next) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "edit-password");
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var allData = Object.assign(req.body, { "id": req.user.id });
      var user = new User(allData);

      // atualizar dados do utilizador na base de dados
      var sql = "UPDATE Users SET password = ? WHERE id = ?";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [hash, user.id];

      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         // selecionar utilizador na base de dados
         var sql = "SELECT * FROM Users WHERE id = ?";
         var params = user.id;
         db.get(sql, params, async function (err, row) {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });

            var data = {
               id: row.id,
               username: row.username,
               name: row.name,
               email: row.email,
               url_photo: row.url_photo,
               type: row.type,
            };
            const token = generateToken(data);

            res.status(200).json({ "message": "Palavra-passe editada com sucesso!", "data": data, "token": token });
         });
      });

      db.close();
   },


   editPhoto: async (req, res, next) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "edit-photo");
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var user = new User({ "id": req.user.id, "url_photo": req.file.filename });

      // atualizar foto do utilizador na base de dados
      var sql = "UPDATE Users SET url_photo = ? WHERE id = ?";
      var params = [user.url_photo, user.id];
      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         // selecionar utilizador na base de dados
         var sql = "SELECT * FROM Users WHERE id = ?";
         var params = user.id;
         db.get(sql, params, async function (err, row) {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });

            var data = {
               id: row.id,
               username: row.username,
               name: row.name,
               email: row.email,
               url_photo: row.url_photo,
               type: row.type,
            };
            const token = generateToken(data);

            res.status(200).json({ "message": "Foto do utilizador editada com sucesso!", "data": data, "token": token });
         });
      });

      db.close();
   },


   editDrivingLicense: async (req, res, next) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, "edit-driving-license");
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var user = new User({ "id": req.user.id, "driving_license": req.body.driving_license, "url_driving_license": req.file.filename });

      // atualizar carta de condução do utilizador na base de dados
      var sql = "UPDATE Users SET driving_license = ?, url_driving_license = ? WHERE id = ?";
      var params = [user.driving_license, user.url_driving_license, user.id];
      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         res.status(200).json({ "message": "Carta de condução editada com sucesso!" });
      });

      db.close();
   },


   accept: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);

      // atualizar estado do utilizador na base de dados
      var sql = "UPDATE Users SET accepted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador aceitado com sucesso!" });
      });

      db.close();
   },


   setAdmin: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);

      // atualizar tipo de utilizador na base de dados
      var sql = "UPDATE Users SET type = 4 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador definido como administrador com sucesso!" });
      });

      db.close();
   },


   removeAdmin: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.params);
      var userLogged = new User(req.user);

      if (userLogged.id == user.id)
         return res.status(201).json({ "message": "Oh! Não pode remover de administrador o utilizador atual." });

      // selecionar tipo de utilizador antigo na base de dados
      var sql = "SELECT old_type FROM Users WHERE id = ?";
      var params = user.id;
      db.get(sql, params, function (err, row) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         user.old_type = row.old_type;

         // atualizar tipo de utilizador na base de dados
         var sql = "UPDATE Users SET type = ? WHERE id = ?";
         var params = [user.old_type, user.id];
         db.run(sql, params, function (err) {
            if (err)
               return res.status(500).json({ "message": "Oh! " + err.message });

            if (this.changes == 0)
               return res.status(400).json({ "message": "Ups! O utilizador não existe." });

            res.status(200).json({ "message": "Utilizador removido de administrador com sucesso! Voltou ao seu tipo antigo." });
         });
      });

      db.close();
   },


   delete: async (req, res, next) => {
      const db = database.connect();

      var user = new User(req.user);

      // atualizar estado do utilizador na base de dados
      var sql = "UPDATE Users SET deleted = 1 WHERE id = ?";
      var params = user.id;
      db.run(sql, params, async function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (this.changes == 0)
            return res.status(400).json({ "message": "Ups! O utilizador não existe." });

         res.status(200).json({ "message": "Utilizador excluído com sucesso!" });
      });

      db.close();
   }
}


function checkInvalidFields(req, route, typeUserId) {
   var errors = [];

   switch (route) {
      case "edit-data":
         switch (typeUserId) {
            // cliente
            case 1:
               if (!req.body.username)
                  errors.push("Ups! O nome de utilizador não foi preenchido.");
               if (!req.body.name)
                  errors.push("O nome não foi preenchido.");
               if (!req.body.surname)
                  errors.push("O apelido não foi preenchido.");
               if (!req.body.email)
                  errors.push("O email não foi preenchido.");
               if (!req.body.phone_number)
                  errors.push("O número de telemóvel não foi preenchido.");
               else if (req.body.phone_number.toString().length != 9)
                  errors.push("O número de telemóvel tem de ter 9 dígitos.");
               if (!req.body.address)
                  errors.push("A morada não foi preenchida.");
               if (!req.body.zip_code)
                  errors.push("O código postal não foi preenchido.");

               if (errors.length)
                  return { "exist": true, "message": errors };
               else
                  return { "exist": false };
            // empresa
            case 2:
               if (!req.body.username)
                  errors.push("Ups! O nome de utilizador não foi preenchido.");
               if (!req.body.name)
                  errors.push("O nome não foi preenchido.");
               if (!req.body.email)
                  errors.push("O email não foi preenchido.");
               if (!req.body.phone_number)
                  errors.push("O número de telemóvel não foi preenchido.");
               else if (req.body.phone_number.toString().length != 9)
                  errors.push("O número de telemóvel tem de ter 9 dígitos.");
               if (!req.body.address)
                  errors.push("A morada não foi preenchida.");
               if (!req.body.zip_code)
                  errors.push("O código postal não foi preenchido.");
               if (!req.body.nif)
                  errors.push("O NIF não foi preenchido.");
               else if (req.body.nif.toString().length != 9)
                  errors.push("O NIF tem de ter 9 dígitos.");
               if (!req.body.description)
                  errors.push("A descrição não foi preenchida.");

               if (errors.length)
                  return { "exist": true, "message": errors };
               else
                  return { "exist": false };
            // condutor
            case 3:
               if (!req.body.username)
                  errors.push("Ups! O nome de utilizador não foi preenchido.");
               if (!req.body.name)
                  errors.push("O nome não foi preenchido.");
               if (!req.body.surname)
                  errors.push("O apelido não foi preenchido.");
               if (!req.body.email)
                  errors.push("O email não foi preenchido.");
               if (!req.body.phone_number)
                  errors.push("O número de telemóvel não foi preenchido.");
               else if (req.body.phone_number.toString().length != 9)
                  errors.push("O número de telemóvel tem de ter 9 dígitos.");
               if (!req.body.address)
                  errors.push("A morada não foi preenchida.");
               if (!req.body.zip_code)
                  errors.push("O código postal não foi preenchido.");

               if (errors.length)
                  return { "exist": true, "message": errors };
               else
                  return { "exist": false };
            // admin
            case 4:
               if (!req.body.username)
                  errors.push("Ups! O nome de utilizador não foi preenchido.");
               if (!req.body.name)
                  errors.push("O nome não foi preenchido.");
               if (!req.body.surname)
                  errors.push("O apelido não foi preenchido.");
               if (!req.body.email)
                  errors.push("O email não foi preenchido.");
               if (!req.body.phone_number)
                  errors.push("O número de telemóvel não foi preenchido.");
               else if (req.body.phone_number.toString().length != 9)
                  errors.push("O número de telemóvel tem de ter 9 dígitos.");
               if (!req.body.address)
                  errors.push("A morada não foi preenchida.");
               if (!req.body.zip_code)
                  errors.push("O código postal não foi preenchido.");
               if (!req.body.description)
                  errors.push("A descrição não foi preenchida.");

               if (errors.length)
                  return { "exist": true, "message": errors };
               else
                  return { "exist": false };
            default:
               return { "exist": false };
         }
      case "edit-password":
         if (!req.body.password)
            errors.push("A palavra-passe não foi preenchida.");

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      case "edit-photo":
         if (!req.file)
            errors.push("Ups! A foto do utilizador não foi preenchida.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg")
               errors.push("Ups! A foto do utilizador foi inserida incorretamente.");
            if (errors.length > 0)
               removeFile(req.file.path);
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      case "edit-driving-license":
         if (!req.body.driving_license)
            errors.push("Ups! O tipo de carta de condução não foi preenchida.");
         else if (req.body.driving_license != 1 && req.body.driving_license != 2 && req.body.driving_license != 3)
            errors.push("O tipo de carta de condução não é válido.");
         if (!req.file)
            errors.push("A carta de condução não foi preenchida.");
         else {
            if (req.file.mimetype != "application/pdf")
               errors.push("A carta de condução foi inserida incorretamente.");
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


function getDrivingLicense(db, userId) {
   return new Promise(resolve => {
      var user = new User({ "id": userId });

      // inserir pdf da carta de condução do utilizador na base de dados
      var sql = "SELECT url_driving_license FROM Users WHERE id = ?";
      var params = user.id;
      var drivingLicense = { "error": false, "value": "" };

      db.each(sql, params, (err, row) => {
         if (err)
            return drivingLicense = { "error": true, "message": "Oh! " + err.message };

         return drivingLicense = { "error": false, "value": globalConfig.path.UPLOADS + globalConfig.path.DRIVING_LICENSES + row.url_driving_license };
      }, () => {
         resolve(drivingLicense);
      });
   });
}


function getUrlPhoto(db, userId) {
   return new Promise(resolve => {
      var user = new User({ "id": userId });

      // selecionar foto do utilizador na base de dados
      var sql = "SELECT url_photo FROM Users WHERE id = ?";
      var params = user.id;
      var urlPhoto = { "error": false, "value": "" };

      db.each(sql, params, (err, row) => {
         if (err)
            return urlPhoto = { "error": true, "message": "Oh! " + err.message };

         return urlPhoto = { "error": false, "value": globalConfig.path.UPLOADS + globalConfig.path.PHOTOS + row.url_photo };
      }, () => {
         resolve(urlPhoto);
      });
   });
}


function getTypeUserId(db, userId) {
   return new Promise(resolve => {
      var user = new User({ "id": userId });

      // selecionar tipo do utilizador na base de dados
      var sql = "SELECT type FROM Users WHERE id = ?";
      var params = user.id;
      var type = { "error": true, "message": "Ups! O utilizador não existe." };

      db.each(sql, params, (err, row) => {
         if (err)
            return type = { "error": true, "message": "Oh! " + err.message };

         return type = { "error": false, "value": row.type };
      }, () => {
         resolve(type);
      });
   });
}


function generateToken(data) {
   return jwt.sign({
      id: data.id,
      username: data.username,
      name: data.name,
      email: data.email,
      url_photo: data.url_photo,
      type: data.type
   }, "hard-secret", { expiresIn: "24h" });
}


function removeFile(path) {
   fs.unlinkSync(path);
}