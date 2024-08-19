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
   
> [!WARNING]
> Não mude o nome das variáveis e ponha os valores como _string_ onde existir áspas e exatamente como foram definidas no MySQL!

4) Com tudo devidamente preenchido, abra novamente o terminal do seu editor de código e digite `npm run sync`. Este comando irá conectar a api com o banco de dados e fazer a criação das tabelas e suas interações.

# Rodando a api, criando o primeiro usuário e testando rotas
### Para rodar a api basta digitar `npm start` no terminal

> [!IMPORTANT]
> Antes de ralizar o CRUD completo de todas as rotas, é preciso cadastrar um usuário e fazer login para gerar um token e, com esse token, ter acesso a toda api. Então vamos fazer isso!

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

> [!IMPORTANT]
> Após o cadastro e de posse do token gerado no login, acesse os headers de POST, PUT e DELETE e adicione a chave `authorization` com seu valor sendo o token gerado. Com isso, você terá acesso às rotas da API. As rotas GET não precisam de token.


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
  <summary><strong> POST - Cadastrar categoria </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/POST-36a01e)   /v1/category

**Request body**
```json
 {
   "name": "Teste",
   "slug": "teste",
   "use_in_menu": true
 }
```

**Responses**
* 201 - Creatad
```json
 {
   "message": "Categoria cadastrada com sucesso."
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
   "message": "Acesso não autorizado. Faça login para realizar a ação."
 }
```
</details>


<details>
  <summary><strong> PUT - Atualizar um categoria por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/PUT-bf8226)   /v1/category/:id

**Request body**
```json
 {
   "name": "Teste",
   "slug": "teste",
   "use_in_menu": true
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
   "message": "Categoria com id ${id} não encontrada."
 }
```
</details>


<details>
  <summary><strong> DELETE - Deletar um categoria por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/DELETE-dd2525)   /v1/category/:id

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
   "message": "Categoria com id ${id} não encontrada."
 }
```
</details>


## CRUD de produtos

<details>
  <summary><strong> GET - Listar todos os produtos </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/GET-883aaf)   /v1/product/search?limit=12&page=1&fields=id,enable,name,slug,stock,description,price,price_with_discount&match=produto&category_ids=1,2,3,4&price_range=0-1000&option=P,M,G

**Query params**
  - `limit=30`
    - Query string para definir o limit de itens por página
    - Use `-1` como valor para buscar todos os itens
    - Padrão: 12
  - `page=2`
    - Query string para definir a paginação dos dados retornados
    - Quando `limit` receber `-1` a opção de `page` não tem nenhum efeito no resultado da busca
    - Padrão: 1
  - `fields=name,images,price`
    - Query string para limitar quais campos serão retornados
  - `match=Tênis`
    - Query string usada para filtrar o resultado de produtos por um termo que combine com o nome ou descrição do produto
  - `category_ids=15,24`
    - Query string usada para filtrar o resultado de produtos pelo ID das categorias
  - `price-range=100-200`
    - Query string para filtrar o resultado de produtos por uma determinada "janela" de preços 
  - `option[45]=GG,PP`
    - Query string para filtrar o resultado de produtos pelo valor das opções disponíveis

**Responses**
* 200 - Ok
```json
{
   "data": [
      {
         "id": 111,
         "enable": 1,
         "name": "Produto 01",
         "slug": "produto-01",
         "stock": 10,
         "description": "Descrição produto 01",
         "price": 180,
         "price_with_discount": 99.9,
         "Categoria": [
            {
               "id": 1,
               "ProductCategoryModel": {
                  "product_id": 111,
                  "category_id": 1
               }
            },
            {
               "id": 3,
               "ProductCategoryModel": {
                  "product_id": 111,
                  "category_id": 3
               }
            },
            {
               "id": 4,
               "ProductCategoryModel": {
                  "product_id": 111,
                  "category_id": 4
               }
            }
         ],
         "Imagens": [
            {
               "id": 79,
               "enable": 1,
               "path": "base64 da imagem 1"
            },
            {
               "id": 80,
               "enable": 1,
               "path": "base64 da imagem 2"
            },
            {
               "id": 81,
               "enable": 1,
               "path": "base64 da imagem 3"
            }
         ],
         "Opicoes": [
            {
               "id": 42,
               "title": "Cor",
               "shape": "circle",
               "radius": 0,
               "type": "color",
               "values": "#000,#fff"
            },
            {
               "id": 41,
               "title": "Tamanho",
               "shape": "square",
               "radius": 4,
               "type": "text",
               "values": "M,G,GG"
            }
         ]
      },
      {
         "id": 112,
         "enable": 1,
         "name": "Produto 02",
         "slug": "produto-02",
         "stock": 10,
         "description": "Descrição produto 02",
         "price": 250,
         "price_with_discount": 170.9,
         "Categoria": [
            {
               "id": 1,
               "ProductCategoryModel": {
                  "product_id": 112,
                  "category_id": 1
               }
            },
            {
               "id": 2,
               "ProductCategoryModel": {
                  "product_id": 112,
                  "category_id": 2
               }
            }
         ],
         "Imagens": [
            {
               "id": 82,
               "enable": 1,
               "path": "base64 da imagem 12"
            },
            {
               "id": 83,
               "enable": 1,
               "path": "base64 da imagem 22"
            },
            {
               "id": 84,
               "enable": 1,
               "path": "base64 da imagem 32"
            }
         ],
         "Opicoes": [
            {
               "id": 44,
               "title": "Cor",
               "shape": "circle",
               "radius": 0,
               "type": "color",
               "values": "#000,#fff"
            },
            {
               "id": 43,
               "title": "Tamanho",
               "shape": "square",
               "radius": 4,
               "type": "text",
               "values": "P,M,G"
            }
         ]
      }
   ],
   "total": 2,
   "limit": "12",
   "page": "1"
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
   "message": "Produtos não encontrado."
}
```
</details>


<details>
  <summary><strong> GET ID - Listar produto por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/GET-883aaf)   /v1/product/:id

**Responses**
* 200 - Ok
```json
{
   "id": 111,
   "enable": 1,
   "name": "Produto 01",
   "slug": "produto-01",
   "stock": 10,
   "description": "Descrição produto 01",
   "price": 180,
   "price_with_discount": 99.9,
   "Categoria": [
      {
         "id": 1,
         "ProductCategoryModel": {
            "product_id": 111,
            "category_id": 1
         }
      },
      {
         "id": 3,
         "ProductCategoryModel": {
            "product_id": 111,
            "category_id": 3
         }
      },
      {
         "id": 4,
         "ProductCategoryModel": {
            "product_id": 111,
            "category_id": 4
         }
      }
   ],
   "Imagens": [
      {
         "id": 79,
         "enable": 1,
         "path": "base64 da imagem 1"
      },
      {
         "id": 80,
         "enable": 1,
         "path": "base64 da imagem 2"
      },
      {
         "id": 81,
         "enable": 1,
         "path": "base64 da imagem 3"
      }
   ],
   "Opicoes": [
      {
         "id": 42,
         "title": "Cor",
         "shape": "circle",
         "radius": 0,
         "type": "color",
         "values": "#000,#fff"
      },
      {
         "id": 41,
         "title": "Tamanho",
         "shape": "square",
         "radius": 4,
         "type": "text",
         "values": "M,G,GG"
      }
   ]
}
```

* 404 - Not Found
```json
{
   "message": "Produto não encontrado."
}
```
</details>


<details>
  <summary><strong> POST - Cadastrar produto </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/POST-36a01e)   /v1/product

**Request body**
```json
{
   "enable": true,
   "name": "Produto 02",
   "slug": "produto-02",
   "use_in_menu": true,
   "stock": 10,
   "description": "Descrição produto 02",
   "price": 250.00,
   "price_with_discount": 170.90,
   "Categoria": [1, 2],
   "Imagens": [
      {
        "enable": true,
        "path": "base64 da imagem 12"
      },
      {
        "enable": true,
        "path": "base64 da imagem 22"
      },
      {
        "enable": true,
        "path": "base64 da imagem 32"
      }
   ],
   "Opicoes": [
      {
        "title": "Tamanho",
        "shape": "square",
        "radius": "4",
        "type": "text",
        "values": "P,M,G"
      },
      {
        "title": "Cor",
        "shape": "circle",
        "type": "color",
        "values": "#000,#fff"
      }
   ]   
}
```

**Responses**
* 201 - Creatad
```json
 {
   "message": "Produto cadastrado com sucesso."
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
   "message": "Acesso não autorizado. Faça login para realizar a ação."
 }
```
</details>


<details>
  <summary><strong> PUT - Atualizar um produto por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/PUT-bf8226)   /v1/product/:id

**Request body**
```json
{
   "enable": 1,
   "name": "Produto 02 atualizado",
   "slug": "produto-02-atualizado",
   "stock": 10,
   "description": "Descrição produto 02 atualizada",
   "price": 250.00,
   "price_with_discount": 170.90,
   "Categoria": [1, 2],
   "Imagens": [
      {
         "id": 82,
         "path": "base64 da imagem 100"
      },
      {
         "id": 83,
         "path": "base64 da imagem 200"
      },
      {
         "id": 84,
         "path": "base64 da imagem 3000"
      }
   ],
   "Opicoes": [
      {
         "id": 43,
         "title": "Cor",
         "shape": "circle",
         "radius": 0,
         "type": "color",
         "values": "#000,#fff"
      },
      {
         "id": 43,
         "title": "Tamanho",
         "shape": "square",
         "radius": 4,
         "type": "text",
         "values": "G,GG"
      }
   ]
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
   "message": "Produto com id ${id} não encontrado."
 }
```
</details>


<details>
  <summary><strong> DELETE - Deletar um produto por ID </strong></summary><br>

* ![Static Badge](https://img.shields.io/badge/DELETE-dd2525)   /v1/product/:id

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
   "message": "Produto com id ${id} não encontrado."
 }
```
</details>


