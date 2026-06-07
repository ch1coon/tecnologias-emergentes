import { PrismaClient, TaskPriority, TaskStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.task.deleteMany();

  await prisma.task.createMany({
    data: [
      {
        title: "Estudar para a prova de Tecnologias Emergentes",
        description: "Revisar checkpoints e implementação do CRUD",
        status: TaskStatus.EM_ANDAMENTO,
        priority: TaskPriority.ALTA,
        dueDate: new Date("2026-06-15"),
      },
      {
        title: "Organizar repositório no GitHub",
        description: "Atualizar README e documentação final",
        status: TaskStatus.PENDENTE,
        priority: TaskPriority.MEDIA,
      },
      {
        title: "Escrever testes automatizados",
        description: "Cobrir endpoints da API e componentes do front-end",
        status: TaskStatus.CONCLUIDA,
        priority: TaskPriority.ALTA,
      },
    ],
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
