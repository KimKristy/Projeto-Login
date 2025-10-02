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
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-amber-950 m-5 p-2.5 justify-center text-center border-2">
        <h2 className="font-bold text-amber-800 text-5xl pb-4">Login</h2>
        <form onSubmit={handleLogin} className="">
          <div className="border-2 m-2">
            <label className="font-bold">Email: </label>
            <input
              type="text"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="border-2 m-2">
            <label className="font-bold">Senha: </label>
            <input
              type="password"
              placeholder="digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button className="border-2 m-1 p-1 rounded-xl border-amber-900 font-bold hover:bg-amber-500">
            Entrar
          </button>
        </form>
        {mensagem && <p>{mensagem}</p>}
        <p>
          Não tem conta ?{" "}
          <a href="/register" className="hover:text-amber-500">
            Criar Conta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
