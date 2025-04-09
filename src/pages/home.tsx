/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import { CalendarDays, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useApi } from "../hook/useApi";
import { FetchClassrooms } from "../api/api";
import { SalasProps } from "../interfaces";

const Home = () => {
  const [salas, setSalas] = useState<SalasProps[]>([]);

  const { request, loading, error } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response = await FetchClassrooms(request);
      if (response) {
        setSalas(response);
        console.log(response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 px-4 sm:px-8 py-6">
      <Navbar />

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-12 text-center">
        Salas Disponíveis
      </h1>

      {loading && (
        <div className="flex justify-center items-center mb-6">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-700">Carregando salas...</span>
        </div>
      )}

      {error && (
        <div className="text-center text-red-600 text-sm mb-6">
          Ocorreu um erro ao carregar as salas. Tente novamente mais tarde.
        </div>
      )}

      <main className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {!loading &&
          !error &&
          salas.map((sala) => (
            <div
              key={sala.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden border border-gray-200"
            >
              <img
                src={"/src/assets/sala.jpeg"}
                alt={sala.nome}
                className="w-full h-36 object-cover"
              />
              <div className="p-4 flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-800">
                    {sala.nome}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Capacidade: {sala.capacidade}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Link
                    to={`reserva/${sala.id}`}
                    className="flex items-center justify-center gap-1 flex-1 py-2 px-3 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
                  >
                    <CalendarDays size={16} /> Reservar
                  </Link>
                  <Link
                    to={`solicitar/${sala.id}`}
                    className="flex items-center justify-center gap-1 flex-1 py-2 px-3 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
                  >
                    <Mail size={16} /> Solicitar
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </main>
    </div>
  );
};

export default Home;
