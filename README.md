# en-dictionary-api

A **en-dictionary-api** é uma API simples desenvolvida para fornecer detalhes sobre palavras em inglês. A API permite consultar palavras e suas respectivas definições, o que pode ser útil para diversos tipos de aplicação, como dicionários, tradutores ou sistemas de aprendizado de idiomas.

## 🌐 Link para Produção

A aplicação está disponível em produção no seguinte link: [en-dictionary-api](https://en-dictionary-api.onrender.com)

## 📚 Documentação/Swagger

A documentação da API criada com Swagger encontra-se no link: [swagger](https://en-dictionary-api.onrender.com/api)

## 🚀 Tecnologias Utilizadas

- **Linguagem**: TypeScript
- **Framework**: NestJS
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **Gerenciador de Pacotes**: Yarn
- **Docker**: Para containerização e ambiente isolado
- **Cache**: Redis
- **Autenticação**: JWT (JSON Web Tokens)
- **Testes**: Jest

## 📦 Instalação e Uso

### Passo 1: Clonar o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/en-dictionary-api.git
cd en-dictionary-api
```

### Passo 2: Instalar as Dependências

Instale as dependências do projeto utilizando o Yarn:

```bash
yarn install
```

### Passo 3: Subir o Docker

Este projeto usa Docker para facilitar a configuração e execução da aplicação e do banco de dados. Execute o seguinte comando para iniciar os containers:

```bash
docker-compose up -d
```

Este comando irá subir o serviço da API e o banco de dados PostgreSQL em containers Docker.

### Passo 4: Popular o Banco de Dados

Após iniciar o Docker, é necessário popular o banco de dados com palavras em inglês. Para isso, execute o comando abaixo para rodar um seed no banco a partir do container do banco de dados:

```bash
docker exec -it <container_da_api> yarn run seed
```

Substitua `<container_da_api>` pelo nome do container da aplicação (api) que está rodando (você pode obtê-lo com o comando `docker ps`).

A API estará disponível na porta **3000** por padrão.

### Passo 6: Acessando a API

- **URL de Acesso**: `http://localhost:3000`
- **Endpoint Principal**: `/words` — Para consultar palavras em inglês e seus detalhes.

Exemplo de consulta para obter informações de uma palavra:

```bash
GET http://localhost:3000/words/hello
```

## 🧪 Rodando os Testes

Este projeto utiliza o Jest para realizar os testes unitários e de integração. Você pode executar os testes de diferentes formas, dependendo da necessidade. Abaixo estão os comandos disponíveis:

- **Rodar os testes unitários**:

  ```bash
  yarn test
  ```

- **Rodar os testes com modo de observação**:

  ```bash
  yarn test:watch
  ```

- **Rodar os testes com cobertura de código**:

  ```bash
  yarn test:cov
  ```

- **Rodar os testes no modo de depuração**:

  ```bash
  yarn test:debug
  ```

- **Rodar os testes end-to-end**:
  ```bash
  yarn test:e2e
  ```

Certifique-se de ter as dependências necessárias instaladas e o ambiente configurado corretamente antes de rodar os testes.

## 🔧 Pendências

Ainda restam algumas pendências de desenvolvimento para este projeto, que estão listadas abaixo.

- [x] Finalizar a documentação utilizando o swagger.
- [x] Adicionar uma documentação técnica ADR.
- [ ] Adicionar os headers para identificar a presença do cache nas requisições
- [ ] Controlador de versionamento e CHANGELOG.
