#  Node API

Esta é uma API desenvolvida em Node.js, implementando autenticação JWT e endpoints para gerenciamento de peças (Peca) e componentes (Componente). O projeto utiliza SQLite como banco de dados, Sequelize como ORM, e inclui rate limiting para proteger a aplicação.

## Tecnologias utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para criação de APIs.
- **Sequelize**: ORM para Node.js que facilita a interação com bancos de dados SQL.
- **SQLite**: Banco de dados leve e embutido.
- **jsonwebtoken**: Biblioteca para criação e verificação de tokens JWT.
- **uuid**: Biblioteca para geração de UUIDs (utilizada para gerar SKUs).
- **express-rate-limit**: Middleware para limitar a quantidade de requisições e proteger a API contra abusos.

## Como rodar

- **Clonar o repositório**: git clone https://github.com/grilodev/API-NodeJs.git
- **Instalar as dependências**: npm install
- **Inicie o servidor**: node server.js
- **Testar os endpoints**: Para realizar as requisições será necessário solicitar o token no endpoint abaixo:

Endpoint POST: http://localhost:3000/api/v1/login

json body:
{
  "username": "admin",
  "password": "admin123"
}

Demais endpoints estão no arquivo "postman.json", que poderá ser adicionado como coleção no Postman.