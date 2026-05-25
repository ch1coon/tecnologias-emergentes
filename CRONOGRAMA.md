# Cronograma de Desenvolvimento — TaskFlow

Documento do **Checkpoint 02** do projeto TaskFlow (disciplina Tecnologias Emergentes).

---

## Metodologia de gerenciamento

O desenvolvimento desta fase seguirá a metodologia **Scrum**, com **sprint única** de 17 dias. O acompanhamento das tarefas será feito em um **quadro Kanban** (colunas: *A fazer*, *Em andamento*, *Em revisão*, *Concluído*), podendo ser replicado em ferramentas como **Trello**, **GitHub Projects** ou **planilha eletrônica**.

### Papéis e rituais (adaptados para projeto individual)

| Elemento            | Descrição                                                                 |
|---------------------|---------------------------------------------------------------------------|
| Product Owner       | Francisco — define prioridades e valida entregas                          |
| Desenvolvedor       | Francisco — implementa as tarefas do backlog                              |
| Sprint              | Ciclo único de 15/05 a 31/05/2026                                         |
| Daily (adaptada)    | Revisão diária de 15 minutos do quadro Kanban e bloqueios                 |
| Sprint Review       | Entrega dos checkpoints ao final do período                               |

---

## Período do projeto

| Marco                    | Data           |
|--------------------------|----------------|
| **Data de início**       | 15/05/2026     |
| **Data de término**      | **31/05/2026** |
| **Duração total**        | 17 dias        |

### Entregas acadêmicas (checkpoints)

| Checkpoint | Conteúdo                                              | Prazo de entrega |
|------------|-------------------------------------------------------|------------------|
| 01         | README com identificação, tecnologias e objetivo      | 30/05/2026       |
| 02         | Cronograma, tarefas e prazos                          | 30/05/2026       |
| 03         | Cronograma front/back e progresso de implementação    | **31/05/2026**   |

> Nesta fase (15/05 a 31/05), o foco são os **três checkpoints** da disciplina. A implementação completa do CRUD com persistência será o objetivo da **entrega final** em trilha posterior da disciplina.

---

## Visão da sprint

| Sprint   | Período            | Objetivo principal                                           |
|----------|--------------------|--------------------------------------------------------------|
| Sprint 0 | 15/05 – 31/05/2026 | Planejamento, documentação e preparação inicial do projeto   |

---

## Requisitos e tarefas — fase atual (até 31/05)

Legenda de prioridade: **Alta (A)** | **Média (M)** | **Baixa (B)**

### RA — Requisitos acadêmicos (entregas desta fase)

| ID    | Requisito / Tarefa                                      | Prioridade | Prazo final  |
|-------|---------------------------------------------------------|------------|--------------|
| RA01  | Checkpoint 01 — README com objetivo e tecnologias       | A          | 30/05/2026   |
| RA02  | Checkpoint 02 — Cronograma e tarefas com prazos         | A          | 30/05/2026   |
| RA03  | Checkpoint 03 — Cronograma front/back e progresso       | A          | 31/05/2026   |

### RT — Preparação técnica (dentro do prazo do projeto)

| ID    | Requisito / Tarefa                                      | Prioridade | Prazo final  | Status previsto |
|-------|---------------------------------------------------------|------------|--------------|-----------------|
| RT01  | Configurar repositório Git no GitHub                    | A          | 28/05/2026   | Planejado       |
| RT02  | Configurar ambiente Node.js, PostgreSQL e Prisma        | M          | 31/05/2026   | Planejado       |
| RT03  | Criar estrutura inicial de pastas (front-end e back-end)| M          | 31/05/2026   | Planejado       |

### RF, RNF e RT — Implementação do CRUD (planejamento)

As tarefas abaixo compõem o **escopo da aplicação TaskFlow** e constam no cronograma como requisitos do projeto. Nesta fase (até 31/05), elas permanecem com status **planejado** e serão desenvolvidas na **entrega final** da disciplina.

| ID    | Requisito / Tarefa                                      | Prioridade | Status     |
|-------|---------------------------------------------------------|------------|------------|
| RF01  | Cadastrar nova tarefa (Create)                          | A          | Planejado  |
| RF02  | Listar todas as tarefas (Read)                          | A          | Planejado  |
| RF03  | Visualizar detalhes de uma tarefa (Read)                | A          | Planejado  |
| RF04  | Editar tarefa existente (Update)                        | A          | Planejado  |
| RF05  | Excluir tarefa (Delete)                                 | A          | Planejado  |
| RF06  | Filtrar tarefas por status                              | M          | Planejado  |
| RF07  | Filtrar tarefas por prioridade                          | M          | Planejado  |
| RF08  | Buscar tarefa por título                                | B          | Planejado  |
| RNF01 | Persistir dados em PostgreSQL                           | A          | Planejado  |
| RNF02 | API REST documentada e padronizada                      | M          | Planejado  |
| RNF03 | Interface responsiva (desktop e mobile)                 | M          | Planejado  |
| RNF04 | Validação de dados no front-end e back-end              | A          | Planejado  |
| RNF05 | Testes automatizados                                    | A          | Planejado  |
| RNF06 | Código hospedado no GitHub com README completo          | A          | Planejado  |
| RT04  | Implementar camada de serviço e rotas Express           | A          | Planejado  |
| RT05  | Configurar projeto React + Vite + TypeScript            | A          | Planejado  |
| RT06  | Integrar front-end com API                              | A          | Planejado  |
| RT07  | Configurar variáveis de ambiente (.env)                 | M          | Planejado  |
| RT08  | Publicar aplicação (deploy)                             | M          | Planejado  |

---

## Cronograma detalhado (15/05 a 31/05)

| ID    | Tarefa                                          | Início     | Fim        | Duração | Dependências |
|-------|-------------------------------------------------|------------|------------|---------|--------------|
| RA01  | Elaborar README inicial (Checkpoint 01)         | 15/05/2026 | 18/05/2026 | 4 dias  | —            |
| RA02  | Elaborar cronograma (Checkpoint 02)             | 19/05/2026 | 30/05/2026 | 12 dias | RA01         |
| RT01  | Configurar repositório Git no GitHub            | 20/05/2026 | 28/05/2026 | 9 dias  | RA01         |
| RT03  | Criar estrutura inicial front-end e back-end    | 26/05/2026 | 29/05/2026 | 4 dias  | RT01         |
| RT02  | Configurar ambiente Node.js, PostgreSQL e Prisma| 28/05/2026 | 31/05/2026 | 4 dias  | RT01         |
| RA03  | Atualizar cronograma CP03 (front/back + progresso) | 27/05/2026 | 31/05/2026 | 5 dias | RA02      |

---

## Visão front-end e back-end (para o Checkpoint 03)

### Back-end (Node.js + Express + Prisma + PostgreSQL)

| Tarefa                              | Prazo      | Status (31/05) |
|-------------------------------------|------------|----------------|
| Estrutura de pastas do servidor     | 29/05/2026 | Planejado      |
| Configuração do ambiente e Prisma   | 31/05/2026 | Planejado      |
| Schema da entidade Tarefa           | —          | Planejado      |
| Endpoints CRUD (RF01–RF05)          | —          | Planejado      |

### Front-end (React + Vite + TypeScript)

| Tarefa                              | Prazo      | Status (31/05) |
|-------------------------------------|------------|----------------|
| Estrutura de pastas do cliente      | 29/05/2026 | Planejado      |
| Configuração do projeto Vite        | —          | Planejado      |
| Telas CRUD (RF01–RF05)              | —          | Planejado      |
| Integração com API (RT06)           | —          | Planejado      |

---

## Diagrama de linha do tempo (Gantt simplificado)

```
        Maio 2026
|------------- Sprint 0 (projeto completo) -------------|
15    18    22    26    28    30    31
|RA01 |     |RA02 + RT01      |RT02/03|RA03|
      CP01       CP02              CP03 ▲
                              entrega 31/05
```

---

## Quadro Kanban — situação em 31/05

| A fazer                    | Em andamento           | Em revisão | Concluído           |
|----------------------------|------------------------|------------|---------------------|
| RT02 — Ambiente            | RA03 — Checkpoint 03   | —          | RA01 — README CP01  |
| RT03 — Estrutura front/back| RA02 — Cronograma CP02 |            |                     |
| RF01–RF05 — CRUD           | RT01 — Repositório Git |            |                     |

---

## Critérios de conclusão por entrega

| Entrega               | Critério de pronto                                              | Prazo    |
|-----------------------|-----------------------------------------------------------------|----------|
| Checkpoint 01         | README com objetivo, tecnologias e identificação da aplicação   | 30/05    |
| Checkpoint 02         | Cronograma publicado, tarefas listadas e prazos até 31/05       | 30/05    |
| Checkpoint 03         | Cronograma separado por front/back com status de implementação  | 31/05    |
| **Encerramento da fase** | Três checkpoints entregues dentro do período do projeto      | **31/05** |

---

## Riscos e mitigações

| Risco                              | Impacto | Mitigação                                           | Prazo revisão |
|------------------------------------|---------|-----------------------------------------------------|---------------|
| Prazo curto (17 dias)              | Alto    | Priorizar documentação; paralelizar RT01 com RA02   | 25/05/2026    |
| Checkpoint 03 no último dia        | Alto    | Iniciar RA03 em 27/05 com esboço front/back         | 31/05/2026    |
| Pouco tempo para setup técnico     | Médio   | RT02 e RT03 como opcionais; foco em RA03 se necessário | 31/05/2026 |

---

## Autor

**Francisco** — projeto individual | Tecnologias Emergentes | Checkpoint 02
