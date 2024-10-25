# CoreNotes 🚀

## Sobre 📚
Bem-vindo ao **CoreNotes**! Este projeto é um aplicativo de gerenciamento de tarefas que permite aos usuários criar, ler, atualizar e excluir notas. Cada nota pode ser marcada como favorita e atribuída a uma cor. O frontend é desenvolvido em React, enquanto o backend é construído com Java Spring Boot. O projeto é totalmente responsivo e oferece uma interface amigável para gerenciar as notas.

## Funcionalidades 📂
* Criar, ler, atualizar e excluir notas.
* Marcar notas como favoritas.
* Atribuir uma cor a cada nota.
* Filtrar notas por favoritas e pesquisa.
* Listar notas favoritas no topo.

## Tecnologias ⚙️

-   **Frontend**: React
-   **Backend**: Java Spring Boot
-   **Banco de Dados**: H2
-   **Testes**: JUnit e Mockito
-   **Docker**: Para containerização do aplicativo
-   **Docker Compose**: Para gerenciar múltiplos contêineres

## Configurações e Pré-requisitos 🔧

-   **Java 17 ou superior**: Certifique-se de ter o JDK instalado.
-   **Maven**: Para gerenciar dependências do projeto.
-   **Node.js e npm**: Para o desenvolvimento e execução do frontend.
-   **Docker e Docker Compose**: Para executar o projeto em contêineres.

### Para configuração com docker 🐋
Assegure-se que a engine do docker está ativa na sua máquina e rode o comando: 
```bash
docker-compose up --build
```

### Para configuração sem docker 📌
1- Clone o Repositório
```bash
git clone <URL_DO_REPOSITORIO_BACKEND>
```
2- Navegue até a pasta do backend
```bash
cd <DIRETORIO_DO_BACKEND>
```
3- Instale as dependências do backend
```bash
mvn clean install
```
4- Execute o backend
```bash
mvn spring-boot:run
```
5- Navegue até a pasta do frontend e instale as dependências
```bash
cd ../frontend
npm install
```
6- Execute o frontend
```bash
npm start
```

## Acessando o Aplicativo 💻

Após a execução do backend e do frontend, você pode acessar a aplicação através do navegador em:

-   **Frontend**: `http://localhost:5173` (ou a porta que o React estiver utilizando)
-   **Backend**: `http://localhost:8080/api/notes`

## Executando Testes 📈

Para executar os testes do backend:
```bash
mvn test
```