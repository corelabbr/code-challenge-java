# Corelab Code Challenge

Este repositório contém a solução do **Corelab Code Challenge**, composto por um backend em Java e um frontend em React, ambos **containerizados com Docker**. Este README vai te guiar pelos passos necessários para rodar a aplicação localmente, garantindo que você possa modificar e executar o projeto sem problemas.

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

> [!TIP]
> # Iniciando no projeto
> Primeiramente, em uma pasta qualquer no seu diretório (WIN + E), abra o prompt de comando (WIN + R e digit *cmd* na caixinha que abrir no canto inferior esquerdo da sua tela),
> após isso, digite *```git clone https://github.com/MathSzoke/code-challenge-java.git```* no CMD (janela preta)
>
> Em seguida, digite *```cd ./code-challenge-java```.
> Também, devemos garantir que você esteja no diretório correto, e vendo as pastas/arquivos corretos, execute: ```dir```
> 
> Você deverá ver os seguintes arquivos e pastas na coluna *Name* após o uso do *dir*:
> - 📁 codeChallenge
> - 📁 corelab-frontend
> - 📄 docker-compose.yaml
> - 📄 Leiame.rd
> - 📄 README.rd
>
> Caso esteja vendo exatamente isso, execute o comando ```docker-compose up```
>
> Esperando um minutinho, você poderá garantir que os containers do Docker estão funcionando quando não atualizar mais as mensagens do CMD (Prompt de comando), ou, acessando o hub do Docker Hub e visualizando se os containers estão com o status de "Running", ou "Rodando".
>
> Com isso, caso tudo esteja dentro dos conformes, será possível você acessar o link [localhost](http://localhost:3000)
> e assim, utilizar do projeto.


> [!IMPORTANT]
> # Manutenção do Projeto
> - Acesse o README de cada pasta (codeChallenge, corelab-frontend) para acompanhar os detalhes importantes da implementação.
> - Não é necessário executar ambos os projetos. Ao seguir o passo a passo do README do codeChallenge, será possível acessar as rotas a partir do link-host do Docker.
