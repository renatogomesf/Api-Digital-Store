# Bem-vindo(a) à Api-Digital-Store :)

Para rodar essa api vamos precisar fazer algumas configurações e criações antes.

### Clonando o repositório
1) Primeiramente clone/faça o download deste reposítorio para sua máquina;
2) Com ele em sua máquina, abra a pasta raiz do projeto no seu editor de código e aperte `Ctrl + "` para abri o terminal. (Você também pode abrir a pasta raiz do projeto direto no seu prompt/terminal sem preicasr abrir antes no editor de código);
3) Após navegar até a pasta raiz no terminal, digite `npm instal` para instalar as depêndencias do projeto. Com isso, o **repositório está clonado! :)**

### Crie um banco de dados no MySQL
1) Crie uma "Connection" ou use uma já existente.
2) Dentro da connection , crie um banco de dados/Schema com o nome que preferir, mas lembre-se de usar exatamente o mesmo nome dentro do arquivo .env para realizar a conexão da api com o banco.

### Configurando projeto e criando tabelas
1) Com projeto aberto em seu editor de código, localize o arquivo `.env.CONFIG` na raiz e renomeie para `.env`;
2) Abra o arquivo `.env` e alimente as variáveis com as informações necessárias. **Não mude o nome das variáveis e ponha os valores como _string_ onde existir áspas e exatamente como foram definidas no MySQL!**;
   
> [!IMPORTANT]
> **Não mude o nome das variáveis e ponha os valores como _string_ onde existir áspas e exatamente como foram definidas no MySQL!**

4) Com tudo devidamente preenchido, abra novamente o terminal do seu editor de código e digite `npm run sync`. Este comando irá conectar a api com o banco de dados e fazer a criação das tabelas e suas interações.

# Rodando a api e testando rotas
### Para rodar a api basta digitar `npm start` no terminal

Antes de ralizar o CRUD completo de todas as rotas, é preciso cadastrar um usuário e fazer login para gerar um token e, com esse token, ter acesso a toda api. Então vamos fazer isso!

<details>
  <summary><strong> CADASTRO de Usuário </strong></summary><br>
 
 - ![Static Badge](https://img.shields.io/badge/POST-36a01e)   /v1/user

**Request body**
```json
 {
   "firstname": "NOME",
   "surname": "SOBRENOME",
   "email": "NOME@gmail.com",
   "password": "777",
   "confirmPassword": "777"
 }
```
> Preencha todos os campos para realizar o cadastro e com senhas correspondentes.

**Responses**
* 201 - Creatad
```json
 {
   "message": "Usuário cadastrado com sucesso."
 }
```

* 400 - Bad Request
```json
 {
   "message": "Preencha todos os campos para realizar o cadastro."
 }
```

* 401 - Unauthorized
```json
 {
   "message": "Senhas não correspondem."
 }
```
</details>


<details>
  <summary><strong> LOGIN para gerar token </strong></summary><br>
 
 - ![Static Badge](https://img.shields.io/badge/POST-3bd339)   /login

**Request body**
```json
 {
   "email": "NOME@gmail.com",
   "password": "777"
 }
```
> Preencha todos os campos para realizar login.

**Responses**
* 200 - Ok
```json
 {
   "token": "RETORNARÁ UM TOKEN JWT"
 }
```
> O token gerado expira em 1h.

* 400 - Bad Request
```json
 {
   "message": "Preencha todos os campos para efetuar login."
 }
```

* 401 - Unauthorized
```json
 {
   "message": "Login ou Senha incorreto."
 }
```
</details>

Após o cadastro e de posse do token gerado no login, acesse os headers de POST, PUT e DELETE e adicione a chave `authorization` com seu valor sendo o token gerado. Com isso, você terá acesso às rotas da API. As rotas GET não precisam de token.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## CRUD de Usuários

<details>
  <summary><strong> GET - Listar todos os usuários </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/GET-883aaf)   /v1/user

**Responses**
* 200 - Ok
```json
[
   {
      "id": 1,
      "firstname": "NOME",
      "surname": "SOBRENOME",
      "email": "NOME@gmail.com"
   },
   {
      "id": 2,
      "firstname": "NOME 02",
      "surname": "SOBRENOME 02",
      "email": "NOME02@gmail.com"
   }
]
```

* 404 - Not Found
```json
{
   "message": "Usuários não encontrado."
}
```
</details>


<details>
  <summary><strong> GET ID - Listar usuário por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/GET-883aaf)   /v1/user/:id

**Responses**
* 200 - Ok
```json
{
   "id": 1,
   "firstname": "NOME",
   "surname": "SOBRENOME",
   "email": "NOME@gmail.com"
}
```

* 404 - Not Found
```json
{
   "message": "Usuário não encontrado."
}
```
</details>


<details>
  <summary><strong> POST - Cadastrar usuário </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/POST-36a01e)   /v1/user

> Esta rota é a mesma do cadastro feito anterior mente e não requer um token de autorização.

**Request body**
```json
 {
   "firstname": "NOME",
   "surname": "SOBRENOME",
   "email": "NOME@gmail.com",
   "password": "777",
   "confirmPassword": "777"
 }
```

**Responses**
* 201 - Creatad
```json
 {
   "message": "Usuário cadastrado com sucesso."
 }
```

* 400 - Bad Request
```json
 {
   "message": "Preencha todos os campos para realizar o cadastro."
 }
```

* 401 - Unauthorized
```json
 {
   "message": "Senhas não correspondem."
 }
```
</details>


<details>
  <summary><strong> PUT - Atualizar um usuário por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/PUT-bf8226)   /v1/user/:id

**Request body**
```json
 {
   "firstname": "NOME ATUALIZADO",
   "surname": "SOBRENOME ATUALIZADO",
   "email": "NOME@gmail.com"
 }
```

**Responses**
* 204 - No Content `Sem response`

* 400 - Bad Request
```json
 {
   "message": "Preencha todos os campos para atualizar."
 }
```

* 401 - Unauthorized
```json
 {
   "message": "Acesso não autorizado. Faça login para realizar a ação."
 }
```

* 404 - Not Found
```json
 {
   "message": "Usuário com id ${id} não encontrado."
 }
```
</details>


<details>
  <summary><strong> DELETE - Deletar um usuário por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/DELETE-dd2525)   /v1/user/:id

**Responses**
* 204 - No Content `Sem response`

* 401 - Unauthorized
```json
 {
   "message": "Acesso não autorizado. Faça login para realizar a ação."
 }
```

* 404 - Not Found
```json
 {
   "message": "Usuário com id ${id} não encontrado."
 }
```
</details>
------------------------------------------------------------------------------------------------------------------------------------------------------------

## CRUD de categorias

<details>
  <summary><strong> GET - Listar todas as categorias </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/GET-883aaf)   /v1/category/search?limit=-1&page=1&fields=id,name,slug,use_in_menu&use_in_menu=true

**Query params**
  - `limit=-1`
    - Query string para definir o limit de itens por página
    - Use `-1` como valor para buscar todos os itens
    - Padrão: 12
  - `page=1`
    - Query string para definir a paginação dos dados retornados
    - Quando `limit` receber `-1` a opção de `page` não tem nenhum efeito no resultado da busca
    - Padrão: 1
  - `fields=name,slug`
    - Query string para limitar quais campos serão retornados
  - `use_in_menu=true`
    - Query string para filtrar apenas as categorias que podem aparecer no menu

**Responses**
* 200 - Ok
```json
{
"data": [
      {
         "id": 1,
         "name": "Shoes",
         "slug": "shoes",
         "use_in_menu": 1
      },
      {
         "id": 2,
         "name": "Offers",
         "slug": "offers",
         "use_in_menu": 1
      },
      {
         "id": 3,
         "name": "Black Friday",
         "slug": "black-friday",
         "use_in_menu": 1
      }
   ],
   "total": 3,
   "limit": "-1",
   "page": ""
}
```

* 400 - Bad Request
```json
{
   "message": "Envie todos os campos para realizar busca."
}
```

* 404 - Not Found
```json
{
   "message": "Categorias não encontrada."
}
```
</details>


<details>
  <summary><strong> GET ID - Listar categoria por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/GET-883aaf)   /v1/category/:id

**Responses**
* 200 - Ok
```json
{
   "id": 1,
   "name": "Shoes",
   "slug": "shoes",
   "use_in_menu": 1
}
```

* 404 - Not Found
```json
{
   "message": "Categoria não encontrada."
}
```
</details>


<details>
  <summary><strong> POST - Cadastrar usuário </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/POST-36a01e)   /v1/user

> Esta rota é a mesma do cadastro feito anterior mente e não requer um token de autorização.

**Request body**
```json
 {
   "firstname": "NOME",
   "surname": "SOBRENOME",
   "email": "NOME@gmail.com",
   "password": "777",
   "confirmPassword": "777"
 }
```

**Responses**
* 201 - Creatad
```json
 {
   "message": "Usuário cadastrado com sucesso."
 }
```

* 400 - Bad Request
```json
 {
   "message": "Preencha todos os campos para realizar o cadastro."
 }
```

* 401 - Unauthorized
```json
 {
   "message": "Senhas não correspondem."
 }
```
</details>


<details>
  <summary><strong> PUT - Atualizar um usuário por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/PUT-bf8226)   /v1/user/:id

**Request body**
```json
 {
   "firstname": "NOME ATUALIZADO",
   "surname": "SOBRENOME ATUALIZADO",
   "email": "NOME@gmail.com"
 }
```

**Responses**
* 204 - No Content `Sem response`

* 400 - Bad Request
```json
 {
   "message": "Preencha todos os campos para atualizar."
 }
```

* 401 - Unauthorized
```json
 {
   "message": "Acesso não autorizado. Faça login para realizar a ação."
 }
```

* 404 - Not Found
```json
 {
   "message": "Usuário com id ${id} não encontrado."
 }
```
</details>


<details>
  <summary><strong> DELETE - Deletar um usuário por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/DELETE-dd2525)   /v1/user/:id

**Responses**
* 204 - No Content `Sem response`

* 401 - Unauthorized
```json
 {
   "message": "Acesso não autorizado. Faça login para realizar a ação."
 }
```

* 404 - Not Found
```json
 {
   "message": "Usuário com id ${id} não encontrado."
 }
```
</details>



