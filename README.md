
#  Documentação
##
# Primeiros passos
## Mongodb
- Para o uso dessa api, voce precisa ter o MongoDB instalando no seu computador, assim como um servidor Mongo cujo a URI seja `mongodb://localhost:27017`. 
- Se preferir, voce pode acessar o arquivo `.env` do repositorio e trocar a URI padrão do projeto, substituindo `mongodb://localhost:27017` pela URI do seu banco de dados Mongo.
## Conseguindo um token
- Antes de acessar qualquer rota, voce precisa de um token. Para conseguir um é muito simples:
1. Acesse a rota http://localhost:3000/Cadastro utilizando o método POST com o seguinte corpo:
    ```json

        {
            "nome": "string",
            "senha": "string",
        }

    ```
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    
        {
            "token": "string",
        }
    
    ```
2. Uma vez com seu token, vá até a aba Headers.
3. Adicione um novo cabeçalho com a chave "token" e o valor do token JWT que você obteve.
 ![Falha ao carregar imagem](https://i.imgur.com/fXNGmHM.png)
4. Voce esta pronto para usar qualquer rota da API!

## Populando o banco de dados
- É possivel popular o banco de dados para tornar mais rapido os testes da api. Basta  usar o seguinte comando no terminal: 
  ```
   node populando.js
  ```
 - Lembre-se que o terminal deve estar na pasta raiz do projeto node.
- `Cuidado! Usar esse script apagará todos os dados contidos no DB.`

## Cidades

### Obter todas as cidades

- **URL**: `http://localhost:3000/cidades`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todas as cidades.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    [
        {
            "_id": "string",
            "nome": "string",
            "estado": "string"
        }
    ]
    ```

### Criar uma nova cidade

- **URL**: `http://localhost:3000/cidades`
- **Método**: `POST`
- **Descrição**: Cria uma nova cidade.
- **Corpo da requisição**:
    ```json
    {
        "nome": "string",
        "estado": "string"
    }
    ```

- **Resposta de sucesso**:
  - **Status**: `201 Created`
  - **Corpo**:
    ```json
    {
        "_id": "string",
        "nome": "string",
        "estado": "string"
    }
    ```

### Consultar cidade pelo nome

- **URL**: `http://localhost:3000/cidades/nome/:nome`
- **Método**: `GET`
- **Descrição**: Retorna as cidades que correspondem ao nome fornecido.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    {
        "_id": "string",
        "nome": "string",
        "estado": "string"
    }
    ```

### Consultar cidade pelo estado

- **URL**: `http://localhost:3000/cidades/estado/:estado`
- **Método**: `GET`
- **Descrição**: Retorna as cidades que correspondem ao estado fornecido.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    [
        {
            "_id": "string",
            "nome": "string",
            "estado": "string"
        }
    ]
    ```

## Clientes

### Obter todos os clientes

- **URL**: `http://localhost:3000/clientes`
- **Método**: `GET`
- **Descrição**: Retorna uma lista de todos os clientes.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    [
        {
            "_id": "string",
            "nomeCompleto": "string",
            "sexo": "string",
            "dataNascimento": "date",
            "idade": "number",
            "cidade": {
                "_id": "string",
                "nome": "string",
                "estado": "string"
            }
        }
    ]
    ```

### Criar um novo cliente

- **URL**: `http://localhost:3000/clientes`
- **Método**: `POST`
- **Descrição**: Cria um novo cliente.
- **Corpo da requisição**:
    ```json
    {
        "nomeCompleto": "string",
        "sexo": "string",
        "dataNascimento": "date",
        "idade": "number",
        "cidadeNome": "string"  // Nome da cidade
    }
    ```

- **Resposta de sucesso**:
  - **Status**: `201 Created`
  - **Corpo**:
    ```json
    {
        "nomeCompleto": "string",
        "sexo": "string",
        "dataNascimento": "date",
        "idade": "number",
        "cidade": "string", // id da cidade
        "_id": "string",
    }
    ```

### Consultar cliente pelo nome

- **URL**: `http://localhost:3000/clientes/nome/:nome`
- **Método**: `GET`
- **Descrição**: Retorna os clientes que correspondem ao nome fornecido.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    [
        {
            "_id": "string",
            "nomeCompleto": "string",
            "sexo": "string",
            "dataNascimento": "date",
            "idade": "number",
            "cidade": {
                "_id": "string",
                "nome": "string",
                "estado": "string",
                "__v": "number"
            }
        }
    ]
    ```

### Consultar cliente pelo ID

- **URL**: `http://localhost:3000/clientes/:id`
- **Método**: `GET`
- **Descrição**: Retorna o cliente que corresponde ao ID fornecido.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    {
        "_id": "string",
        "nomeCompleto": "string",
        "sexo": "string",
        "dataNascimento": "date",
        "idade": "number",
        "cidade": {
            "_id": "string",
            "nome": "string",
            "estado": "string",
            "__v": "number"
        }
    }
    ```

### Remover cliente

- **URL**: `http://localhost:3000/clientes/:id`
- **Método**: `DELETE`
- **Descrição**: Remove o cliente que corresponde ao ID fornecido.
- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    {
        "message": "Cliente removido com sucesso"
    }
    ```

### Alterar o nome do cliente

- **URL**: `http://localhost:3000/clientes/:id`
- **Método**: `PUT`
- **Descrição**: Altera o nome do cliente que corresponde ao ID fornecido.
- **Corpo da requisição**:
    ```json
    {
        "nomeCompleto": "string"
    }
    ```

- **Resposta de sucesso**:
  - **Status**: `200 OK`
  - **Corpo**:
    ```json
    {
        "_id": "string",
        "nomeCompleto": "string",
        "sexo": "string",
        "dataNascimento": "date",
        "idade": "number",
        "cidade": {
            "_id": "string",
            "nome": "string",
            "estado": "string",
            "__v": "number"
        }
    }
    ```
