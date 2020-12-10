const database = require("../utils/database")
const md5 = require("md5")
var User = require("../models/user")
var Client = require("../models/client")
var Merchant = require("../models/merchant")
var Driver = require("../models/driver")
var Admin = require("../models/admin")


module.exports = {
   signupClient: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, "client");
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = getUser(req.body)
      var sql = "INSERT INTO Users (username, password, name, email, birth_date, gender, phone_number, city, address, zip_code, nif, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      var params = [user.username, md5(user.password), user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif, 1]

      // inserir na tabela utilizadores
      db.run(sql, params, function (err) {
         if (err) {
            return res.status(500).json({ "error": err.message })
         }

         var data = { "user_id": this.lastID }
         insertInClientsTable(db, res, data)
         db.close()
      })
   },


   signupMerchant: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, "client");
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = getUser(req.body)
      var sql = "INSERT INTO Users (username, password, name, email, birth_date, gender, phone_number, city, address, zip_code, nif, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      var params = [user.username, md5(user.password), user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif, 0]

      // inserir na tabela utilizadores
      db.run(sql, params, function (err) {
         if (err) {
            return res.status(500).json({ "error": err.message })
         }

         var data = {
            "user_id": this.lastID,
            "registration_request": req.body.registration_request
         }
         insertInMerchantsTable(db, res, data)
         db.close()
      })
   },


   signupDriver: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, "client");
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = getUser(req.body)
      var sql = "INSERT INTO Users (username, password, name, email, birth_date, gender, phone_number, city, address, zip_code, nif, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      var params = [user.username, md5(user.password), user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif, 0]

      // inserir na tabela utilizadores
      db.run(sql, params, function (err) {
         if (err) {
            return res.status(500).json({ "error": err.message })
         }

         var data = {
            "user_id": this.lastID,
            "registration_request": req.body.registration_request
         }
         insertInDriversTable(db, res, data)
         db.close()
      })
   },


   signupAdmin: async (req, res) => {
      const db = database.connect();

      var errors = await checkFields(req, "client");
      if (errors.exist) {
         return res.status(400).json({ "error": errors.message.join(" | ") });
      }

      var userExist = await checkUsernameOrEmailAlreadyExist(db, req, res);
      if (userExist.exist) {
         return res.status(400).json({ "error": userExist.message });
      }

      var user = getUser(req.body)
      var sql = "INSERT INTO Users (username, password, name, email, birth_date, gender, phone_number, city, address, zip_code, nif, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      var params = [user.username, md5(user.password), user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif, 0]

      // inserir na tabela utilizadores
      db.run(sql, params, function (err) {
         if (err) {
            return res.status(500).json({ "error": err.message })
         }

         var data = {
            "user_id": this.lastID,
            "registration_request": req.body.registration_request
         }
         insertInAdminsTable(db, res, data)
         db.close()
      })
   }
}


function checkFields(req, profile) {
   var errors = []

   if (profile == "client") {
      if (!req.body.username) {
         errors.push("O nome de utilizador não foi preenchido.")
      }
      if (!req.body.password) {
         errors.push("A senha não foi preenchida.")
      }
      if (!req.body.name) {
         errors.push("O nome não foi preenchido.")
      }
      if (!req.body.email) {
         errors.push("O email não foi preenchido.")
      }
      if (errors.length) {
         return ({
            "exist": true,
            "message": errors
         })
      }
   } else if (profile == "merchant" || profile == "driver" || profile == "admin") {
      if (!req.body.username) {
         errors.push("O nome de utilizador não foi preenchido.")
      }
      if (!req.body.password) {
         errors.push("A senha não foi preenchida.")
      }
      if (!req.body.name) {
         errors.push("O nome não foi preenchido.")
      }
      if (!req.body.email) {
         errors.push("O email não foi preenchido.")
      }
      if (!req.body.registration_request) {
         errors.push("O pedido de registo não foi preenchido.")
      }
      if (errors.length) {
         return ({
            "exist": true,
            "message": errors
         })
      }
   }

   return ({ "exist": false })
}


function checkUsernameOrEmailAlreadyExist(db, req, res) {
   return new Promise((resolve) => {
      var user = getUser(req.body)
      var sql = "SELECT * FROM users WHERE username = ? OR email = ? LIMIT 1"
      var params = [user.username, user.email]
      var userExist = ({
         "exist": false,
         "message": "nao existe"
      })

      db.each(sql, params, (err, row) => {
         if (err) {
            return userExist = {
               "exist": false,
               "message": err.message
            }
         }

         if (row) {
            return userExist = {
               "exist": true,
               "message": "Nome de utilizador ou email já existem. Coloque outro."
            }
         }
         else {
            return userExist = { "exist": false }
         }
      }, () => {
         resolve(userExist)
      })
   })
}


function getUser(data) {
   return new User(data)
}


function getClient(data) {
   return new Client(data)
}


function getMerchant(data) {
   return new Merchant(data)
}


function getDriver(data) {
   return new Driver(data)
}


function getAdmin(data) {
   return new Admin(data)
}


function insertInClientsTable(db, res, data) {
   var client = getClient(data)
   var sql = "INSERT INTO Clients (user_id) VALUES (?)"
   var params = client.user_id

   db.run(sql, params, function (err) {
      if (err) {
         return res.status(500).json({ "error": err.message })
      }
      return res.json({
         "message": "Cliente registado com sucesso!"
      })
   })
}


function insertInMerchantsTable(db, res, data) {
   var merchant = getMerchant(data)
   var sql = "INSERT INTO Merchants (user_id, registration_request) VALUES (?, ?)"
   var params = [merchant.user_id, merchant.registration_request]

   db.run(sql, params, function (err) {
      if (err) {
         return res.status(500).json({ "error": err.message })
      }
      return res.json({
         "message": "Empresa registada com sucesso!"
      })
   })
}


function insertInDriversTable(db, res, data) {
   var driver = getDriver(data)
   var sql = "INSERT INTO Drivers (user_id, registration_request) VALUES (?, ?)"
   var params = [driver.user_id, driver.registration_request]

   db.run(sql, params, function (err) {
      if (err) {
         return res.status(500).json({ "error": err.message })
      }
      return res.json({
         "message": "Condutor registado com sucesso!"
      })
   })
}


function insertInAdminsTable(db, res, data) {
   var admin = getAdmin(data)
   var sql = "INSERT INTO Admins (user_id, registration_request) VALUES (?, ?)"
   var params = [admin.user_id, admin.registration_request]

   db.run(sql, params, function (err) {
      if (err) {
         return res.status(500).json({ "error": err.message })
      }
      return res.json({
         "message": "Admin registado com sucesso!"
      })
   })
}