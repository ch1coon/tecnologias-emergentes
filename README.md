# TaskFlow — Sistema de Gerenciamento de Tarefas

Projeto desenvolvido na disciplina **Tecnologias Emergentes**, com uma aplicação web funcional que oferece operações de **CRUD** (Create, Read, Update e Delete) e **persistência dos dados** em banco de dados PostgreSQL.

Repositório: [github.com/ch1coon/tecnologias-emergentes](https://github.com/ch1coon/tecnologias-emergentes)

---

## Objetivo da aplicação

O **TaskFlow** é uma aplicação web para **organização e acompanhamento de tarefas pessoais ou acadêmicas**. O usuário pode cadastrar tarefas com título, descrição, prioridade, status (pendente, em andamento, concluída) e data de vencimento, além de editar, listar, filtrar, buscar e remover registros.

A aplicação demonstra na prática:

- Desenvolvimento de interface web responsiva;
- Exposição de API REST para comunicação entre front-end e back-end;
- Implementação completa de CRUD com validação de dados;
- Armazenamento persistente em banco de dados relacional;
- Testes automatizados e boas práticas de código limpo.

---

## Tecnologias utilizadas

| Camada         | Tecnologia                         | Função no projeto                                      |
|----------------|------------------------------------|--------------------------------------------------------|
| Front-end      | **React 19** + **TypeScript** + **Vite** | Interface do usuário e consumo da API          |
| Estilização    | **CSS** (custom properties)        | Layout responsivo e componentes visuais                |
| Back-end       | **Node.js** + **Express 5** + **TypeScript** | API REST, regras de negócio e acesso aos dados |
| Validação      | **Zod**                            | Validação de entrada na API                            |
| Banco de dados | **PostgreSQL 16**                  | Persistência das tarefas                               |
| ORM            | **Prisma**                         | Mapeamento objeto-relacional e migrações               |
| Testes         | **Vitest** + **Supertest** + **Testing Library** | Testes automatizados no back e front-end |
| Versionamento  | **Git** + **GitHub**               | Controle de versão e hospedagem do código              |
| Container      | **Docker Compose**                 | Execução local do PostgreSQL                           |

---

## Ambiente de desenvolvimento

| Ferramenta        | Versão utilizada | Uso                                      |
|-------------------|------------------|------------------------------------------|
| Sistema operacional | Linux (Ubuntu) | Ambiente principal de desenvolvimento    |
| Node.js           | 22.x             | Runtime do back-end e ferramentas de build |
| npm               | 11.x             | Gerenciamento de dependências            |
| Docker            | 29.x             | Container do PostgreSQL                  |
| Editor / IDE      | **Cursor** / VS Code | Edição, terminal integrado e assistência |
| Git               | 2.x              | Controle de versão                       |
| Navegador         | Chrome / Firefox | Testes manuais da interface              |

---

## Requisitos de sistema

Para executar a aplicação localmente:

| Requisito    | Versão mínima recomendada |
|--------------|---------------------------|
| Node.js      | 20.x ou superior          |
| npm          | 10.x ou superior          |
| Docker       | 24.x ou superior (para PostgreSQL via Compose) |
| Git          | 2.x                       |
| Navegador    | Versão atual (Chrome, Firefox, Edge) |
| Memória RAM  | 4 GB (recomendado 8 GB)   |
| Espaço em disco | 500 MB livres        |

> Alternativa: é possível usar um PostgreSQL instalado localmente, ajustando a variável `DATABASE_URL` em `backend/.env`.

---

## Estrutura do projeto

```
tecnologias-emergentes/
├── backend/                 # API REST (Express + Prisma)
│   ├── prisma/              # Schema e seed do banco
│   ├── src/
│   │   ├── controllers/     # Camada HTTP
│   │   ├── services/        # Regras de negócio
│   │   ├── repositories/    # Acesso a dados (padrão Repository)
│   │   ├── validators/      # Schemas Zod
│   │   └── routes/          # Rotas da API
│   └── tests/               # Testes automatizados
├── frontend/                # Interface React + Vite
│   └── src/
│       ├── components/      # Componentes de UI
│       ├── services/        # Cliente da API
│       └── styles/          # Estilos globais
├── docker-compose.yml       # PostgreSQL local
├── CRONOGRAMA.md            # Planejamento ágil (checkpoints)
└── README.md
```

---

## Como instalar e executar

### 1. Clonar o repositório

```bash
git clone https://github.com/ch1coon/tecnologias-emergentes.git
cd tecnologias-emergentes
```

### 2. Configurar o banco de dados

Escolha **uma** das opções abaixo:

**Opção A — PostgreSQL já instalado na máquina (porta 5432)**

Se você já tem PostgreSQL rodando localmente, crie o usuário e o banco:

```bash
sudo -u postgres psql -c "CREATE USER taskflow WITH PASSWORD 'taskflow';"
sudo -u postgres psql -c "CREATE DATABASE taskflow OWNER taskflow;"
```

Mantenha no `backend/.env`:

```env
DATABASE_URL="postgresql://taskflow:taskflow@localhost:5432/taskflow?schema=public"
```

**Opção B — PostgreSQL via Docker (porta 5433 no host)**

Use esta opção se a porta 5432 já estiver ocupada por outro PostgreSQL:

```bash
docker compose up -d
```

No `backend/.env`, use a porta **5433**:

```env
DATABASE_URL="postgresql://taskflow:taskflow@localhost:5433/taskflow?schema=public"
```

### 3. Configurar e iniciar o back-end

```bash
cd backend
cp .env.example .env
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

A API ficará disponível em `http://localhost:3001`.

### 4. Configurar e iniciar o front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A interface ficará disponível em `http://localhost:5173`.

### 5. Scripts úteis (raiz do projeto)

```bash
npm run db:up          # Sobe o PostgreSQL
npm run dev:backend    # Inicia a API
npm run dev:frontend   # Inicia o React
npm test               # Executa todos os testes
```

---

## API REST — Endpoints

| Método | Rota              | Descrição                          |
|--------|-------------------|------------------------------------|
| GET    | `/health`         | Verificação de saúde da API        |
| GET    | `/api/tasks`      | Lista tarefas (filtros opcionais)  |
| GET    | `/api/tasks/:id`  | Detalhes de uma tarefa             |
| POST   | `/api/tasks`      | Cria nova tarefa                   |
| PUT    | `/api/tasks/:id`  | Atualiza tarefa existente          |
| DELETE | `/api/tasks/:id`  | Remove tarefa                      |

**Filtros de listagem (query string):** `status`, `priority`, `search`

---

## Funcionalidades implementadas

- **Create:** cadastro de novas tarefas;
- **Read:** listagem, visualização de detalhes e busca por título;
- **Update:** edição de tarefas existentes (status, prioridade, etc.);
- **Delete:** remoção de tarefas com confirmação;
- **Filtros:** por status e prioridade;
- **Persistência:** dados armazenados em PostgreSQL via Prisma.

---

## Código limpo

O projeto adota práticas de código limpo para manter o código legível, testável e fácil de evoluir:

| Prática                         | Aplicação no TaskFlow                                      |
|---------------------------------|------------------------------------------------------------|
| **Separação de responsabilidades** | Camadas distintas: rotas → controllers → services → repositories |
| **Nomes expressivos**           | Funções e variáveis em português/inglês técnico consistente |
| **Validação centralizada**      | Schemas Zod reutilizáveis no back-end                      |
| **Tipagem estática**            | TypeScript em front-end e back-end                         |
| **Componentes focados**         | Cada componente React com responsabilidade única           |
| **Tratamento de erros**         | Respostas HTTP padronizadas (400, 404, 500)                |
| **Configuração por ambiente**   | Variáveis em `.env` (nunca versionadas)                    |
| **Código autoexplicativo**      | Comentários apenas onde a lógica não é óbvia               |

---

## Padrão de projeto: Repository

O back-end utiliza o padrão **Repository** para desacoplar a lógica de negócio do acesso a dados:

- Interface `ITaskRepository` define o contrato de persistência;
- Classe `PrismaTaskRepository` implementa o contrato com Prisma;
- `TaskService` depende da interface, não da implementação concreta.

Isso facilita testes unitários (com mocks do repositório) e futuras trocas de banco ou ORM sem alterar as regras de negócio.

---

## Testes automatizados

| Camada     | Ferramenta              | Arquivos de teste                    | Cobertura principal              |
|------------|-------------------------|--------------------------------------|----------------------------------|
| Back-end   | Vitest + Supertest      | `backend/tests/task.service.test.ts` | Regras de negócio do `TaskService` |
| Back-end   | Vitest + Supertest      | `backend/tests/task.api.test.ts`     | Endpoints REST da API            |
| Front-end  | Vitest + Testing Library| `frontend/src/components/TaskList.test.tsx` | Renderização e interações |
| Front-end  | Vitest                  | `frontend/src/utils/labels.test.ts`  | Funções utilitárias              |

**Executar testes:**

```bash
# Todos os testes
npm test

# Apenas back-end
npm run test --prefix backend

# Apenas front-end
npm run test --prefix frontend
```

---

## Como contribuir

1. Faça um **fork** do repositório no GitHub;
2. Crie uma branch para sua alteração: `git checkout -b feature/minha-melhoria`;
3. Implemente a mudança seguindo o padrão de camadas do projeto;
4. Execute os testes: `npm test`;
5. Faça commit com mensagem descritiva (ex.: `feat: adiciona filtro por data`);
6. Envie um **Pull Request** para a branch `main` descrevendo o que foi alterado e por quê.

**Boas práticas para contribuições:**

- Não commitar arquivos `.env` ou credenciais;
- Manter TypeScript estrito (sem `any` desnecessário);
- Adicionar ou atualizar testes quando alterar comportamento;
- Seguir a estrutura de pastas existente.

---

## Cronograma

O planejamento ágil (metodologia Scrum, tarefas, prazos e progresso front/back) está em [CRONOGRAMA.md](./CRONOGRAMA.md).

---

## Status do projeto

| Checkpoint | Descrição                                      | Status     |
|------------|------------------------------------------------|------------|
| 01         | README com identificação e objetivo            | Concluído  |
| 02         | Cronograma e tarefas com prazos                | Concluído  |
| 03         | Cronograma front/back e progresso              | Concluído  |
| Final      | CRUD completo, testes, hospedagem e documentação | Concluído |

---

## Autor

**Francisco** — projeto individual da disciplina Tecnologias Emergentes.
