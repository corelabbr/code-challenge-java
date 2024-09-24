
# Pull Request: To Do APP 

  

## Descrição do Projeto

  

Este pull request implementa um aplicativo web para gerenciamento de tarefas, desenvolvido com React para o frontend e Java Spring Boot para o backend. O objetivo é fornecer uma interface intuitiva e funcional para a criação, leitura, atualização e exclusão de tarefas.

  

## Funcionalidades

  

-  **CRUD de Tarefas:** Permite criar, ler, atualizar e excluir itens de tarefas.

-  **Marcação de Favoritos:** Os usuários podem marcar itens como favoritos para fácil acesso.

-  **Cores para Tarefas:** Cada item de tarefa pode ser atribuído a uma cor específica, facilitando a organização visual.

-  **Filtragem de Tarefas:** Opções para filtrar tarefas com base em favoritos, cores e título.

-  **Interface Responsiva:** A aplicação é totalmente responsiva, adaptando-se a desktops e dispositivos móveis.

-  **Testes Unitários:** Inclusão de testes unitários para hooks  customizados utilizados na aplicação.

-  **Definição de Interfaces e Types:** Uso de interfaces e tipos no backend (Java) e frontend (TypeScript) para garantir a consistência e segurança do código.

  

## Tecnologias Utilizadas

  

-  **Frontend:** React, Typescript, Sass, Axios

-  **Backend:** Java Spring Boot, MySQL

-  **Docker:** Utilização de contêineres para o backend, frontend e banco de dados.

  

## Decisões Tomadas

  

### **Escolha do Stack**

A escolha de **React** e **Java Spring Boot** foi motivada pela sua popularidade e robustez na comunidade de desenvolvimento. A arquitetura baseada em componentes do React permite uma experiência de usuário altamente interativa, enquanto o Spring Boot fornece uma base sólida para construir serviços de backend escaláveis e manuteníveis. Juntas, essas tecnologias facilitam uma clara separação de preocupações, tornando a arquitetura da aplicação mais organizada e adaptável a futuras mudanças.

### **Gerenciamento de Estado**

Para gerenciar o estado das tarefas, criei um **hook personalizado** que encapsula a lógica de gerenciamento dos todos. Essa abordagem não apenas garante uma melhor **testabilidade**, permitindo que os testes sejam realizados de forma isolada, mas também abstrai a camada visual da lógica, tornando o código mais modular e reutilizável. O uso de hooks do React, como `useState` e `useEffect`, combinado com este hook personalizado, proporciona uma solução moderna e eficaz para a manipulação de dados. Essa abordagem simplifica o código, melhora o desempenho ao minimizar re-renderizações desnecessárias e facilita a manutenção e a escalabilidade da aplicação.

###  **Persistência de Dados:** 
O MySQL foi escolhido como sistema de banco de dados pela sua confiabilidade e fácil integração com o Spring Boot.

### **Containerização**

A implementação do **Docker** garante que os ambientes de desenvolvimento e produção sejam consistentes. Essa containerização simplifica o processo de configuração, permitindo que os desenvolvedores se concentrem na construção de funcionalidades sem se preocupar com discrepâncias de ambiente.

### **Estilização e Consistência da UI**

Para criar uma interface de usuário que se aproxime do mockup fornecido, utilizei **SCSS**. Esse pré-processador permite o uso de variáveis, regras aninhadas e mixins, o que aumenta a manutenibilidade e escalabilidade da estilização. O SCSS possibilita a criação de uma folha de estilos modular, garantindo que os estilos sejam consistentes em toda a aplicação e facilmente gerenciáveis.

###  **Teste Unitário: `useTodos`**

Neste teste unitário, utilizei a biblioteca **React Testing Library** junto com **Jest** para garantir que o hook `useTodos` funcione corretamente. O teste verifica as operações de busca, adição, exclusão e atualização de tarefas.

##### **Configurações**

-   **`renderHook`**: Para renderizar o hook em um ambiente de teste, permitindo acessar seu estado e métodos.
-   **`act`**: Envolvendo operações que alteram o estado, garantindo que as atualizações ocorram de forma previsível.
-   **Mock do `todoService`**: Isola o hook das dependências externas, permitindo testar apenas a lógica do hook.

##### **Testes Implementados**

1.  **Busca de Tarefas**: Verifica se as tarefas são recuperadas corretamente ao montar o hook.
2.  **Adição de Tarefa**: Testa se uma nova tarefa é adicionada corretamente ao estado.
3.  **Exclusão de Tarefa**: Confirma se uma tarefa pode ser removida e que o estado é atualizado adequadamente.
4.  **Atualização de Tarefa**: Garante que as modificações em uma tarefa existente sejam refletidas no estado.

###  **Criação e Uso do `todoService` na Aplicação**

O `todoService` é uma camada de abstração que encapsula as operações de comunicação com a API para gerenciar tarefas (todos). Esta abordagem é fundamental para manter a aplicação organizada e facilitar a manutenção.

##### **Criação do `todoService`**

-   **Estrutura**: O serviço é implementado como um módulo que exporta funções para as operações CRUD (Criar, Ler, Atualizar e Deletar) das tarefas.
-   **Axios**: Utiliza a biblioteca `axios` para realizar as requisições HTTP, permitindo interagir com a API de forma simples e intuitiva.

    

##### **Uso do `todoService` na Aplicação**

-   **Integração com Hooks**: No hook personalizado `useTodos`, o `todoService` é utilizado para gerenciar o estado das tarefas. As funções do serviço são chamadas nas operações de busca, adição, exclusão e atualização de tarefas.
-   **Gerenciamento de Estado**: Ao utilizar o `todoService`, a lógica de estado fica isolada em um único lugar, o que facilita a manutenção e a testabilidade da aplicação.
-   **Resiliência**: O `todoService` lida com possíveis erros nas requisições, permitindo que a aplicação responda de forma adequada a falhas na comunicação com a API.




### **Explicação dos Filtros Aplicados**

Neste pull request, foram implementados filtros para a lista de _todos_ de forma otimizada, utilizando o `useMemo` para melhorar o desempenho e evitar cálculos desnecessários. Abaixo estão os detalhes dos filtros aplicados:

1.  **Filtragem de Todos os Itens**:
    
    -   A lista principal de _todos_ foi filtrada com base no valor de pesquisa fornecido e na cor selecionada, caso aplicável.
    -   Para cada _todo_, verificamos se o título contém o valor de pesquisa (ignorando maiúsculas e minúsculas) e se corresponde à cor selecionada, se uma cor foi especificada. Caso nenhuma cor tenha sido selecionada, todos os _todos_ que atendam ao critério de pesquisa são incluídos.
2.  **Filtragem de Itens Favoritos**:
    
    -   A partir da lista de _todos_ previamente filtrada, criamos uma lista que contém apenas os itens marcados como favoritos.
    -   Este filtro é aplicado para facilitar a visualização e o acesso rápido aos itens que foram marcados como favoritos pelo usuário.
3.  **Filtragem de Itens Não Favoritos**:
    
    -   Da mesma forma, criamos uma lista que contém apenas os itens que não foram marcados como favoritos.
    -   Isso permite separar os _todos_ em duas categorias distintas, favorecendo a organização e o gerenciamento dos itens.

Esses filtros foram implementados utilizando `useMemo` para evitar recalcular os resultados sempre que a lista original de _todos_ ou os critérios de filtragem (valor de pesquisa ou cor selecionada) não sofrerem alterações, o que melhora significativamente a performance da aplicação.
  

## Conclusão

  

Este PR inclui todas as funcionalidades planejadas e seguiu as melhores práticas de desenvolvimento. Estou ansioso para receber seu feedback e sugestões para melhorias.