const database = require("../utils/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var User = require("../models/user");


module.exports = {
   login: async (req, res) => {
      const db = database.connect();

      if (invalidFields = checkInvalidFields(req))
         return res.status(400).json({ "message": invalidFields.join(" | ") });

      var user = new User(req.body);

      // selecionar utilizador na base de dados
      var sql = "SELECT * FROM Users WHERE username = ?";
      var params = user.username;
      db.get(sql, params, async function (err, row) {
         if (err)
            return res.status(500).json({ "message": "Oh! " + err.message });

         if (row) {
            const isCorrectPassword = await bcrypt.compareSync(user.password, row.password);

            if (isCorrectPassword) {
               var error = checkActiveUser(row);
               if (error.value)
                  return res.status(400).json({ "message": error.message });

               var data = {
                  id: row.id,
                  username: row.username,
                  name: row.name,
                  email: row.email,
                  url_photo: row.url_photo,
                  type: row.type,
               };
               const token = generateToken(data);

               res.status(200).json({ "message": "O utilizador iniciou sessão com sucesso!", "data": data, "token": token });
            } else
               return res.status(400).json({ "message": "Ups! Nome de utilizador ou palavra-passe inválidos. Tente novamente!" });
         }
         else {
            return res.status(400).json({ "message": "Ups! O utilizador não existe. Tente novamente!" });
         }
      });

      db.close();
   }
};


function checkInvalidFields(req) {
   var errors = [];

   if (!req.body.username)
      errors.push("O nome de utilizador não foi preenchido.");
   if (!req.body.password)
      errors.push("A palavra-passe não foi preenchida.");
   if (errors.length)
      return errors;
}


function checkActiveUser(row) {
   if (row.deleted == 1)
      return { "value": true, "message": "Ups! O utilizador não existe. Tente outro por favor." };
   if (row.accepted == 0)
      return { "value": true, "message": "Ups! O utilizador não está ativado. Aguarde por favor pela resposta!" };

   return { "value": false };
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