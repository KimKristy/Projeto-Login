const express = require("express");
const fs = require("fs"); //file system
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("josnwebtoken");
const cors = require("cors");
const { userInfo } = require("os");
const { setMaxIdleHTTPParsers } = require("http");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "12345678910";

const localDados = path.join(__dirname, "data/usuarios.json");

const consultarUsuarios = () => {
  const data = fs.readFileSync(localDados, "utf-8");
  return JSON.parse(data);
};

const salvarUsuarios = (users) => {
  fs.writeFileSync(localDados, JSON.stringify(users, null, 2));
};

app.post("/register", async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "Campos obrigatórios" });
  }
  const users = consultarUsuarios();
  if (users.find((user) => user.email == email)) {
    return res
      .status(400)
      .json({ message: "Email já cadastrados no banco de dados" });
  }

  //   criptografar a senha
  const hashSenha = await bcrypt.hash(senha, 10);
  const novoUsuario = { id: Date.now, email, senha: hashSenha };
  users.push(novoUsuario);
  salvarUsuarios(users);
  res.status(200).json({ message: "Usuário registrado com sucesso" });
});

app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const users = consultarUsuarios();
  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(400).json({ message: "Usuário/senha inválidos" });
  }
  const senhaValida = await bcrypt.compare(senha, user.senha);
  if (!senhaValida) {
    return res.status(400).json({ message: "Senha inválida" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "10m",
  });
  res.json({ message: "Login realizado com sucesso", token });
});

app.listen(port, () => {
  console.log(`server rodando http://localhost:${port}`);
});
