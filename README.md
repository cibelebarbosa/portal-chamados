
# Portal de chamados Anhanguera Educacional

Esse projeto foi desenvolvido no intuito de automatizar a abertura e a execução de chamados abertos por alunos da faculdade Anhanguera Educacional de Guarulhos.




## Stack utilizada

**Front-end:** Angular, Bootstrap 5, Angular Material e Typescript.

**Back-end:** Node, Express e NodeMailer.

**Banco de dados:** MySQL.


## Funcionalidades

- Abertura de chamados por alunos
- Painel de chamados para acompanhamento em tempo real
- Administração de chamados por coordenadores
- Limitação de abertura de chamados baseado no horário de cada coordenadores
- Controle de coordenadores cadastrados
- Geração de relatório de tempo de execução de chamados


## Montando o ambiente

Instale 
- NodeJS;
- Angular CLI;
- MySQL Server;
- MySQL Workbench;
- Git.


## Instalação

Clone o projeto portal-chamados com git clone

```bash
  git clone https://github.com/cibelebarbosa/portal-chamados.git
  cd portal-chamados
```
Entre no diretório server e instale as dependências do servidor e em seguida execute

```bash
  cd server
  npm install
  npm start
```

Entre no diretório client e instale as dependências do app e em seguida execute

```bash
  cd client
  npm install
  npm start
```

Após abra o MySQL Workbench e import os arquivos contidos na pasta estrutura_criacao

```bash
  cd server/src/database/estrutura_criacao
```