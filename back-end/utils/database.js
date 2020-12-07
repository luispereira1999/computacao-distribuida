const sqlite3 = require("sqlite3")
const dbSource = "./utils/database.db"

module.exports = {
   connect: () => {
      return new sqlite3.Database(dbSource, sqlite3.OPEN_READWRITE, (err) => {
         if (err) {
            return console.log("Não foi possível conectar à base de dados:", err.message)
         }
      })
   },
}