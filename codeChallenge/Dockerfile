# Use a imagem base do OpenJDK
FROM openjdk:21

# Adicione o JAR da sua aplicação ao container
COPY target/codeChallenge-0.0.1-SNAPSHOT.jar app.jar

# Defina o comando para executar sua aplicação
ENTRYPOINT ["java", "-jar", "/app.jar"]
