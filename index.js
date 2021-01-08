var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// iniciar servidor
var app = express();

// necessário para pré-processar o corpo das solicitações POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// resolver problemas de acesso negado - CORS
app.use(function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
   res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,Authorization");
   res.setHeader("Access-Control-Allow-Credentials", true);
   res.setHeader("Access-Control-Allow-Authorization", "Bearer *");
   next();
});

// rotas
var defaultRoute = require("./routes/default-route");
var registerRoute = require("./routes/register-route");
var loginRoute = require("./routes/login-route");
var usersRoute = require("./routes/users-route");
var productsRoute = require("./routes/products-route");
var ordersRoute = require("./routes/orders-route");
var deliveriesRoute = require("./routes/deliveries-route");

app.use("/api", defaultRoute);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/orders", ordersRoute);
app.use("/api/deliveries", deliveriesRoute);

// rota quando uma rota não existe
app.use(function (req, res, next) {
   res.status(404).json({ "error": "Oh! A página não foi encontrada." });
});

module.exports = app;