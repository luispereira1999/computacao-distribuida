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
- `/ get-merchants / { quantity }`
- `/ not-accepted`
- `/ edit-data`
- `/ edit-password`
- `/ edit-photo`
- `/ edit-driving-license`
- `/ accept / { id }`
- `/ set-admin / { id }`
- `/ remove-admin / { id }`
- `/ delete / { id }`

`/ products`
- `/`
- `/ { filter } / { merchant }`
- `/ create`
- `/ edit-data / { id }`
- `/ edit-photo / { id }`
- `/ delete / { id }`

`/ orders`
- `/`
- `/ merchant`
- `/ create`
- `/ cancel`

`/ deliveries`
- `/`
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
  
* **Sucesso:**

   **Status:** `201 CREATED` <br />
   ```json
  {
     "message": "Cliente registado com sucesso!",
     "data": {
        "id": 1,
        "username": "a",
        "name": "a",
        "email": "a@picand.go",
        "url_photo": "default.png",
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
     "message": "O utilizador efetuou login com sucesso!",
     "data": {
        "id": 1,
        "username": "a",
        "name": "a",
        "email": "a@picand.go",
        "url_photo": "default.png",
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
        "id": 2,
        "username": "b",
        "password": "$2a$10$fCNm2NeTVDmQAKEWE/40vOAQhQvTvCvCYCjB1oGpaV..ODvkRSuJG",
        "name": "b",
        "surname": "b",
        "email": "a@picando.go",
        "phone_number": 912345678,
        "address": "b",
        "zip_code": "4123-456",
        "nif": null,
        "description": null,
        "url_photo": "18-1-2021_11_51_49.jpg",
        "url_driving_license": "18-1-2021_17_57_9.pdf",
        "driving_license": null,
        "old_type": 3,
        "accepted": 1,
        "deleted": 0,
        "type": 3
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
<br />




### / users / get-merchants / { quantity } <br /><br />

* **Descrição:**
   `Obter empresas.`

* **Método:**
   `GET`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Empresas obtidas com sucesso!",
     "data": [
        {
           "id": 1,
           "username": "pizzahut",
           "name": "pizzahut",
           "email": "pizzahut@pizzahut.com",
           "url_photo": "12-1-2021_10_24_15.jpg",
           "type": 2
        },
        {
           "id": 2,
           "username": "mcdonalds",
           "name": "MC Donalds",
           "email": "mcdonalds@mcdonalds.com",
           "url_photo": "11-1-2021_20_49_2.png",
           "type": 2
        }
     ]
  }
   ```
 
* **Erro:**
   
   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem empresas."
  }
   ```

   **Status:** `500 INTERNAL SERVER ERROR` <br />
   ```json
  {
     "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
   ```
<br />




### / users / not-accepted <br /><br />

* **Descrição:**
   `Obter utilizadores por aceitar.`

* **Método:**
   `GET`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Utilizadores obtidos com sucesso!",
     "data": [
        {
           "id": 1,
           "username": "pizzahut",
           "name": "pizzahut",
           "email": "pizzahut@pizzahut.com",
           "url_photo": "12-1-2021_10_24_15.jpg",
           "type": 2
        },
        {
           "id": 2,
           "username": "mcdonalds",
           "name": "MC Donalds",
           "email": "mcdonalds@mcdonalds.com",
           "url_photo": "11-1-2021_20_49_2.png",
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
<br />




### / user / edit-data <br /><br />

* **Descrição:**
   `Editar dados de um utilizador.`

* **Método:**
   `PUT`

* **Body [raw]:**

   **Obrigatório:**
   
   `username: string`\
   `name: string`\
   `surname: string`\
   `email: string`\
   `phone_number: integer`\
   `address: string`\
   `zip_code: string`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Utilizador editado com sucesso!",
     "data": {
        "id": 12,
        "username": "u alterado",
        "name": "n alterado",
        "email": "alterado@picand.go",
        "url_photo": "default.png",
        "type": 1
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoidSBhbHRlcmFkbyIsIm5hbWUiOiJuIGFsdGVyYWRvIiwiZW1haWwiOiJhbHRlcmFkb0BwaWNhbmQuZ28iLCJ1cmxfcGhvdG8iOiJkZWZhdWx0LnBuZyIsInR5cGUiOjEsImlhdCI6MTYxMTM3MTc0NCwiZXhwIjoxNjExNDU4MTQ0fQ.YYoYEf7RlUd40K37pDBty9fU_ryyvNuXXIcOBJdMp_U"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O nome de utilizador não foi preenchido."
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
<br />




### / user / edit-password <br /><br />

* **Descrição:**
   `Editar palavra-passe de um utilizador.`

* **Método:**
   `PATCH`

* **Body [raw]:**

   **Obrigatório:**
   
   `password: string`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Palavra-passe editada com sucesso!",
     "data": {
        "id": 2,
        "username": "b",
        "name": "b",
        "email": "b@picand.go",
        "url_photo": "default.png",
        "type": 2
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoidSBhbHRlcmFkbyIsIm5hbWUiOiJuIGFsdGVyYWRvIiwiZW1haWwiOiJhbHRlcmFkb0BwaWNhbmQuZ28iLCJ1cmxfcGhvdG8iOiJkZWZhdWx0LnBuZyIsInR5cGUiOjEsImlhdCI6MTYxMTM3MTk3NCwiZXhwIjoxNjExNDU4Mzc0fQ.guK5JsuUVUre_2IswHRmUb1CDK3L4grexYX5KEAUEA8"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! A palavra-passe não foi preenchido."
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
<br />




### / users / edit-photo <br /><br />

* **Descrição:**
   `Editar foto de um utilizador.`

* **Método:**
   `PATCH`

* **Body [form-data]:**

   **Obrigatório:**
   
   `file: file [uploaded from computer]`

* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Foto do utilizador editada com sucesso",
     "data": {
        "id": 2,
        "username": "b",
        "name": "b",
        "email": "b@picand.go",
        "url_photo": "12-1-2021_10_24_21.jpg",
        "type": 2
     },
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ1IGFsdGVyYWRvIiwibmFtZSI6Im4gYWx0ZXJhZG8iLCJlbWFpbCI6ImFsdGVyYWRvQHBpY2FuZC5nbyIsInVybF9waG90byI6IjEyLTEtMjAyMV8xMF8yNF8yMS5qcGciLCJ0eXBlIjoyLCJpYXQiOjE2MTA4NTc4MTQsImV4cCI6MTYxMDk0NDIxNH0.X69Jgk5x8LBNbtlvu0VHZhpnJ56a4Qu97lUZSVd1HgA"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! A foto do utilizador não foi preenchida."
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
<br />




### / users / edit-driving-license <br /><br />

* **Descrição:**
   `Editar carta de condução de um condutor.`

* **Método:**
   `PATCH`

* **Body [form-data]:**

   **Obrigatório:**
   
   `driving_license: integer`\
   `file: file [uploaded from computer]`

* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Carta de condução editada com sucesso!"
  }
   ```
 
* **Erro:**

   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! O tipo de carta de condução não foi preenchida."
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
<br />




### / users / accept / { id } <br /><br />

* **Descrição:**
   `Aceitar utilizador não aceite.`

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
<br />




### / users / delete / { id } <br /><br />

* **Descrição:**
   `Apagar um utilizador.`

* **Método:**
   `DELETE`
   
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
<br />

_____________________________________________








<br />

### / products <br /><br />

* **Descrição:**
   `Obter produtos da empresa que está com login iniciado.`

* **Método:**
   `GET`

* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Produtos obtidos com sucesso!",
     "data": [
        {
           "id": 2,
           "product_name": "Massa",
           "stock": 8,
           "price": 2.5,
           "description": "Reese’s Dipped Pretzels Snack de Pretzels Cobertos de Manteiga de Amendoim e Chocolate de Leite 120g",
           "url_photo": "22-1-2021_22_2_1.png",
           "user_name": "b"
        },
        {
           "id": 4,
           "product_name": "Bife",
           "stock": 0,
           "price": 2.5,
           "description": "bife de porco",
           "url_photo": "10-1-2021_10_24_21.jpg",
           "user_name": "b"
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
<br />




### / products / { filter } / { name } <br /><br />

* **Descrição:**
   `Obter produtos por filtros (nome da empresa).`

* **Método:**
   `GET`
   
* **Params:**

   **Obrigatório:**

   `filter: string [name]`\
   `merchant: string`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {     
     "message": "Produto(s) obtido(s) com sucesso!",
     "data": [
        {
           "id": 2,
           "product_name": "Massa",
           "stock": 8,
           "price": 2.5,
           "description": "Reese’s Dipped Pretzels Snack de Pretzels Cobertos de Manteiga de Amendoim e Chocolate de Leite 120g",
           "url_photo": "22-1-2021_22_2_1.png"
        },
        {
           "id": 4,
           "product_name": "Bife",
           "stock": 0,
           "price": 2.5,
           "description": "bife de porco",
           "url_photo": "10-1-2021_10_24_21.jpg"
        },
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
<br />




### / products / create <br /><br />

* **Descrição:**
   `Criar um produto.`

* **Método:**
   `POST`

* **Body [form-data]:**

   **Obrigatório:**
   
   `name: string`\
   `price: real`\
   `stock: integer`\
   `description: string`\
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
<br />




### / products / edit-data / { id } <br /><br />

* **Descrição:**
   `Editar dados de um produto.`

* **Método:**
   `PUT`

* **Body [raw]:**

   **Obrigatório:**
   
   `name: string`\
   `price: real`\
   `stock: integer`\
   `description: string`
   
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
     "message": "Dados do produto editados com sucesso!"
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
<br />




### / products / edit-photo / { id } <br /><br />

* **Descrição:**
   `Editar foto de um produto.`

* **Método:**
   `PATCH`

* **Body [form-data]:**

   **Obrigatório:**
   
   `file: file [uploaded from computer]`
   
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
     "message": "Foto do produto editada com sucesso!"
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
<br />

_____________________________________________








<br />

### / orders <br /><br />

* **Descrição:**
   `Obter encomendas do utilizador.`

* **Método:**
   `GET`

* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Encomendas obtidas com sucesso!",
     "data": [
        {
           "id": 4,
           "address": "Rua dos calhaus, Famalicão",
           "zip_code": "4512-123",
           "date": "9-1-2020, 16:10",
           "vat": 0.23,
           "pick_up_fee": 3.5,
           "total": 7.38,
           "accepted": 1,
           "canceled": 0,
           "product_name": "Massa",
           "price": 2.5,
           "description": "Reese’s Dipped Pretzels Snack de Pretzels Cobertos de Manteiga de Amendoim e Chocolate de Leite 120g",
           "url_photo": "22-1-2021_22_2_1.png",
           "merchant_name": "b",
           "client_name": "b",
           "client_email": "b@picando.go",
           "client_phone_number": 912345678
        },
        {
           "id": 6,
           "address": "ewwe",
           "zip_code": "4121-232",
           "date": "17-1-2021, 21:14",
           "vat": 0.23,
           "pick_up_fee": 3.5,
           "total": 7.38,
           "accepted": 0,
           "canceled": 1,
           "product_name": "Bife",
           "price": 2.5,
           "description": "bife de porco",
           "url_photo": "10-1-2021_10_24_21.jpg",
           "merchant_name": "b",
           "client_name": "b",
           "client_email": "b@picando.go",
           "client_phone_number": 912345678
        }
    ]
  }
   ```
 
* **Erro:**
   
   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem encomendas."
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
<br />




### / orders / merchant <br /><br />

* **Descrição:**
   `Obter encomendas (vendas) da empresa.`

* **Método:**
   `GET`
   
* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
     "message": "Encomendas obtidas com sucesso!",
     "data": [
        {
           "id": 1,
           "address": "Rua dos pedras, Famalicão",
           "date": "9-1-2020, 16:10",
           "total": 7.38,
           "accepted": 0,
           "canceled": 0,
           "product_name": "Bife",
           "client_name": "Luisinho"
        },
        {
           "id": 2,
           "address": "Rua dos flores, Famalicão",
           "date": "9-1-2020, 16:10",
           "total": 7.38,
           "accepted": 1,
           "canceled": 0,
           "product_name": "Massa",
           "client_name": "MC Dondals"
        }
     ]
  }
   ```
 
* **Erro:**
   
   **Status:** `400 BAD REQUEST` <br />
   ```json
  {
     "message": "Ups! Não existem encomendas."
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
<br />




### / orders / create <br /><br />

* **Descrição:**
   `Criar uma encomenda.`

* **Método:**
   `POST`

* **Body [raw]:**

   **Obrigatório:**
   
   `address: string`\
   `zip_code: string`\
   `product_id: integer`
   
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
     "message": "Oh! SQLITE_ERROR: no such table: Orders"
  }
   ```
<br />

_____________________________________________








<br />





### / deliveries <br /><br />

* **Descrição:**
   `Obter entregas do condutor.`

* **Método:**
   `GET`

* **Authorization:**

   **Obrigatório:**

   `token: bearer token`

* **Sucesso:**

   **Status:** `200 OK` <br />
   ```json
  {
        "message": "Produtos obtidos com sucesso!",
        "data": [
        {
           "order_id": 1,
           "address": "Rua dos calhaus, Famalicão",
           "date": "9-1-2020, 16:10",
           "total": 7.38,
           "accepted": 0,
           "canceled": 0,
           "delivery_user_id": 12,
           "client_name": "a"
        },
        {
           "order_id": 2,
           "address": "Rua dos calhaus, Famalicão",
           "date": "9-1-2020, 16:10",
           "total": 7.38,
           "accepted": 0,
           "canceled": 0,
           "delivery_user_id": 12,
           "client_name": "a"
        }
     ]
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
