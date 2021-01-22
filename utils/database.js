const sqlite3 = require("sqlite3");
const globalConfig = require("./global-config.json");
const dbSource = globalConfig.path.DATABASE + globalConfig.file.DATABASE;

module.exports = {
   connect: () => {
      let database = new sqlite3.Database(dbSource, err => {
         if (err) {
            console.log("Não foi possível conectar à base de dados:", err.message);
         }
      })

      database.run('PRAGMA busy_timeout = 6000');
      database.configure("busyTimeout", 6000);
      return database;
   }
};