# TaskFlow — Sistema de Gerenciamento de Tarefas

Projeto desenvolvido na disciplina **Tecnologias Emergentes**, com foco em uma aplicação web funcional que oferece operações de **CRUD** (Create, Read, Update e Delete) e **persistência dos dados** em banco de dados.

---

## Objetivo da aplicação

O **TaskFlow** é uma aplicação web para **organização e acompanhamento de tarefas pessoais ou acadêmicas**. O usuário poderá cadastrar tarefas com informações como título, descrição, prioridade, status (pendente, em andamento, concluída) e data de vencimento, além de editar, listar, filtrar e remover registros.

O objetivo principal é oferecer uma ferramenta simples e objetiva para o controle de atividades do dia a dia, demonstrando na prática:

- Desenvolvimento de interface web responsiva;
- Exposição de API REST para comunicação entre front-end e back-end;
- Implementação completa de CRUD com validação de dados;
- Armazenamento persistente em banco de dados relacional.

---

## Tecnologias previstas

| Camada        | Tecnologia                          | Função no projeto                                      |
|---------------|-------------------------------------|--------------------------------------------------------|
| Front-end     | **React** + **TypeScript** + **Vite** | Interface do usuário e consumo da API                  |
| Estilização   | **CSS Modules** ou **Tailwind CSS** | Layout e componentes visuais                           |
| Back-end      | **Node.js** + **Express** + **TypeScript** | API REST, regras de negócio e acesso aos dados   |
| Banco de dados| **PostgreSQL**                      | Persistência das tarefas e demais entidades            |
| ORM           | **Prisma**                          | Mapeamento objeto-relacional e migrações               |
| Versionamento | **Git** + **GitHub**                | Controle de versão e hospedagem do código              |
| Ambiente      | **Linux** (Ubuntu)                  | Sistema operacional de desenvolvimento                 |
| Editor        | **Cursor** / **VS Code**            | Ambiente de desenvolvimento integrado (IDE)            |

---

## Escopo funcional (visão geral)

- **Create:** cadastrar novas tarefas;
- **Read:** listar tarefas e visualizar detalhes de um registro;
- **Update:** alterar dados de tarefas existentes (incluindo status);
- **Delete:** remover tarefas da base de dados.

Funcionalidades complementares previstas para entregas futuras: filtros por status e prioridade, busca por título.

---

## Autor

**Francisco** — projeto individual da disciplina Tecnologias Emergentes.

---

## Status do projeto

| Checkpoint | Descrição                                      | Status        |
|------------|------------------------------------------------|---------------|
| 01         | README com identificação e objetivo            | Concluído     |
| 02         | Cronograma e tarefas com prazos                 | Pendente      |
| 03         | Cronograma front/back e progresso (entrega 31/05) | Pendente   |
| Final      | CRUD completo, testes, hospedagem e documentação | Pendente    |
