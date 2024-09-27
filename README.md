# Corelab Code Challenge

Este repositório contém a solução do **Corelab Code Challenge**, composto por um backend em Java e um frontend em React, ambos **containerizados com Docker**. Este README vai descrever à você alguns detalhes do projeto, tais como estruturas do projeto, pré requisitos, descisões de tomadas, etc...

Com este projeto, é possível:
- Criar, ler, atualizar e deletar notas de tarefas de forma dinâmica e assíncrona.
- Utilizar um sistema de **Dark Mode** que permite ao usuário transitar entre temas claro e escuro, respeitando as configurações do sistema.

## Estrutura do Projeto

A arquitetura do projeto é dividida em duas pastas principais:
- 📁 **codeChallenge** - Projeto backend, desenvolvido com Java e Spring Boot.
- 📁 **corelab-frontend** - Projeto frontend, desenvolvido com React.

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas no seu sistema:
- 🐋 Docker
- ☕ Java 11 ou superior
- 🧱 Maven
- 🟢 Node: ^16.15.0
- 📦 NPM: ^8.5.5

## Decisões Tomadas

1. **Estrutura do Projeto:**
   - O backend foi desenvolvido em Java com Spring Boot, enquanto o frontend foi construído com React.
   - Docker foi utilizado para facilitar a execução local.

2. **Implementação do Backend:**
   - API REST com os seguintes endpoints:
     - 🟦 `GET api/toDos` - Lista todas as tarefas.
     - 🟩 `POST api/toDos` - Cria uma nova tarefa.
     - 🟧 `PUT api/toDos/{id}` - Atualiza uma tarefa existente.
     - 🟥 `DELETE api/toDos/{id}` - Remove uma tarefa.

3. **Implementação do Frontend:**
   - Desenvolvido com React e Bootstrap, consumindo a API Java e apresentando uma interface de lista de tarefas.

4. **Containerização:**
   - Ambos os projetos foram dockerizados usando Docker Compose para rodar a aplicação completa com o banco de dados PostgreSQL.

## Detalhes Técnicos

- **Linguagens e Ferramentas Utilizadas:**
  - Backend: ☕ Java 21, 🦸‍♂️ Spring Boot
  - Frontend: ⚛️ React, JavaScript, CSS, 🧩 Bootstrap
  - Banco de Dados: 🐘 PostgreSQL
  - Containerização: 🐳 Docker, 🐋 Docker Compose
  - Gerenciamento de dependências: 🧱 Maven

> [!IMPORTANT]
> # Implementação do Projeto
> - Acesse o README de cada pasta (codeChallenge, corelab-frontend) para acompanhar os detalhes importantes da implementação.
> - Não é necessário executar ambos os projetos. Ao seguir o passo a passo do README do codeChallenge, será possível acessar as rotas a partir do link-host do Docker.
