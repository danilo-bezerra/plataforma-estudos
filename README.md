
# Plataforma de estudos

Este guia irá ajudá-lo a configurar e executar a aplicação no seu ambiente local.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado no seu computador:

- [Node.js](https://nodejs.org/) (recomendado: versão LTS)
- [npm](https://www.npmjs.com/) (geralmente vem junto com o Node.js)

## Passos para Configuração

1. Clone o repositório

   ```bash
   git clone https://github.com/danilo-bezerra/plataforma-estudos.git
   cd plataforma-estudos
   ```

2. Instale as dependências

   Estando no diretório do projeto execute o comando:

   ```bash
   npm install
   ```

3. Construa a aplicação

   Para construir a aplicação para produção, use o comando:

   ```bash
   npm run build
   ```

4. Inicie a aplicação

   Para iniciar a aplicação, use o comando:

   ```bash
   npm start
   ```

   A aplicação estará disponível em [http://localhost:8080](http://localhost:8080).

## Script para Automatizar o uso

Se preferir, você pode criar um script `.bat` para automatizar os comandos acima no Windows. Crie um arquivo `start.bat` no diretório raiz do projeto com o seguinte conteúdo:

```batch
@echo off

REM exemplo: cd D:\projetos\plataforma-estudos
cd <caminho para a plataforma de estudos>

REM abre a plataforma no nevagador
start http://localhost:8080

REM Inicia a aplicação
npm start
```

Para executar o script, basta dar um duplo clique no arquivo `start.bat`.

## Aprenda Mais

Para aprender mais sobre Next.js, confira os seguintes recursos:

- [Documentação Oficial](https://nextjs.org/docs)
- [Tutoriais Next.js](https://nextjs.org/learn)
- [Exemplos de projetos](https://github.com/vercel/next.js/tree/canary/examples)

## Suporte

Se você tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma issue no repositório ou entrar em contato.


