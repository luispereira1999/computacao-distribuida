# REST API - Documentação <br /><br />

### Rotas <br /><br />

`/ register`
- `/ client`
- `/ merchant`
- `/ driver`
- `/ admin`

`/ login`
- `/`

`/ users`
- `/ account`
- `/ not-accepted`
- `/ accept / { id }`
- `/ set-admin / { id }`
- `/ remove-admin / { id }`
- `/ delete / { id }`

`/ products`
- `/`
- `/ { id }`
- `/ { filter } / { name }`
- `/ create`
- `/ edit-data / { id }`
- `/ delete / { id }`

`/ orders`
- `/ create`
- `/ cancel`

`/ deliveries`
- `/ create`
- `/ complete`

<br />

_____________________________________________

<br />

### / register / client <br /><br />

* **Descrição:**
   `Registar um cliente.`

* **Método:**
   `POST`

* **Body [raw]:**

   **Obrigatório:**
   
   `username: string`\
   `password: string`\
   `name: string`\
   `surname: string`\
   `email: string`\
   `phone_number: integer`\
   `address: string`\
   `zip_code: string`
  
   **Opcional:**
   `receive_advertising: integer [0 ou 1]`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "Cliente registado com sucesso!",
     "data": {
        "id": 1,
        "name": "a",
        "email": "a@picand.go",
        "type": 1
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5hbWUiOiJhIiwiZW1haWwiOiJhQHBpY2FuZC5nbyIsInR5cGUiOjEsImlhdCI6MTYwOTY0NzUxMywiZXhwIjoxNjA5NzMzOTEzfQ.GXFDN99-TdOuUo4bGd71g1SgI7GKgynkH4OlHXg9O0w"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome de utilizador não foi preenchido."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
$.post("http://localhost:4000/api/register/client/", data).done((res) => {
     console.log(res);
}).fail((err) => {
     console.log(err);
});
```
<br />


### / register / merchant <br /><br />

* **Descrição:**
   `Registar uma empresa.`

* **Método:**
   `POST`

* **Body [form-data]:**

   **Obrigatório:**
   
   `username: string`\
   `password: string`\
   `name: string`\
   `email: string`\
   `phone_number: integer`\
   `address: string`\
   `zip_code: string`\
   `nif: integer`\
   `description: string`\
   `file: file [uploaded from computer]`
  
   **Opcional:**
   `receive_advertising: integer [0 ou 1]`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta."
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome de utilizador não foi preenchido."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
$.ajax({
     cache: false,
     contentType: false,
     data: formData,
     processData: false,
     type: "post",
     url: "http://localhost:4000/api/register/merchant/",

     success: (res) => {
        console.log(res);
     },
     error: (err) => {
        console.log(err);
     }
});
```
<br />


### / register / driver <br /><br />

* **Descrição:**
   `Registar um condutor.`

* **Método:**
   `POST`

* **Body [form-data]:**

   **Obrigatório:**
   
   `username: string`\
   `password: string`\
   `name: string`\
   `surname: string`\
   `email: string`\
   `phone_number: integer`\
   `address: string`\
   `zip_code: string`\
   `nif: integer`\
   `driving_license: integer [1, 2 ou 3]`\
   `file: file [uploaded from computer]`
  
   **Opcional:**
   `receive_advertising: integer [0 ou 1]`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta."
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome de utilizador não foi preenchido."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
$.ajax({
     cache: false,
     contentType: false,
     data: formData,
     processData: false,
     type: "post",
     url: "http://localhost:4000/api/register/driver/",

     success: (res) => {
        console.log(res);
     },
     error: (err) => {
        console.log(err);
     }
});
```
<br />


### / register / admin <br /><br />

* **Descrição:**
   `Registar um administrador.`

* **Método:**
   `POST`

* **Body [raw]:**

   **Obrigatório:**
   
   `username: string`\
   `password: string`\
   `name: string`\
   `surname: string`\
   `email: string`\
   `phone_number: integer`\
   `address: string`\
   `zip_code: string`\
   `description: string`
  
   **Opcional:**
   `receive_advertising: integer [0 ou 1]`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta."
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome de utilizador não foi preenchido."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
$.post("http://localhost:4000/api/register/admin/", data).done((res) => {
     console.log(res);
}).fail((err) => {
     console.log(err);
});
```
<br />

_____________________________________________

<br />

### / login <br /><br />

* **Descrição:**
   `Fazer login de um utilizador.`

* **Método:**
   `POST`

* **Body [raw]:**

   **Obrigatório:**
   
   `username: string`\
   `password: string`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Cliente registado com sucesso!",
     "data": {
        "id": 1,
        "name": "a",
        "email": "a@picand.go",
        "type": 1
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsIm5hbWUiOiJhIiwiZW1haWwiOiJhQHBpY2FuZC5nbyIsInR5cGUiOjEsImlhdCI6MTYwOTY0NzUxMywiZXhwIjoxNjA5NzMzOTEzfQ.GXFDN99-TdOuUo4bGd71g1SgI7GKgynkH4OlHXg9O0w"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome de utilizador não foi preenchido."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
$.post("http://localhost:4000/api/register/admin/", data).done((res) => {
     console.log(res);
}).fail((err) => {
     console.log(err);
});
```
<br />

_____________________________________________

<br />

### / users / account <br /><br />

* **Descrição:**
   `Obter dados do utilizador com sessão iniciada.`

* **Método:**
   `GET`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Dados do utilizador obtidos com sucesso!",
     "data": {
        "id": 1,
        "username": "a",
        "password": "$2b$10$qeeTD85K4CxZ9rT3pmdfp.NrtuRVrNwP6xq17vvItEDq1t0M7Xj3m",
        "name": "a",
        "surname": "a",
        "email": "a@picand.go",
        "phone_number": 912345678,
        "address": "a",
        "zip_code": "4123-456",
        "nif": null,
        "description": null,
        "url_photo": null,
        "url_driving_license": null,
        "driving_license": null,
        "receive_advertising": 0,
        "old_type": 1,
        "accepted": 1,
        "locked": 0,
        "deleted": 0,
        "type": 1
     }
  }
   ```
 
* **Erro:**
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / users / not-accepted <br /><br />

* **Descrição:**
   `Obter utilizadores que ainda não foram aceites.`

* **Método:**
   `GET`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "data": [
        {
           "username": "b",
           "name": "b",
           "email": "b@picand.go",
           "type": 2
        }
     ]
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem utilizadores por aceitar."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / users / accept / { id } <br /><br />

* **Descrição:**
   `Aceitar utilizador para poder entrar na aplicação.`

* **Método:**
   `PATCH`
   
* **Params:**

   **Obrigatório:**

   `id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Utilizador aceitado com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem utilizadores por aceitar."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / users / set-admin / { id } <br /><br />

* **Descrição:**
   `Aceitar utilizador para poder entrar na aplicação.`

* **Método:**
   `PATCH`
   
* **Params:**

   **Obrigatório:**

   `id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Utilizador definido como administrador com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O utilizador não existe."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / users / remove-admin / { id } <br /><br />

* **Descrição:**
   `Remover utilizador de administrador.`

* **Método:**
   `PATCH`
   
* **Params:**

   **Obrigatório:**

   `id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Utilizador removido de administrador com sucesso! Voltou ao seu tipo antigo."
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O utilizador não existe."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / users / delete / { id } <br /><br />

* **Descrição:**
   `Apagar um utilizador.`

* **Método:**
   `DELETE`
   
* **Params:**

   **Obrigatório:**

   `id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Utilizador excluído com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O utilizador não existe."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```

* **Chamada simples:**
```js
```
<br />

_____________________________________________

<br />

### / products <br /><br />

* **Descrição:**
   `Obter produtos.`

* **Método:**
   `GET`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Produtos obtidos com sucesso!",
     "data": [
        {
           "id": 1,
           "name": "Produto A",
           "stock": 8,
           "price": 12.5,
           "description": "a",
           "url_photo": "back-end\\uploads\\products\\3-1-2021_18_54_56.png",
           "deleted": 0,
           "user_id": 2
        },
        {
           "id": 2,
           "name": "Produto B",
           "stock": 22,
           "price": 4,
           "description": "b",
           "url_photo": "back-end\\uploads\\products\\3-1-2021_18_54_57.png",
           "deleted": 0,
           "user_id": 2
        }
     ]
  }
   ```
 
* **Erro:**
   
   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem produtos."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / products / { id } <br /><br />

* **Descrição:**
   `Obter um produto pelo ID.`

* **Método:**
   `GET`
   
* **Params:**

   **Obrigatório:**

   `id: integer`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {  
     "message": "Produto obtido com sucesso!",
     "data": {
        "id": 1,
        "name": "Produto A",
        "stock": 4,
        "price": 12.5,
        "description": "a",
        "url_photo": "back-end\\uploads\\products\\3-1-2021_18_54_56.png",
        "deleted": 0,
        "user_id": 2
    }  
  }
   ```
 
* **Erro:**
   
   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O produto não existe."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / products / { filter } / { name } <br /><br />

* **Descrição:**
   `Obter produtos por filtros (nome do produto).`

* **Método:**
   `GET`
   
* **Params:**

   **Obrigatório:**

   `filter: string [name]`\
   `name: string`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {     
     "message": "Produto(s) obtido(s) com sucesso!",
     "data": [
        {
           "id": 1,
           "name": "Produto A",
           "stock": 4,
           "price": 12.5,
           "description": "a",
           "url_photo": "back-end\\uploads\\products\\3-1-2021_18_54_56.png",
           "deleted": 0,
           "user_id": 2
        }
     ]
  }
   ```
 
* **Erro:**
   
   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem produtos com este filtro."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / products / create <br /><br />

* **Descrição:**
   `Criar um produto.`

* **Método:**
   `POST`

* **Body [form-data]:**

   **Obrigatório:**
   
   `name: string`\
   `price: string`\
   `stock: string`\
   `description: integer`\
   `file: file [uploaded from computer]`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "Produto criado com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome do produto não foi preenchido."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
$.ajax({
     cache: false,
     contentType: false,
     data: formData,
     processData: false,
     type: "post",
     url: "http://localhost:4000/api/products/create/",

     success: (res) => {
        console.log(res);
     },
     error: (err) => {
        console.log(err);
     }
});
```
<br />


### / products / edit-data / { id } <br /><br />

* **Descrição:**
   `Editar dados de um produto.`

* **Método:**
   `PATCH`

* **Body [form-data]:**

   **Obrigatório:**
   
   `name: string`\
   `price: real`\
   `stock: integer`\
   `description: string`\
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Produto editado com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O produto não existe ou não pertence a esta empresa."
  }
   ```

   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / products / delete / { id } <br /><br />

* **Descrição:**
   `Apagar um produto.`

* **Método:**
   `DELETE`
   
* **Params:**

   **Obrigatório:**

   `id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Produto excluído com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O produto não existe ou não pertence a esta empresa."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />

_____________________________________________

<br />

### / orders / create <br /><br />

* **Descrição:**
   `Criar uma encomenda.`

* **Método:**
   `POST`

* **Body [raw]:**

   **Obrigatório:**
   
   `order_id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "Encomenda criada com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O stock esgotou."
  }
   ```

   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Orders"
  }
   ```

* **Chamada simples:**
```js
```
<br />

### / orders / cancel <br /><br />

* **Descrição:**
   `Cancelar uma encomenda.`

* **Método:**
   `DELETE`
   
* **Body [raw]:**

   **Obrigatório:**

   `product_id: integer`\
   `order_id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Encomenda cancelada com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! A encomenda não está disponível para cancelar."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />

_____________________________________________

<br />

### / deliveries / accept <br /><br />

* **Descrição:**
   `Aceitar uma entrega.`

* **Método:**
   `POST`

* **Body [raw]:**

   **Obrigatório:**
   
   `order_id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "Entrega aceite com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! A encomenda não existe ou foi cancelada."
  }
   ```

   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Deliveries"
  }
   ```

* **Chamada simples:**
```js
```
<br />


### / deliveries / complete <br /><br />

* **Descrição:**
   `Concluir uma entrega.`

* **Método:**
   `PATCH`
   
* **Body [raw]:**

   **Obrigatório:**

   `order_id: integer`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Entrega concluída com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! A entrega não existe ou já foi entregue pelo condutor."
  }
   ```
   
   **Status:** `401 UNAUTHORIZED` <br />
   ```json
  {
     "message": "Ups! O utilizador não tem permissão para executar esta operação!"
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
   ```

* **Chamada simples:**
```js
```
<br />
