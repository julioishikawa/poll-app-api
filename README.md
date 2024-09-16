# Poll-app-api

É um servidor feito para armazenar notas e enquetes, o schema/migrations do banco de dados foi feito com Prisma, o armazenamento é pelo PostgreSQL e os resultados dos votos ficam armazenados no Redis. Tudo em isso em conjunto forma uma aplicação totalmente funcional com funcionalidades incríveis, confira [aqui](https://github.com/julioishikawa/poll-app).

## Tecnologias(libs) usadas ⚡️

- Nodejs
- Fastify
- TypeScript
- Prisma
- Docker
- PostgreSQL
- ioredis
- zod
- dotenv

A aplicação não está online para testes, então para fazer os testes você vai precisar instalar localmente no seu computador.

## Instalação 💡

Crie uma pasta para clonar o projeto e siga os seguintes passos.

Dentro da pasta que você criou, você vai abrir o seu prompt de comando e escolher qual método de clonagem que você irá utilizar:

```
// Método HTTPS

$ git clone https://github.com/julioishikawa/poll-app-api.git
$ npm install
$ npm run dev

ou

// Método SSH

$ git clone git@github.com:julioishikawa/poll-app-api.git
$ npm install
$ npm run dev
```

## IMPORTANTE

Eu deixei os valores no arquivo '.env.example' propositalmente para que você consiga configurar e utilizar a aplicação localmente, basta você criar um arquivo '.env', copiar e colar o que está dentro do arquivo '.env.example' e iniciar com o comando 'npm run dev' após a inicialização o servidor irá rodar.

Para fazer os testes da aplicação no seu computador você vai precisar baixar a [Aplicação](https://github.com/julioishikawa/poll-app) do poll-app-api.

## Observações

Estou hospedando os servidores do Postgres/Redis utilizando um plano gratuito então pode ter alguns 'bugs' de funcionalidades. Vou utilizar como exemplo a criação de notas/enquetes, apesar de eu colocar um timeout de 1s para chamar a nova nota/enquete que o usuário criou, o servidor pode acabar tendo um pico de lag e não vai aparecer a nota/enquete que o usuário criou, então nesse caso o usuário vai precisar dar um F5(Atualizar a página) para que a sua nota/enquete apareça. Lembrando que isso é totalmente culpa do servidor gratuito e não da aplicação.

Feito por [Julio Ishikawa](https://www.linkedin.com/in/julio-ishikawa) 👋.
