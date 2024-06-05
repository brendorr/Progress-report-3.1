
#  Documentação
# Primeiros passos
- Antes de acessar qualquer rota, voce precisa de um token. Para conseguir um é muito simples:
1. Acesse a rota http://localhost:3000/Cadastro com o seguinte corpo:
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
## Cidades

### Obter todas as cidades

- **URL**: `/api/cidades`
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

- **URL**: `/api/cidades`
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

- **URL**: `/api/cidades/nome/:nome`
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

- **URL**: `/api/cidades/estado/:estado`
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

- **URL**: `/api/clientes`
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

- **URL**: `/api/clientes`
- **Método**: `POST`
- **Descrição**: Cria um novo cliente.
- **Corpo da requisição**:
    ```json
    {
        "nomeCompleto": "string",
        "sexo": "string",
        "dataNascimento": "date",
        "idade": "number",
        "cidade": "string"  // Nome da cidade
    }
    ```

- **Resposta de sucesso**:
  - **Status**: `201 Created`
  - **Corpo**:
    ```json
    {
        "_id": "string",
        "nomeCompleto": "string",
        "sexo": "string",
        "dataNascimento": "date",
        "idade": "number",
        "cidade": "string" // id da cidade
    }
    ```

### Consultar cliente pelo nome

- **URL**: `/api/clientes/nome/:nome`
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
                "estado": "string"
            }
        }
    ]
    ```

### Consultar cliente pelo ID

- **URL**: `/api/clientes/:id`
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
            "estado": "string"
        }
    }
    ```

### Remover cliente

- **URL**: `/api/clientes/:id`
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

- **URL**: `/api/clientes/:id`
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
            "estado": "string"
        }
    }
    ```
