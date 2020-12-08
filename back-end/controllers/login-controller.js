const database = require("../utils/database")
const md5 = require("md5")
var User = require("../models/user")


module.exports = {
   login: async(req, res) => {
      const db = database.connect()
      if (checkFields(req, res))
         return

      var user = new User(req.body)
      var sql = "SELECT * FROM users WHERE username = ? AND password = ?"
      var params = [user.username, md5(user.password)]

      // obter utilizador
      db.get(sql, params, function(err, row) {
         if (err) {
            return res.status(400).json({ "error": err.message })
         }

         if (row) {
            res.json({
               "message": "O utilizador: " + row.username + " efetuou login com sucesso!",
               "data": row
            })
         } else {
            res.json({
               "message": "Nome de utilizador ou senha inválidos. Tente novamente!"
            })
         }

         db.close()
      })
   }
}


function checkFields(req, res) {
   var errors = []

   if (!req.body.username) {
      errors.push("O nome de utilizador não foi preenchido.")
   }
   if (!req.body.password) {
      errors.push("A senha não foi preenchida.")
   }
   if (errors.length) {
      res.status(400).json({ "error": errors.join(" | ") })
      return true
   }
}