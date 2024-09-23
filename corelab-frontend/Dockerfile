# Usando uma imagem do Node 16.15.0
FROM node:16.15.0

# Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar os arquivos de package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar todo o projeto para o diretório de trabalho
COPY . .

# Compilar o projeto React
RUN npm run build

# Expor a porta que o React usa
EXPOSE 3000

# Rodar o React no modo de desenvolvimento
CMD ["npm", "start"]
