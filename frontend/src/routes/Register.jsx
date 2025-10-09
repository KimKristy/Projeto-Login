import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/register", {
        email,
        senha,
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/"), 2000);
    } catch (erro) {
      setMessage(erro.response.data.message || "Erro ao registrar usuário");
    }
  };

  return (
    <div className="flex flex-grow items-center justify-center bg-gradient-to-r from-yellow-200 to-amber-300 py-10">
      <div className="bg-white shadow-lg rounded-3xl px-10 py-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-amber-800 mb-6">
          Cadastro de Usuário
        </h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-left font-semibold text-amber-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              placeholder="digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-amber-700 mb-1">
              Senha:
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
            Cadastrar
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 font-medium text-amber-900">
            {message}
          </p>
        )}

        <p className="text-center mt-6 text-sm">
          Já tem uma conta?{" "}
          <a
            href="/"
            className="text-amber-700 hover:text-amber-500 font-semibold"
          >
            Faça login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
