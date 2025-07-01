# Trabalho Prático 1 - Gestão de Alunos (API REST + Frontend)

## 👨‍💻 Autor

- **Nome**: Martim Duarte
- **Número**: 31651

Este projeto consiste em um backend em **Node.js/Express** com conexão MongoDB, e um frontend separado hospedado no **Vercel**. O backend está hospedado no **Render**.

---

## Tecnologias utilizadas

- **Backend:**
  - Node.js
  - Express
  - MongoDB (com Mongoose)
  - CORS para controle de acesso
- **Frontend:**
  - JavaScript (fetch API)
  - Hospedagem no Vercel

---

## Estrutura do projeto

- `/backend` - Código do servidor Express e rotas da API
- `/frontend` - Código do cliente (frontend) consumindo a API

---

## Funcionalidades

- CRUD de alunos via API REST (`/api/alunos`)
- Frontend que consome a API e exibe os alunos
- Controle de acesso via CORS configurado para liberar apenas o domínio do frontend

---

## Como rodar o backend localmente

### Pré-requisitos

- Node.js instalado (versão 14+)
- MongoDB rodando localmente ou URL do MongoDB Atlas

### Passos

1. Clone o repositório
2. Entre na pasta do backend
3. Crie um arquivo `.env` com a variável `MONGODB_URI` apontando para seu banco MongoDB

link do render: https://trab1-restapi-martimd11-t4qs.onrender.com/api/alunos
link do vercel: trab1-restapi-martimd11-martims-projects-c6b29c77.vercel.app

