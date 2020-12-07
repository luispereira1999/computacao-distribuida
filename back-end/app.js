const express = require("express")
const app = express()
const port = 4000
const bodyParser = require("body-parser")

// iniciar servidor
app.listen(port, () => {
   console.log("Servidor aberto na porta", port)
})

// rota padrão
app.get("/", (req, res) => {
   res.json({ "message": "Ok" })
})

// necessário para pré-processar o corpo das solicitações POST
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// rotas da api
// const adminRoute = require("./routes/admin-route")
// const clientRoute = require("./routes/client-route")
// const deliveryRoute = require("./routes/delivery-route")
// const driverRoute = require("./routes/driver-route")
// const merchantRoute = require("./routes/merchant-route")
// const orderRoute = require("./routes/order-route")
// const productRoute = require("./routes/product-route")
// const userRoute = require("./routes/user-route")
const signupRoute = require("./routes/signup-route")
const loginRoute = require("./routes/login-route")

// app.use("/api/admins", adminRoute)
// app.use("/api/clients", clientRoute)
// app.use("/api/deliveries", deliveryRoute)
// app.use("/api/drivers", driverRoute)
// app.use("/api/merchants", merchantRoute)
// app.use("/api/orders", orderRoute)
// app.use("/api/products", productRoute)
// app.use("/api/users", userRoute)
app.use("/api/login", loginRoute)
app.use("/api/signup", signupRoute)