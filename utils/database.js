const sqlite3 = require("sqlite3");
const globalConfig = require("./global-config.json");
const dbSource = globalConfig.path.DATABASE + globalConfig.file.DATABASE;

module.exports = {
   connect: () => {
      return new sqlite3.Database(dbSource, err => {
         if (err) {
            return console.log("Não foi possível conectar à base de dados:", err.message);
         }
      })
   }
};