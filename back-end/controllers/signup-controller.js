const database = require("../utils/database")
const md5 = require("md5")
var User = require("../models/user")
var Client = require("../models/client")
var Merchant = require("../models/merchant")


module.exports = {
   signupClient: async(req, res) => {
      const db = database.connect()

      var user = getUser(req.body)
      var sql = "INSERT INTO Users (username, password, name, email, birth_date, gender, phone_number, city, address, zip_code, nif, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      var params = [user.username, md5(user.password), user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif, 1]

      // inserir na tabela utilizadores
      db.run(sql, params, function(err) {
         if (err) {
            return res.status(400).json({ "error": err.message })
         }

         var data = { user_id: this.lastID }
         insertInClientsTable(db, res, data)
         db.close()
      })
   },


   signupMerchant: async(req, res) => {
      const db = database.connect()

      var user = getUser(req.body)
      var sql = "INSERT INTO Users (username, password, name, email, birth_date, gender, phone_number, city, address, zip_code, nif, active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      var params = [user.username, md5(user.password), user.name, user.email, user.birth_date, user.gender, user.phone_number, user.city, user.address, user.zip_code, user.nif, 0]

      // inserir na tabela utilizadores
      db.run(sql, params, function(err) {
         if (err) {
            return res.status(400).json({ "error": err.message })
         }

         var data = {
            user_id: this.lastID,
            registration_request: req.body.registration_request
         }
         insertInMerchantsTable(db, res, data)
         db.close()
      })
   }
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


function insertInClientsTable(db, res, data) {
   var client = getClient(data)
   var sql = "INSERT INTO Clients (user_id) VALUES (?)"
   var params = client.user_id

   db.run(sql, params, function(err) {
      if (err) {
         return res.status(400).json({ "error": err.message })
      }
      res.json({
         "message": "Cliente registado com sucesso!"
      })
   })
}


function insertInMerchantsTable(db, res, data) {
   var merchant = getMerchant(data)
   var sql = "INSERT INTO Merchants (user_id, registration_request) VALUES (?, ?)"
   var params = [merchant.user_id, merchant.registration_request]

   db.run(sql, params, function(err) {
      if (err) {
         return res.status(400).json({ "error": err.message })
      }
      res.json({
         "message": "Empresa registada com sucesso!"
      })
   })
}