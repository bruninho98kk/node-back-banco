import prisma from "../../prisma/client.js";

class TarefaModel {
  constructor() {
    this.tarefas = [];
  }

  async getAll() {
    return await prisma.task.findMany();
  }

  create = async (descricao) => {
    return await prisma.task.create({
      data: { 
        descricao: descricao
      }
    });
  }

  update = async (id, concluida,descricao) => {
   try {
 const tarefa = await prisma.task.update({
    where: { id },
    data: {
      concluida: concluida !== undefined ? concluida : true,
      descricao
    },
    });
    return  tarefa;
}   catch (error) {
  console.log("Error", error);
  throw error;
}
  
    const tarefa = this.tarefas.find((t) => t.id === Number(id));
    if (tarefa) {
      tarefa.concluida = concluida !== undefined ? concluida : tarefa.concluida;
      return tarefa;
    }
    return null;
  }

  delete(id) {
    const index = this.tarefas.findIndex((t) => t.id === Number(id));
    if (index !== -1) {
      this.tarefas.splice(index, 1);
      return true;
    }
    return false;
  }
}

export default new TarefaModel();