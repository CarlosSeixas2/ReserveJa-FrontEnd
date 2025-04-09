import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FetchLogin } from "../api/api";
import { useApi } from "../hook/useApi";
import { useAuth } from "../context/auth-context";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { request, loading, error } = useApi();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await FetchLogin(email, password, request);

    if (response?.token) {
      login(response.token);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Esqueceu a senha?
            </a>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition duration-300 disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Entrar"
            )}
          </button>
          {error && (
            <p className="mt-4 text-center text-red-500 font-medium">{error}</p>
          )}
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link
            to={{
              pathname: "/register",
            }}
            className="text-indigo-600 hover:underline font-medium"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
