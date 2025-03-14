# Usar uma imagem base do Node.js 20
FROM node:20-alpine as build

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar os arquivos de configuração do projeto
COPY . .

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Compilar o projeto Angular
RUN npm run build -- --configuration production

# Usar uma imagem leve do Nginx para servir os arquivos compilados
FROM nginx:alpine

# Copiar os arquivos compilados do Angular para o diretório do Nginx
COPY --from=build /app/dist/host/browser usr/share/nginx/html

# Copiar os arquivos de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copiar os arquivos de configuração de tipos
COPY mime.types /etc/nginx/mime.types

# Copiar os assets
COPY --from=build /app/src/assets/shared/image /usr/share/nginx/html/assets/shared/image

# Expor a porta 80 (porta padrão do Nginx)
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
