# Corelab Code Challenge
Este repositório contém a solução do Corelab Code Challenge, composto por um backend em Java e um frontend em React, ambos containerizados com Docker.
Este README vai te guiar por todos os passos necessários para rodar a aplicação localmente e garantir que você possa modificar e executar o projeto sem problemas.

Com este projeto é possível criar, ler/visualizar, atualizar e deletar notas de tarefas em sua tela de forma dinâmica e assíncrona.

Neste sentido, segui desenvolvendo features para deixar uma aplicação web consistente, responsivel e com uma interface amigável e atraente. Uma das features desenvolvidas, seria o sistema Dark Mode.
Para que o usuário possa acessar a página sem problemas de caridade ou seguir com suas necessidades do sistema, podemos transicionar o tema da página tanto para o tema claro para o tema escuro, ou, simplesmente não precisamos mudar, pois inicialmente irá puxar as 
configurações do seu sistema.

# Estrutura do Projeto
A arquitetura do projeto é dividida em duas pastas principais:

- codeChallenge - Este é o projeto backend, desenvolvido com Java e Spring Boot.
- corelab-frontend - Este é o projeto frontend, desenvolvido com React.

# Pré-requisitos
Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas no seu sistema:

- Docker
- Java 11 ou superior
- Maven
- Node: ^16.15.0
- NPM: ^8.5.5

## Decisões Tomadas

1. **Estrutura do Projeto:**
   - O backend foi desenvolvido em Java com Spring Boot e o frontend foi construído com React.
   - Docker foi utilizado para containerizar ambos os projetos, facilitando a execução local.

2. **Implementação do Backend:**
   - Foi implementada uma API REST com os seguintes endpoints:
     - `GET api/toDos` - Lista todas as tarefas.
     - `POST api/toDos` - Cria uma nova tarefa.
     - `PUT api/toDos/{id}` - Atualiza uma tarefa existente.
     - `DELETE api/toDos/{id}` - Remove uma tarefa.

3. **Implementação do Frontend:**
   - O frontend foi desenvolvido com React e Bootstrap para estilização.
   - A aplicação consome a API Java e apresenta uma interface de lista de tarefas.

4. **Containerização:**
   - Ambos os projetos foram dockerizados utilizando Docker Compose para rodar a aplicação completa com o banco de dados PostgreSQL.

## Detalhes Técnicos

- **Linguagens e Ferramentas Utilizadas:**
  - Backend: Java 21, Spring Boot
  - Frontend: React, JavaScript, CSS, Bootstrap
  - Banco de Dados: PostgreSQL
  - Containerização: Docker, Docker Compose
  - Gerenciamento de dependências: Maven para o backend

> [!IMPORTANT]
> # Implementação do projeto
> - Acesse o README de cada pasta (codeChallenges, corelab-frontend), para que você possa acompanhar os detalhes importantes para a implementação de cada projeto.
>
> - Não é necessário executar rodar ambos os projetos, ao seguir com o passo a passo do README do codeChallenges, será possível acessar as rotas a partir do link-host do Docker.
