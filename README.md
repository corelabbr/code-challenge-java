# Como usar

## Backend

Foi utilizado o docker para usar a aplicação localmente. Comando para subir um container com o MySQL:

`docker-compose up`

Para executar os testes foi utilizado o banco em memória h2, então basta rodar o script.

## Frontend

Para instalar as dependências, deve-se usar o seguinte comando:

`yarn`

Para iniciar, deve-se usar o seguinte comando:

`yarn start`

Versão node:

`16.20.1`

Para facilitar o uso inicial da aplicação, foi criado uma classe que cria vários registros. Nessa criação será adicionado um usuário com todas as permissões, exceto a master. Segue login abaixo:

```markdown
username: alex
password: abc123
```

# Detalhes da implementação

- Adicionei um simples comportamento de autenticação e autorização onde cada funcionalidade tem a sua devida permissão;

- Cada usuário poderá apenas acessar as suas anotações (implementação pelo frontend, aqui poderia ter bloqueado no backend também);

- Foi criado uma outra tela para gerenciar as anotações/tarefas, inclusive filtrar pela data de criação;

- Apenas usuário com a permissão master pode editar os usuários, caso contrário só poderá editar o seu usuário.
