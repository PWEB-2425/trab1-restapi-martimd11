# Trabalho Prático 1 – PWEB

**Nome:** Martim Duarte  
**Número:** 31651  
**Curso:** ERSC 
**Unidade Curricular:** Programação Web 

---

## 🌐 Publicação

- **Frontend (Vercel):**  
  [https://trabalho-o9xeb4xki-martims-projects-6eeba55f.vercel.app](https://trabalho-o9xeb4xki-martims-projects-6eeba55f.vercel.app)

- **Backend (Render):**  
  [https://trab1-restapi-martimd11-louv.onrender.com](https://trab1-restapi-martimd11-louv.onrender.com)

---

## 🛠️ Instalação e Execução Local

### 📦 Requisitos

- Node.js e npm instalados
- MongoDB Atlas 
- Git

### 🧪 Passos para correr localmente:

```bash
# 1. Clonar o repositório
git clone https://github.com/PWEB-2425/trab1-restapi-martimd11

# 2. Instalar o backend
cd trabalho-pw/backend
npm install

# 3. Criar o ficheiro .env com a URI do MongoDB Atlas
echo MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/alunosDB > .env

# 4. Correr o servidor
node server.js
