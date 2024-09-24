# Todo App

Um aplicativo web de gerenciamento de tarefas, projetado para oferecer uma experiência intuitiva e eficiente na organização do dia a dia. A aplicação utiliza React no frontend, proporcionando uma interface dinâmica e responsiva, enquanto o Java Spring Boot no backend garante um desempenho robusto e escalável. O sistema permite aos usuários criar, ler, atualizar e excluir tarefas de forma simples, com a possibilidade de marcar itens como favoritos e atribuir cores a cada tarefa, facilitando a categorização e priorização.

## Funcionalidades

- Criar, ler, atualizar e excluir itens de tarefas.
- Marcar itens como favoritos.
- Atribuir cores a cada item de tarefa.
- Filtrar tarefas por favoritos e cores.
- Interface responsiva para desktop e dispositivos móveis.
- Teste unitário para o hook customizado
- Definição de interfaces e types no backend e frontend

## Tecnologias Utilizadas

- **Frontend:** React, Typescript, Sass, Axios
- **Backend:** Java Spring Boot, MySQL
- **Docker:** Contêineres para o backend, frontend e banco de dados


## Estrutura do Projeto

    /project-root
    │
    ├── /backend       # Código do backend (Java Spring Boot)
    │   ├── Dockerfile
    │   ├── pom.xml
    │   └── /src       # Código-fonte do backend
    │       ├── /main  # Código principal
    │       │   ├── /java  # Código Java
    │       │   └── /resources  # Recursos como templates e arquivos de configuração
    │       └── /test  # Testes
    │
    ├── /frontend      # Código do frontend (React)
    │   ├── Dockerfile
    │   ├── package.json
    │   ├── /public    # Arquivos públicos
    │   └── /src       # Código-fonte do frontend
    │       ├── /components  # Componentes React
    │       ├── /hooks       # Hooks customizados (Testes _unitários_para cada hook dentro dessa pasta)
    │       ├── /services    # Serviço que realiza conexão com api externa
    │       └── /styles      # Estilos (Sass)
    │       └── App.tsx      # Pagina principal
    │
    └── docker-compose.yml  # Arquivo de configuração do Docker Compose



 ## Configuração do Ambiente
 ### Pré-requisitos

- Docker e Docker Compose instalados
 ### Instruções de Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/santowilll/code-challenge-java.git
   cd code-challenge-java
2.  Navegue até o diretório do backend:
	 ```bash
	cd backend/
3. Compile o projeto com o Maven: Execute o seguinte comando para compilar e empacotar seu aplicativo:
	 ```bash
	mvn clean package
4. Verifique se o arquivo `.jar` foi gerado: Certifique-se de que o arquivo `.jar` está na pasta `target`:
	```bash
	ls target/
5. Execute o Docker Compose: Agora que o arquivo `.jar` foi gerado, você pode navegar até o diretório raiz do seu projeto (onde está o arquivo `docker-compose.yml`) e executar o Docker Compose:
    ```bash
    cd ../
    docker-compose up --build 
6.  Acesse o aplicativo:
    
    -   Frontend: http://localhost:3000
    -   Backend: http://localhost:8080

### Testando o Backend com Thunder Client (Opcional)

Para facilitar os testes da API, adicionei uma coleção do Thunder Client ao projeto. Essa coleção contém todas as rotas da API, permitindo que você teste facilmente as funcionalidades do backend sem a necessidade de criar chamadas de API manualmente.

#### Como Usar

1. **Instale o Thunder Client:** Caso ainda não tenha, instale a extensão Thunder Client na sua IDE (por exemplo, Visual Studio Code).
2. **Importe a Coleção:** 
   - Abra o Thunder Client.
   - Clique em "Import" e selecione a coleção do Thunder Client fornecida no projeto (arquivo `thunder-collection_code-challenge-java.json`).
3. **Execute os Testes:** 
   - Selecione as requisições desejadas na coleção e execute-as para verificar a funcionalidade da API.

A coleção foi projetada para cobrir todas as operações CRUD e outras funcionalidades.

## Estrutura do Docker

### Dockerfile - Backend


    FROM openjdk:17-jdk-slim 
    VOLUME /tmp
    COPY target/*.jar app.jar
    
    ENTRYPOINT ["java", "-jar", "/app.jar"]
    EXPOSE 8080

### Dockerfile - Frontend

    
    FROM node:16 AS build 
    WORKDIR /app
    COPY package.json ./
    COPY package-lock.json ./
    RUN npm install --legacy-peer-deps
    COPY . .
    RUN npm run build
    
    FROM nginx:alpine
    COPY --from=build /app/build /usr/share/nginx/html
    EXPOSE 80

### docker-compose.yml

    services:
      backend:
        build:
          context: ./backend
          dockerfile: Dockerfile
        container_name: backend
        ports:
          - "8080:8080"
        environment:
          - SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/todo_app?useSSL=false&serverTimezone=UTC
          - SPRING_DATASOURCE_USERNAME=root
          - SPRING_DATASOURCE_PASSWORD=12345678
        depends_on:
          - db
      
      db:
        image: mysql:5.7
        restart: always
        environment:
          MYSQL_ROOT_PASSWORD: 12345678
          MYSQL_DATABASE: todo_app
          MYSQL_USER: root
          MYSQL_PASSWORD: 12345678
        ports:
          - "3306:3306"
        
      frontend:
        build:
          context: ./frontend
          dockerfile: Dockerfile
        container_name: frontend
        ports:
          - "3000:80"
