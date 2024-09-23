# Na pasta codeChallenge

Caso decida mudar algo no código, tenha certeza de sempre implementar novas mudanças para o docker, assim, atualizando-o. Para que isso ocorra, lembre-se de rodar o seguinte comando no seu CMD:

### `mvn clean package`

Ao rodar este comando, o Maven irá gerar um novo pacote do seu projeto, rodando todos os devidos testes para garantir que não haja erros!

Após isso, lembre-se também de implementar suas mudanças no Docker. Recomendo que sempre que realizar novas mudanças, derrube o atual host da sua aplicação e gere novamente os containers.
Para isso, segue o comando para realizar esta ação:

## É imprencidivel que você acesse a pasta do docker-compose: `cd ./corelab-challenge` antes de realizar as ações do docker-compose.

### `docker-compose down`

Em seguida, caso seja um sucesso a queda dos containers, suba novamente com as alterações realizadas.

### `$env:DOCKER_BUILDKIT=0; docker-compose up --build`

`$env:DOCKER_BUILDKIT=0`: desativa o BuildKit, o que pode resultar em uma construção mais lenta, mas com melhor compatibilidade para projetos mais antigos.

`docker-compose up --build`: O comando --build força a reconstrução das imagens antes de iniciar os containers, garantindo que a versão mais recente do seu projeto, compilada pelo Maven com mvn clean package, seja utilizada.

Depois de rodar o docker-compose up, irá gerar containers do app em geral, tanto para o banco de dados, para a API e para o frontend.

Lembrando, é imprencidivel também que o projeto frontend esteja ao lado do projeto backend. Isso significa que deve estar mais ou menos assim a arquitetura na sua pasta:

- codeChallenge (aqui é o projeto Java)
- corelab-frontend (aqui é o projeto React)


# Enquanto roda

Podemos analisar o Docker hub ou no prompt de comando, executar o seguinte `docker ps`, com isso podemos analisar os containers criados.

A ordem será a seguinte, primeiramente o docker-compose irá criar o container pai, chamado "corelab-challenge", e em seguida irá criar os containers filhos:

- "react_dev-1"
- "postgres_dev-1"
- "java_dev-1"

A API Java irá rodar na porta 8080, o frontend irá rodar na porta padrão também "3000" e o banco de dados também irá rodar na porta padrão, "5432/5433". Repare que o banco de dados tem 2 portas, isso acontece para caso você esteja utilizando o PostgreSQL em sua máquina e o serviço do mesmo estiver ocupando a porta padrão 5432.

## Quanto tempo levei para desenvolver o projeto?

O projeto levou cerca de 2 dias "trabalhados (8 horas por dia)", e pode ser que tenha levado mais tempo, porém, isso aconteceu pois levei em consideração os testes unitários/integrados, o que eu confesso que levei um pouco mais de tempo para realizar principalmente os testes do frontend...

