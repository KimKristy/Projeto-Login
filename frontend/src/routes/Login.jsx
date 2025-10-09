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
    <div className="flex flex-grow items-center justify-center bg-gradient-to-r from-yellow-200 to-amber-300 py-10">
      <div className="bg-white shadow-lg rounded-3xl px-10 py-8 w-full max-w-md">
        <h2 className="text-4xl font-extrabold text-center text-amber-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-left font-semibold text-amber-700 mb-1">
              Email:{" "}
            </label>
            <input
              type="text"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-amber-700 mb-1">
              Senha:{" "}
            </label>
            <input
              type="password"
              placeholder="digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-amber-700 text-white font-bold py-3 rounded-lg hover:bg-amber-800 transition duration-200 shadow-md"
          >
            Entrar
          </button>
        </form>

        {mensagem && (
          <p className="text-center mt-4 font-medium text-amber-900">
            {mensagem}
          </p>
        )}

        <p className="text-center mt-6 text-sm">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-amber-700 hover:text-amber-500 font-semibold"
          >
            Criar Conta
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
