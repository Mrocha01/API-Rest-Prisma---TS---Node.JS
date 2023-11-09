API Rest com Node, Typescript e PrismaJs simulando uma interação usuario -> postagem(twitter) bem simplificada

**_Para testar a API_**:

**_A porta 8000 foi uma escolha pessoal, altere como bem entender no arquivo server.ts_**

Antes de tudo, necessario criar localmente um arquivo .env contendo a seguinte variavel:

DATABASE_URL="dialect://username:password@host:port/database"

Subistitua o conteúdo da variavel com os dados referentes ao seu banco de dados para
teste, exemplo:

DATABASE_URL="postgresql://user:pass@localhost:5432/mydatabase"

Use o comando "npm run dev" para ativar o script do projeto e acionar o ts-node-dev.

As rotas para teste são as seguintes:

**Usuario**:

POST - http://localhost:8000/users/create
GET - http://localhost:8000/users/find/{:id} - (deletar o conteudo das {} pelo id desejado)
GET - http://localhost:8000/users/find/{:email} - (deletar o conteudo das {} pelo email desejado)
PATCH - http://localhost:8000/users/update

Para criar um primeiro usuario:

{
"name":"Jane Doe"
"email":"foo@example.com"
}

Para a update, está permitido somente a alteração do "name" e o "id" deve ser passado no body:

Exemplo:

{
"id":"1",
"name":"Jane Doe"
}

**Posts**:

POST - http://localhost:8000/posts/create
GET - http://localhost:8000/posts/all
DELETE - http://localhost:8000/posts/remove/{:id} - (deletar o conteudo das {} pelo id desejado)

Para criar um primeiro post:

{
"title": "Primeiro post",
"content": "Testando Sintaxe",
"authorId": "1"
}
