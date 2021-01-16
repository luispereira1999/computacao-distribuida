const database = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const globalConfig = require("../utils/global-config.json");
var User = require("../models/user");
var TypeUser = require("../models/type-user");


module.exports = {
   registerClient: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, 1);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req);
      if (userExist.exist)
         return res.status(400).json({ "message": userExist.message });

      var user = new User(req.body);
      var typeUser = new TypeUser({ "id": 1 })

      // inserir utilizador na base de dados
      var sql = "INSERT INTO Users (username, password, name, surname, email, phone_number, address, zip_code, url_photo, receive_advertising, old_type, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, globalConfig.file.DEFAULT_PHOTO, user.receive_advertising, typeUser.id, typeUser.id];

      db.run(sql, params,  function (err) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         var data = {
            id: this.lastID,
            username: user.username,
            name: user.name,
            email: user.email,
            url_photo: user.url_photo,
            type: 1
         };
         const token = generateToken(data);

         res.status(201).json({ "message": "Cliente registado com sucesso!", "data": data, "token": token });
      });

      db.close();
   },


   registerMerchant: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, 2);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req);
      if (userExist.exist) {
         removeFile(req.file.path);
         return res.status(400).json({ "message": userExist.message });
      }

      var allData = Object.assign(req.body, { "url_photo": req.file.filename });
      var user = new User(allData);
      var typeUser = new TypeUser({ "id": 2 })

      // inserir utilizador na base de dados
      var sql = "INSERT INTO Users (username, password, name, email, phone_number, address, zip_code, nif, url_photo, description, receive_advertising, old_type, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.email, user.phone_number, user.address, user.zip_code, user.nif, user.url_photo, user.description, user.receive_advertising, typeUser.id, typeUser.id];

      db.run(sql, params, err => {
         if (err) {
            removeFile(req.file.path);
            return res.status(500).json({ "message": "Oh! " + err.message });
         }

         res.status(201).json({ "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta." });
      });

      db.close();
   },


   registerDriver: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, 3);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req);
      if (userExist.exist) {
         removeFile(req.file.path);
         return res.status(400).json({ "message": userExist.message });
      }

      var allData = Object.assign(req.body, { "url_driving_license": req.file.filename });
      var user = new User(allData);
      var typeUser = new TypeUser({ "id": 3 });

      // inserir utilizador na base de dados
      var sql = "INSERT INTO Users (username, password, name, surname, email, phone_number, address, zip_code, url_photo, url_driving_license, driving_license, receive_advertising, old_type, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, globalConfig.file.DEFAULT_PHOTO, user.url_driving_license, user.driving_license, user.receive_advertising, typeUser.id, typeUser.id];

      db.run(sql, params, err => {
         if (err) {
            removeFile(req.file.path);
            return res.status(500).json({ "message": "Oh! " + err.message });
         }

         res.status(201).json({ "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta." });
      });

      db.close();
   },


   registerAdmin: async (req, res) => {
      const db = database.connect();

      var invalidFields = await checkInvalidFields(req, 4);
      if (invalidFields.exist)
         return res.status(400).json({ "message": invalidFields.message.join(" | ") });

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req);
      if (userExist.exist) {
         return res.status(400).json({ "message": userExist.message });
      }

      var user = new User(req.body);
      var typeUser = new TypeUser({ "id": 4 })

      // inserir utilizador na base de dados
      var sql = "INSERT INTO Users (username, password, name, surname, email, phone_number, address, zip_code, description, url_photo, receive_advertising, old_type, accepted, locked, deleted, type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, 0, 0, ?)";
      const hash = await bcrypt.hashSync(user.password, 10);
      var params = [user.username, hash, user.name, user.surname, user.email, user.phone_number, user.address, user.zip_code, user.description, globalConfig.file.DEFAULT_PHOTO, user.receive_advertising, typeUser.id, typeUser.id];

      db.run(sql, params, err => {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         res.status(201).json({ "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta." });
      });

      db.close();
   }
};


function checkInvalidFields(req, typeUserId) {
   var errors = [];

   switch (typeUserId) {
      // cliente
      case 1:
         if (!req.body.username)
            errors.push("Ups! O nome de utilizador não foi preenchido.");
         if (!req.body.password)
            errors.push("A palavra-passe não foi preenchida.");
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
         if (!req.body.password)
            errors.push("A palavra-passe não foi preenchida.");
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
         if (!req.file)
            errors.push("O logótipo não foi preenchido.");
         else {
            if (req.file.mimetype != "image/png" && req.file.mimetype != "image/jpg" && req.file.mimetype != "image/jpeg")
               errors.push("O logótipo foi inserido incorretamente.");
            if (errors.length > 0)
               removeFile(req.file.path);
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      // condutor
      case 3:
         if (!req.body.username)
            errors.push("Ups! O nome de utilizador não foi preenchido.");
         if (!req.body.password)
            errors.push("A palavra-passe não foi preenchida.");
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
         if (!req.body.driving_license)
            errors.push("O tipo de carta de condução não foi preenchida.");
         else if (req.body.driving_license != 1 && req.body.driving_license != 2 && req.body.driving_license != 3)
            errors.push("O tipo de carta de condução não é válido.");
         if (!req.file)
            errors.push("O PDF da carta de condução não foi preenchida.");
         else {
            if (req.file.mimetype != "application/pdf")
               errors.push("O PDF da carta de condução foi inserido incorretamente.");
            if (errors.length > 0)
               removeFile(req.file.path);
         }

         if (errors.length)
            return { "exist": true, "message": errors };
         else
            return { "exist": false };
      // admin
      case 4:
         if (!req.body.username)
            errors.push("Ups! O nome de utilizador não foi preenchido.");
         if (!req.body.password)
            errors.push("A palavra-passe não foi preenchida.");
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
}


function checkUsernameOrEmailAlreadyExist(db, req) {
   return new Promise(resolve => {
      var user = new User(req.body);

      // selecionar id do utilizador na base de dados
      var sql = "SELECT id FROM Users WHERE (username = ? OR email = ?) AND deleted = 0 LIMIT 1";
      var params = [user.username, user.email];
      var userExist = { "exist": false };

      db.each(sql, params, (err, row) => {
         if (err)
            return userExist = { "exist": false, "message": "Oh! " + err.message };

         return userExist = { "exist": true, "message": "Ups! Nome de utilizador ou email já existem. Tente novamente por favor." };
      }, () => {
         resolve(userExist);
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