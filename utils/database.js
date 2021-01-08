const sqlite3 = require("sqlite3");
const config = require("./global-config.json");
const dbSource = config.DB_SOURCE;

module.exports = {
   connect: () => {
      return new sqlite3.Database(dbSource, (err) => {
         if (err) {
            return console.log("Não foi possível conectar à base de dados:", err.message);
         }
      })
   }
};