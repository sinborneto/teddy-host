
# **Projeto Angular com Docker e Microfrontends**

Este projeto é uma aplicação Angular configurada para ser executada dentro de um contêiner Docker. Além disso, ele está configurado para consumir **micro-frontends** que estão hospedados no **Vercel**. Abaixo estão os passos para rodar o projeto usando o Docker e como os micro-frontends são integrados.

## **Pré-requisitos**

Antes de começar, certifique-se de que você tem os seguintes softwares instalados no seu computador:

- [Docker](https://www.docker.com/get-started) — Para construir e rodar contêineres.
- [Node.js](https://nodejs.org/) — Para rodar o Angular localmente (durante o processo de build).

## **Passos para rodar o projeto**

### 1. **Clone o repositório**

Se você ainda não tem o projeto em sua máquina, clone o repositório:

```bash
git clone https://github.com/sinborneto/teddy-host.git
cd teddy-host
```

### 2. **Construir a Imagem Docker**

Para construir a imagem Docker do projeto, execute o seguinte comando no diretório do projeto, onde o Dockerfile está localizado:

```bash
docker build -t angular-docker .
```

**Explicação:**

- `docker build`: Comando usado para construir a imagem Docker.
- `-t angular-docker`: A flag `-t` serve para atribuir um nome à imagem que está sendo criada (no caso, `angular-docker`).
- `.`: O ponto final indica que o contexto de construção é o diretório atual (onde o Dockerfile está localizado).

Este comando cria uma imagem Docker baseada no seu `Dockerfile`, que contém as configurações para rodar o seu projeto Angular dentro de um contêiner.

### 3. **Rodar o Contêiner**

Depois que a imagem for criada, o próximo passo é rodar o contêiner a partir dessa imagem. Execute o comando:

```bash
docker run -d -p 8080:80 angular-docker
```

**Explicação:**

- `docker run`: Comando usado para rodar um contêiner Docker.
- `-d`: A flag `-d` executa o contêiner em segundo plano (modo "detached").
- `-p 8080:80`: A flag `-p` mapeia a porta `8080` do seu computador local para a porta `80` dentro do contêiner Docker. Isso permite acessar o aplicativo na URL `http://localhost:8080`.
- `angular-docker`: O nome da imagem Docker que foi criada no passo anterior.

### 4. **Acessar o Projeto**

Agora, você pode acessar a aplicação Angular no seu navegador, indo para a URL:

```
http://localhost:8080
```

Isso irá abrir a aplicação Angular que está sendo servida dentro do contêiner Docker.

### 5. **Micro-frontends**

Este projeto consome **micro-frontends** hospedados no **Vercel**. Os micro-frontends são carregados dinamicamente a partir das seguintes URLs:

- **Login Microfrontend**: [https://login-mfe.vercel.app](https://login-mfe.vercel.app)
- **System Microfrontend**: [https://system-mfe.vercel.app](https://system-mfe.vercel.app)

Esses micro-frontends são integrados ao projeto principal e são consumidos de forma transparente durante a execução da aplicação.

### 6. **Configuração do Micro-frontend**

Os micro-frontends são carregados dinamicamente no seu projeto Angular utilizando a arquitetura de **Module Federation**. A configuração está presente no projeto, e os módulos são importados a partir das URLs mencionadas acima. Isso permite que a aplicação principal se integre de forma eficiente com os micro-frontends hospedados no Vercel.

### 7. **Parar o Contêiner**

Se você precisar parar o contêiner que está rodando, use o comando:

```bash
docker ps
```

Isso irá listar os contêineres em execução. Encontre o **ID do contêiner** do seu projeto e execute:

```bash
docker stop <id-do-container>
```

Ou se preferir parar todos os contêineres:

```bash
docker stop $(docker ps -q)
```

## **Conclusão**

Agora você está rodando seu projeto Angular dentro de um contêiner Docker, integrando-o com micro-frontends hospedados no Vercel! Isso facilita a execução do projeto em qualquer ambiente, garantindo que ele seja executado da mesma forma em todas as máquinas.

Se você precisar de mais alguma ajuda, consulte a [documentação do Docker](https://docs.docker.com/) ou a [documentação do Vercel](https://vercel.com/docs).
