const express = require("express");
const bodyParser = require("body-parser");

// iniciar servidor
const app = express();
const port = 4000;
app.listen(port, () => {
   console.log("Servidor aberto na porta", port);
});

// necessário para pré-processar o corpo das solicitações POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// rota padrão
app.get("/", (req, res) => {
   res.json({ "message": "Servidor está Ok!" })
});

// rotas
const signupRoute = require("./routes/signup-route");
const loginRoute = require("./routes/login-route");
const usersRoute = require("./routes/users-route");
const productsRoute = require("./routes/products-route");

app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);

// rota quando uma rota não existe
app.use(function (req, res, next) {
   res.status(404).send("Ah não! A página não foi encontrada!");
});