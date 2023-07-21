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
- `/ get-user / { id }`
- `/ get-merchants / { quantity }`
- `/ accepted`
- `/ not-accepted`
- `/ edit-data`
- `/ edit-password`
- `/ edit-photo`
- `/ edit-driving-license`
- `/ accept / { id }`
- `/ set-admin / { id }`
- `/ remove-admin / { id }`
- `/ delete`

`/ products`

- `/ merchant-logged`
- `/ { id }`
- `/ create`
- `/ edit-data / { id }`
- `/ edit-photo / { id }`
- `/ delete / { id }`

`/ orders`

- `/`
- `/ merchant`
- `/ driver`
- `/ not-accepted`
- `/ create`
- `/ cancel`

`/ deliveries`

- `/`
- `/ accept`
- `/ complete`

<br />

---

<br />

### / register / client <br /><br />

- **Descrição:**
  `Registar um cliente.`

- **Método:**
  `POST`

- **Body [raw]:**

  **Obrigatório:**

  `username: string` campo para o nome do utilizador\
  `password: string` campo para a palavra-passe\
  `name: string` campo para o nome\
  `surname: string` campo para o apelido\
  `email: string` campo para o email\
  `phone_number: integer` campo para o número de telemóvel\
  `address: string` campo para a morada\
  `zip_code: string` campo para o código postal

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "Cliente registado com sucesso!",
    "data": {
      "id": 1,
      "username": "danielasilva",
      "name": "Daniela",
      "email": "dss@picand.go",
      "url_photo": "default.png",
      "type": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjoiZGFuaWVsYXNpbHZhIiwibmFtZSI6IkRhbmllbGEiLCJlbWFpbCI6ImRzc0BwaWNhbmQuZ28iLCJ1cmxfcGhvdG8iOiJkZWZhdWx0LnBuZyIsInR5cGUiOjEsImlhdCI6MTY4OTc4MTQ0NSwiZXhwIjoxNjg5ODY3ODQ1fQ.VKdvMj0bTMAUhePRkykbplNDtwP4VwtClMQQAMYElFE"
  }
  ```

- **Erro:**

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

- **Descrição:**
  `Registar um comerciante.`

- **Método:**
  `POST`

- **Body [form-data]:**

  **Obrigatório:**

  `username: string` campo para o nome de utilizador\
  `password: string` campo para a palavra-passe\
  `name: string` campo para o nome\
  `email: string` campo para o email\
  `phone_number: integer` campo para o número de telemóvel\
  `address: string` campo para a morada\
  `zip_code: string` campo para o código postal\
  `nif: integer` campo para o NIF\
  `description: string` campo para a descrição\
  `file: file [uploaded from computer]` campo para carregar foto do dispositivo

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta."
  }
  ```

- **Erro:**

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

- **Descrição:**
  `Registar um condutor.`

- **Método:**
  `POST`

- **Body [form-data]:**

  **Obrigatório:**

  `username: string` campo para o nome de utilizador\
  `password: string` campo para a palavra-passe\
  `name: string` campo para o nome\
  `surname: string` campo para o apelido\
  `email: string` campo para o email\
  `phone_number: integer` campo para o número de telemóvel\
  `address: string` campo para a morada\
  `zip_code: string` campo para o código postal\
  `nif: integer` campo para o NIF\
  `driving_license: integer [1, 2 ou 3]` campo para o tipo de carta de condução\
  `file: file [uploaded from computer]` campo para carregar pdf do dispositivo

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta."
  }
  ```

- **Erro:**

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

- **Descrição:**
  `Registar um admin.`

- **Método:**
  `POST`

- **Body [raw]:**

  **Obrigatório:**

  `username: string` campo para o nome de utilizador\
  `password: string` campo para a palavra-passe\
  `name: string` campo para o nome\
  `surname: string` campo para o apelido\
  `email: string` campo para o email\
  `phone_number: integer` campo para o número de telemóvel\
  `address: string` campo para a morada\
  `zip_code: string` campo para o código postal

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "O registo foi efetuado com sucesso! Aguarde por favor pela resposta."
  }
  ```

- **Erro:**

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

---

<br />

### / login <br /><br />

- **Descrição:**
  `Iniciar sessão de um utilizador.`

- **Método:**
  `POST`

- **Body [raw]:**

  **Obrigatório:**

  `username: string` campo para o nome de utilizador\
  `password: string` campo para a palavra-passe

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "O utilizador iniciou sessão com sucesso!",
    "data": {
      "id": 3,
      "username": "mariocosta",
      "name": "Restaurante Mário Costa",
      "email": "mc@picand.go",
      "url_photo": "10-1-2021_20_49_21.jpg",
      "type": 2
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpb2Nvc3RhIiwibmFtZSI6IlJlc3RhdXJhbnRlIE3DoXJpbyBDb3N0YSIsImVtYWlsIjoibWNAcGljYW5kLmdvIiwidXJsX3Bob3RvIjoiMTAtMS0yMDIxXzIwXzQ5XzIxLmpwZyIsInR5cGUiOjIsImlhdCI6MTY4OTcyMjcwNSwiZXhwIjoxNjg5ODA5MTA1fQ.9UL37wMxpTSJiKFGS5yJHudI7yCQr37pEGnYpRyPw9k"
  }
  ```

- **Erro:**

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

---

<br />

### / users / account <br /><br />

- **Descrição:**
  `Obter dados de um utilizador com sessão iniciada.`

- **Método:**
  `GET`
- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Dados do utilizador obtidos com sucesso!",
    "data": {
      "id": 6,
      "username": "emmasantos",
      "password": "$2b$10$p0V2IuPVHYZzMtyVRS3i6.qD/IgJTUPY0jQ8.pJI/C48mKfJlG4qm",
      "name": "Emma",
      "surname": "Santos",
      "email": "es@picand.go",
      "phone_number": 962345678,
      "address": "Rua das Andorinhas",
      "zip_code": "4123-345",
      "nif": null,
      "description": null,
      "url_photo": "14-1-2021_22_33_11.jpg",
      "url_driving_license": "18-1-2021_17_57_9.pdf",
      "driving_license": "1",
      "old_type": 3,
      "accepted": 1,
      "deleted": 0,
      "type": 3
    }
  }
  ```

- **Erro:**

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

### / users / get-user / { id } <br /><br />

- **Descrição:**
  `Obter um utilizador.`

- **Método:**
  `GET`

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizador obtido com sucesso!",
    "data": {
      "id": 3,
      "username": "mariocosta",
      "name": "Restaurante Mário Costa",
      "email": "mc@picand.go",
      "description": "Com uma decoração rústica, o nosso restaurante dá aos clientes a sensação de tranquilidade que desejam.",
      "address": "Rua das Tulipas",
      "zip_code": "4123-678",
      "url_photo": "10-1-2021_20_49_21.jpg",
      "type": 2
    }
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O utilizador não existe."
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

- **Descrição:**
  `Obter os comerciantes.`

- **Método:**
  `GET`

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Comerciantes obtidos com sucesso!",
    "data": [
      {
        "id": 3,
        "username": "mariocosta",
        "name": "Restaurante Mário Costa",
        "email": "mc@picand.go",
        "description": "Com uma decoração rústica, o nosso restaurante dá aos clientes a sensação de tranquilidade que desejam.",
        "address": "Rua das Tulipas",
        "zip_code": "4123-678",
        "url_photo": "10-1-2021_20_49_21.jpg",
        "type": 2
      },
      {
        "id": 4,
        "username": "anaandrade",
        "name": "Restaurante Dona Ana",
        "email": "aa@picand.go",
        "description": "Aquele restaurante que todos desejam na hora de comer algo rápido.",
        "address": "Rua da Liberdade",
        "zip_code": "5123-876",
        "url_photo": "11-1-2021_14_47_28.jpg",
        "type": 2
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem comerciantes."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

### / users / accepted <br /><br />

- **Descrição:**
  `Obter os utilizadores (aceites) que têm acesso à aplicação.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um admin)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizadores obtidos com sucesso!",
    "data": [
      {
        "id": 1,
        "username": "danielasilva",
        "email": "ds@picand.go",
        "type": 1
      },
      {
        "id": 2,
        "username": "paulofigueiredo",
        "email": "pf@picand.go",
        "type": 1
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem utilizadores aceites."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Obter os utilizadores (por aceitar) para ter acesso à aplicação.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um admin)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizadores obtidos com sucesso!",
    "data": [
      {
        "id": 12,
        "username": "mariocosta2",
        "name": "Restaurante Mário Costa",
        "email": "mc2@picand.go",
        "description": "Com uma decoração rústica, o nosso restaurante dá aos clientes a sensação de tranquilidade que desejam.",
        "phone_number": 931345678,
        "address": "Rua das Tulipas",
        "zip_code": "4123-567",
        "driving_license": null,
        "url_photo": "19-7-2023_16_49_8.jpg",
        "url_driving_license": null,
        "type": 2
      },
      {
        "id": 14,
        "username": "emmasantos2",
        "name": "Emma",
        "email": "es2@picand.go",
        "description": null,
        "phone_number": 962345678,
        "address": "Rua das Andorinhas",
        "zip_code": "4123-345",
        "driving_license": "2",
        "url_photo": "default.png",
        "url_driving_license": "19-7-2023_16_54_25.pdf",
        "type": 3
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem utilizadores por aceitar."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

### / users / edit-data <br /><br />

- **Descrição:**
  `Editar os dados de um utilizador.`

- **Método:**
  `PUT`

- **Body [raw]:**

  **Obrigatório:**

  `username: string` campo para o nome de utilizador\
  `name: string` campo para o nome\
  `surname: string` campo para o apelido\
  `email: string` campo para o email\
  `phone_number: integer` campo para o número de telemóvel\
  `address: string` campo para a morada\
  `zip_code: string` campo para o código postal

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizador editado com sucesso!",
    "data": {
      "id": 8,
      "username": "miguelmachado",
      "name": "Miguel",
      "email": "mmm@picand.go",
      "url_photo": "19-7-2023_19_21_51.jpg",
      "type": 4
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJtaWd1ZWxtYWNoYWRvIiwibmFtZSI6Ik1pZ3VlbCIsImVtYWlsIjoibW1tQHBpY2FuZC5nbyIsInVybF9waG90byI6IjE5LTctMjAyM18xOV8yMV81MS5qcGciLCJ0eXBlIjo0LCJpYXQiOjE2ODk4MDI1MTksImV4cCI6MTY4OTg4ODkxOX0.40ABTovpYZQZWd0OGWAZmBOh0zPbO5wEy_ObgLXrbxw"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O nome de utilizador não foi preenchido."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

### / users / edit-password <br /><br />

- **Descrição:**
  `Editar a palavra-passe de um utilizador.`

- **Método:**
  `PATCH`

- **Body [raw]:**

  **Obrigatório:**

  `password: string` campo para a palavra-passe

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Palavra-passe editada com sucesso!",
    "data": {
      "id": 4,
      "username": "miguelgoncalves",
      "name": "Miguel",
      "email": "mg@picand.go",
      "url_photo": "19-7-2023_19_21_51.jpg",
      "type": 4
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoidSBhbHRlcmFkbyIsIm5hbWUiOiJuIGFsdGVyYWRvIiwiZW1haWwiOiJhbHRlcmFkb0BwaWNhbmQuZ28iLCJ1cmxfcGhvdG8iOiJkZWZhdWx0LnBuZyIsInR5cGUiOjEsImlhdCI6MTYxMTM3MTk3NCwiZXhwIjoxNjExNDU4Mzc0fQ.guK5JsuUVUre_2IswHRmUb1CDK3L4grexYX5KEAUEA8"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! A palavra-passe não foi preenchido."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
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

- **Descrição:**
  `Editar a foto de um utilizador.`

- **Método:**
  `PATCH`

- **Body [form-data]:**

  **Obrigatório:**

  `file: file [uploaded from computer]` campo para carregar foto do dispositivo

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Foto do utilizador editada com sucesso",
    "data": {
      "id": 8,
      "username": "miguelgoncalves",
      "name": "Miguel",
      "email": "mg@picand.go",
      "url_photo": "19-7-2023_19_15_27.jpg",
      "type": 4
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiJtaWd1ZWxnb25zYWx2ZXMiLCJuYW1lIjoiTWlndWVsIiwiZW1haWwiOiJtZ0BwaWNhbmQuZ28iLCJ1cmxfcGhvdG8iOiIxOS03LTIwMjNfMTlfMTVfMjcuanBnIiwidHlwZSI6NCwiaWF0IjoxNjg5NzkwNTI3LCJleHAiOjE2ODk4NzY5Mjd9.TtpUZblz8imy34B6bUgmkV0HuZftnRnUV3Zxqfpb2G0"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! A foto do utilizador não foi preenchida."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
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

- **Descrição:**
  `Editar a carta de condução de um condutor.`

- **Método:**
  `PATCH`

- **Body [form-data]:**

  **Obrigatório:**

  `driving_license: integer` campo para o tipo da carta de condução\
  `file: file [uploaded from computer]` campo para carregar pdf do dispositivo

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um condutor)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Carta de condução editada com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O tipo de carta de condução não foi preenchida."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Aceitar um utilizador (por aceitar) para ter acesso à aplicação..`

- **Método:**
  `PATCH`

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do utilizador por aceitar

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um admin)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizador aceitado com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem utilizadores por aceitar."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Definir um utilizador como admin.`

- **Método:**
  `PATCH`

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do utilizador a ser definido como admin

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um admin)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizador definido como admin com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O utilizador não existe."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Remover um utilizador de admin.`

- **Método:**
  `PATCH`

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do utilizador a ser removido de utilizador

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um admin)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizador removido de admin com sucesso! Voltou ao seu tipo antigo."
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O utilizador não existe."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

### / users / delete <br /><br />

- **Descrição:**
  `Apagar um utilizador com sessão iniciada.`

- **Método:**
  `DELETE`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Utilizador excluído com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O utilizador não existe."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

---

<br />

### / products / merchant-logged <br /><br />

- **Descrição:**
  `Obter os produtos de um comerciante com sessão iniciada.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um comerciante)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Produtos obtidos com sucesso!",
    "data": [
      {
        "id": 1,
        "product_name": "Bacalhau à Gomes de Sá",
        "stock": 9,
        "price": 2.99,
        "description": "O Bacalhau à Gomes de Sá está na lista dos pratos portugueses mais tradicionais.",
        "product_url_photo": "15-7-2023_15_18_17.jpg",
        "user_name": "Restaurante Mário Costa"
      },
      {
        "id": 3,
        "product_name": "Francesinha à moda do Porto",
        "stock": 0,
        "price": 6,
        "description": "Prato originário e típico da cidade do Porto.",
        "product_url_photo": "15-7-2023_15_20_44.jpg",
        "user_name": "Restaurante Mário Costa"
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem produtos."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
  ```

  <br />

### / products / { id } <br /><br />

- **Descrição:**
  `Obter os produtos de um comerciante.`

- **Método:**
  `GET`

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do comerciante

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Produtos obtidos com sucesso!",
    "data": [
      {
        "id": 1,
        "product_name": "Bacalhau à Gomes de Sá",
        "stock": 9,
        "price": 2.99,
        "description": "O Bacalhau à Gomes de Sá está na lista dos pratos portugueses mais tradicionais.",
        "product_url_photo": "15-7-2023_15_18_17.jpg",
        "user_name": "Restaurante Mário Costa"
      },
      {
        "id": 3,
        "product_name": "Francesinha à moda do Porto",
        "stock": 0,
        "price": 6,
        "description": "Prato originário e típico da cidade do Porto.",
        "product_url_photo": "15-7-2023_15_20_44.jpg",
        "user_name": "Restaurante Mário Costa"
      }
    ]
  }
  ```

- **Erro:**

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

  <br />

### / products / create <br /><br />

- **Descrição:**
  `Criar um produto de um comerciante.`

- **Método:**
  `POST`

- **Body [form-data]:**

  **Obrigatório:**

  `name: string` campo para o nome\
  `stock: integer` campo para a quantidade de stock\
  `price: real` campo para o preço\
  `description: string` campo para a descrição\
  `file: file [uploaded from computer]` campo para carregar foto do dispositivo

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um comerciante)

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "Produto criado com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O nome do produto não foi preenchido."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Editar os dados de um produto de um comerciante.`

- **Método:**
  `PUT`

- **Body [raw]:**

  **Obrigatório:**

  `name: string` campo para o nome\
  `price: real` campo para o preço\
  `stock: integer` campo para a quantidade de stock\
  `description: string` campo para a descrição

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do produto

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um comerciante)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Dados do produto editados com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O produto não existe ou não pertence a este comerciante."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Editar a foto de um produto de um comerciante.`

- **Método:**
  `PATCH`

- **Body [form-data]:**

  **Obrigatório:**

  `file: file [uploaded from computer]`

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do produto

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um comerciante)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Foto do produto editada com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O produto não existe ou não pertence a este comerciante."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Apagar um produto de um comerciante.`

- **Método:**
  `DELETE`

- **Params:**

  **Obrigatório:**

  `id: integer` campo para o ID do produto

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um comerciante)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Produto excluído com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O produto não existe ou não pertence a este comerciante."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
  ```

  <br />

---

<br />

### / orders <br /><br />

- **Descrição:**
  `Obter as encomendas de um utilizador com sessão iniciada.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Encomendas obtidas com sucesso!",
    "data": [
      {
        "id": 6,
        "address": "Rua das Tulipas",
        "zip_code": "4123-678",
        "date": "19-7-2023, 14:17",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 6.63,
        "accepted": 0,
        "canceled": 0,
        "product_id": 5,
        "product_name": "Hambúrguer de Frango",
        "price": 4.49,
        "description": "Comida caseira sem glúten.",
        "url_photo": "15-7-2023_15_2_54.jpg",
        "merchant_name": "Hamburgaria Vasco",
        "client_name": "Restaurante Mário Costa",
        "client_email": "mc@picand.go",
        "client_phone_number": 931345678,
        "pending": null,
        "completed": null
      },
      {
        "id": 7,
        "address": "Rua das Tulipas",
        "zip_code": "4123-678",
        "date": "19-7-2023, 14:17",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 4.43,
        "accepted": 1,
        "canceled": 0,
        "product_name": "Salada Mista",
        "price": 2.7,
        "description": "Alface, Tomate, Cebola, Cenoura, Couve Roxa.",
        "url_photo": "15-7-2023_14_44_37.jpg",
        "merchant_name": "Restaurante Dona Ana",
        "client_name": "Restaurante Mário Costa",
        "client_email": "mc@picand.go",
        "client_phone_number": 931345678,
        "pending": 1,
        "completed": 0
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem encomendas."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
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

- **Descrição:**
  `Obter as encomendas (vendas) de um comerciante.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um comerciante)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Encomendas obtidas com sucesso!",
    "data": [
      {
        "id": 2,
        "address": "Rua das Flores",
        "zip_code": "2214-654",
        "date": "17-7-2023, 10:31",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 2.69,
        "accepted": 1,
        "canceled": 0,
        "product_name": "Sopa Creme de Cenoura",
        "price": 1.29,
        "description": "700g.",
        "client_name": "Daniela",
        "client_email": "ds@picand.go",
        "client_phone_number": 912345678,
        "pending": 0,
        "completed": 1
      },
      {
        "id": 3,
        "address": "Rua da Liberdade",
        "zip_code": "5123-876",
        "date": "17-7-2023, 10:33",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 4.78,
        "accepted": 0,
        "canceled": 0,
        "product_name": "Bacalhau à Gomes de Sá",
        "price": 2.99,
        "description": "O Bacalhau à Gomes de Sá está na lista dos pratos portugueses mais tradicionais.",
        "client_name": "Restaurante Dona Ana",
        "client_email": "aa@picand.go",
        "client_phone_number": 942345678,
        "pending": null,
        "completed": null
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem encomendas."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Orders"
  }
  ```

  <br />

### / orders / driver <br /><br />

- **Descrição:**
  `Obter as encomendas (entregues) de um condutor.`

- **Método:**
  `GET`
- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um condutor)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Encomendas obtidas com sucesso!",
    "data": [
      {
        "id": 2,
        "address": "Rua das Flores",
        "zip_code": "2214-654",
        "date": "17-7-2023, 10:31",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 2.69,
        "accepted": 1,
        "canceled": 0,
        "delivery_id": 6,
        "pending": 0,
        "completed": 1,
        "client_name": "Daniela",
        "client_phone_number": 912345678,
        "client_email": "ds@picand.go",
        "product_name": "Sopa Creme de Cenoura",
        "price": 1.29,
        "description": "700g.",
        "merchant_name": "Restaurante Mário Costa"
      },
      {
        "id": 1,
        "address": "Rua das Flores",
        "zip_code": "2214-654",
        "date": "17-7-2023, 10:30",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 5.9,
        "accepted": 1,
        "canceled": 0,
        "delivery_id": 6,
        "pending": 1,
        "completed": 0,
        "client_name": "Daniela",
        "client_phone_number": 912345678,
        "client_email": "ds@picand.go",
        "product_name": "Frango assado na brasa",
        "price": 3.9,
        "description": "1/2 dose. Sem molhos.",
        "merchant_name": "Restaurante Dona Ana"
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem encomendas."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Orders"
  }
  ```

  <br />

### / orders / not-accepted <br /><br />

- **Descrição:**
  `Obter as encomendas (por aceitar) de um condutor.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um condutor)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Encomendas obtidas com sucesso!",
    "data": [
      {
        "id": 3,
        "address": "Rua da Liberdade",
        "zip_code": "5123-876",
        "date": "17-7-2023, 10:33",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 4.78,
        "accepted": 0,
        "canceled": 0,
        "product_name": "Bacalhau à Gomes de Sá",
        "price": 2.99,
        "description": "O Bacalhau à Gomes de Sá está na lista dos pratos portugueses mais tradicionais.",
        "url_photo": "15-7-2023_15_18_17.jpg",
        "merchant_name": "Restaurante Mário Costa",
        "client_name": "Restaurante Dona Ana",
        "client_email": "aa@picand.go",
        "client_phone_number": 942345678
      },
      {
        "id": 4,
        "address": "Rua das Tulipas",
        "zip_code": "4123-678",
        "date": "17-7-2023, 16:44",
        "vat": 0.23,
        "pick_up_fee": 0.9,
        "total": 8.49,
        "accepted": 0,
        "canceled": 0,
        "product_name": "Francesinha à moda do Porto",
        "price": 6,
        "description": "Prato originário e típico da cidade do Porto.",
        "url_photo": "15-7-2023_15_20_44.jpg",
        "merchant_name": "Restaurante Mário Costa",
        "client_name": "Emma",
        "client_email": "es@picand.go",
        "client_phone_number": 962345678
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! Não existem utilizadores por aceitar."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Users"
  }
  ```

  <br />

### / orders / create <br /><br />

- **Descrição:**
  `Criar uma encomenda do utilizador.`

- **Método:**
  `POST`

- **Body [raw]:**

  **Obrigatório:**

  `address: string` campo para a morada\
  `zip_code: string` campo para o código postal\
  `product_id: integer` campo para o ID do produto

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "Encomenda criada com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! O stock esgotou."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
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

- **Descrição:**
  `Cancelar uma encomenda do utilizador.`

- **Método:**
  `DELETE`

- **Body [raw]:**

  **Obrigatório:**

  `product_id: integer` campo para o ID do produto\
  `order_id: integer` campo para o ID da encomenda

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com qualquer utilizador)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Encomenda cancelada com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! A encomenda não está disponível para cancelar."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! Erro ao autenticar."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Orders"
  }
  ```

  <br />

---

<br />

### / deliveries <br /><br />

- **Descrição:**
  `Obter as entregas de um condutor.`

- **Método:**
  `GET`

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um condutor)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Entregas obtidas com sucesso!",
    "data": [
      {
        "order_id": 1,
        "address": "Rua das Flores",
        "date": "17-7-2023, 10:30",
        "total": 5.9,
        "accepted": 1,
        "canceled": 0,
        "delivery_user_id": 6,
        "client_name": "Emma"
      },
      {
        "order_id": 2,
        "address": "Rua das Flores",
        "date": "17-7-2023, 10:31",
        "total": 2.69,
        "accepted": 1,
        "canceled": 0,
        "delivery_user_id": 6,
        "client_name": "Emma"
      }
    ]
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! A encomenda não existe ou foi cancelada."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Aceitar uma entrega de um condutor.`

- **Método:**
  `POST`

- **Body [raw]:**

  **Obrigatório:**

  `order_id: integer` campo para o ID da encomenda

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um condutor)

- **Sucesso:**

  **Status:** `201 CREATED` <br />

  ```json
  {
    "message": "Encomenda aceite (para envio) com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! A encomenda não existe ou foi cancelada."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
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

- **Descrição:**
  `Concluir uma entrega de um condutor.`

- **Método:**
  `PATCH`

- **Body [raw]:**

  **Obrigatório:**

  `order_id: integer` campo para o ID da encomenda

- **Authorization:**

  **Obrigatório:**

  `token: bearer token` campo para o token (iniciar sessão com um condutor)

- **Sucesso:**

  **Status:** `200 OK` <br />

  ```json
  {
    "message": "Entrega concluída com sucesso!"
  }
  ```

- **Erro:**

  **Status:** `400 BAD REQUEST` <br />

  ```json
  {
    "message": "Ups! A entrega não existe ou já foi entregue pelo condutor."
  }
  ```

  **Status:** `401 UNAUTHORIZED` <br />

  ```json
  {
    "message": "Ups! O utilizador não tem permissão para executar esta operação."
  }
  ```

  **Status:** `500 INTERNAL SERVER ERROR` <br />

  ```json
  {
    "message": "Oh! SQLITE_ERROR: no such table: Products"
  }
  ```
