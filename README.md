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

Antes de ralizar o CRUD completo de todas as rotas, é preciso cadastrar um usuário e fazer login através da rota "/login" para gerar um token e, com esse token, ter acesso a toda api. Então bora fazer isso!

<details>
  <summary><strong> CADASTRO de Usuário </strong></summary><br>
 
 - ![Static Badge](https://img.shields.io/badge/POST-3bd339) /v1/user

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
 
 - ![Static Badge](https://img.shields.io/badge/POST-3bd339) /login

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

## CRUD de Usuários

<details>
  <summary><strong>Requisito 01 - Criar a tabela de usuários</strong></summary><br>

O objetivo deste requisito é criar a tabela de usuários no banco de dados utilizando o Sequelize ORM. A tabela deve conter as colunas a seguir:

- **id**: Coluna do tipo INTEGER que representa a chave primária da tabela. Seu valor deve ser incrementado automaticamente pelo banco de dados
- **firstname**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o primeiro nome do usuário
- **surname**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o sobrenome do usuário.
- **email**: Coluna do tipo STRING e de preenchimento obrigatório que armazena o endereço de email do usuário
- **password**: Coluna do tipo STRING e de preenchimento obrigatório que armazena a senha do usuário. O valor a ser armazenado deve ser o hash da senha gerado pelo pacote bcrypt.

> Use a configuração `timestamps: true` do sequelize para gerar as colunas **created_at** e **updated_at**

</details>







