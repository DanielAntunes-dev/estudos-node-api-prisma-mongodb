import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors())

app.post("/usuarios", async (require, response) => {
  await prisma.user.create({
    data: {
      email: require.body.email,
      name: require.body.name,
      age: require.body.age,
    },
  });
  response.status(201).json(require.body);
});

app.get("/usuarios", async (require, response) => {
  const users = await prisma.user.findMany();

  response.status(200).json(users);
});

app.put("/usuarios/:id", async (require, response) => {
  await prisma.user.update({
    where: {
      id: require.params.id,
    },
    data: {
      email: require.body.email,
      name: require.body.name,
      age: require.body.age,
    },
  });
  response.status(201).json(require.body);
});

app.delete("/usuarios/:id", async (require, response) => {
  await prisma.user.delete({
    where: {
      id: require.params.id,
    },
  });
  response.status(200).json({ message: "Usuário deletado com suceso!" });
});

let port = "3000";

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}!!`);
});
