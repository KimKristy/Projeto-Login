import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5001";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem("");

    try {
      const response = await axios.post(`${API_URL}/login`, { email, senha });
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setMensagem("Login realizado com sucesso");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMensagem("Erro autenticar token");
      }
    } catch (erro) {
      console.erro("Erro ao logar", erro);
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="text"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              placeholder="digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button>Entrar</button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <p>
          Não tem conta ? <a href="/register">Criar Conta</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
