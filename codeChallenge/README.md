# Rodando o Projeto com Docker
Para rodar a aplicação com Docker, siga as instruções abaixo.

## Navegue para o diretório raiz do projeto

```bash
cd ./codeChallenge
```

## Empacote o projeto com Maven
Após clonar o projeto ou sempre que fizer alterações no backend, você deve empacotar o projeto novamente para garantir que as mudanças sejam refletidas no Docker. No terminal (na raiz do projeto), rode o comando:

```bash
mvn clean package
```
Isso vai compilar o projeto, rodar os testes e gerar um novo pacote que será utilizado no container Docker.

# Atualizando os Containers Docker
Após compilar o projeto, derrube os containers atuais e suba novamente com as novas alterações. Use os comandos abaixo:

Derrube os containers rodando:

```bash
docker-compose down
```

Suba os containers novamente, recriando as imagens:

```bash
$env:DOCKER_BUILDKIT=0; docker-compose up --build
```

O que os comandos fazem:

`$env:DOCKER_BUILDKIT=0`: Desativa o BuildKit para garantir maior compatibilidade durante a construção das imagens.

`docker-compose up --build`: Força a reconstrução das imagens Docker com as novas alterações, garantindo que a versão mais recente seja utilizada.

# Verificando os Containers
Para verificar se os containers estão rodando corretamente, você pode usar o comando:

```bash
docker ps
```

Este comando lista todos os containers ativos. Os containers criados devem ser:

- corelab-challenge
  - react_dev-1 (Frontend React rodando na porta 3000)
  - postgres_dev-1 (Banco de dados PostgreSQL rodando nas portas 5432/5433)
  - java_dev-1 (Backend Java rodando na porta 8080)


> [!IMPORTANT]
> # Desenvolvimento e Testes
>
> Este projeto foi desenvolvido ao longo de aproximadamente 2 dias, com 8 horas dedicadas por dia. O tempo adicional foi dedicado à criação de testes unitários e de integração, principalmente no frontend, que demandou mais atenção.

Se você encontrar qualquer problema ou tiver dúvidas, fique à vontade para abrir uma issue ou entrar em contato!
