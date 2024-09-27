## Comandos disponíveis

No diretório do projeto, você poderá rodar:

### `npm start`

Ao rodar este comando no seu prompt de comando, irá rodar o projeto frontend. Você poderá vê-lo no link: [http://localhost:3000](http://localhost:3000)

### `npm test`

Roda 13 testes de cada componente, garantindo assim que os componentes funcionem devidamente como planejado.
Os testes serão realizados utilizando da biblioteca Jest, o que facilita bastante na arquitetura dos testes.

### `npx eslint src/ --fix`

Este comando utiliza a biblioteca ESLint para analisar o código no diretório src/ e aplicar correções automáticas onde possível, ajudando a garantir que o código siga padrões de boa qualidade e estilo.
Caso não retorne nada após o uso do comando, significa que o seu código segue com os padrões!

### `npm run generate:component NameComponent`

Este comando é um gerador de componentes customizados, na qual eu decidi usar em TODOS os projetos em React/Angular na qual eu atuo... 
A finalidade dele é acelerar a criação de novos componentes e evitar o custoso trabalho de acessar a pasta de componentes, criar a pasta do componente e depois criar os componentes em questão.
Substitua o "NameComponent" para o nome do componente que você deseja!
Após rodar o comando e aparecer uma mensagem de sucesso em seu CMD, irá gerar um componente na pasta de "components", e também, irá salvar o componente criado em um arquivo chamado "history.txt".

### `npm run undo:component`

Este comando realiza a remoção do ultimo componente criado em ordem de criação. Isso significa que se você criar primeiro o componente X e depois o Y, após executar o comando do Undo, irá remover o componente Y, e se você rodar novamente o comando, irá remover o componente X.

### `npm run delete:component NameComponent`

Este comando deleta um componente especificado pelo nome. Ao executar o comando, o script irá realizar a busca do componente em questão e deletá-lo.