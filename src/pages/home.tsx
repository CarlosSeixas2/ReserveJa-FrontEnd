/* eslint-disable react-hooks/exhaustive-deps */
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";
import { useApi } from "../hook/useApi";
import { FetchClassrooms } from "../api/api";
import { SalasProps } from "../interfaces";
import CardClassRoom from "../components/card-class-room";

const Home = () => {
  const [salas, setSalas] = useState<SalasProps[]>([]);
  const { request, loading, error } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response = await FetchClassrooms(request);
      if (response) setSalas(response);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 px-4 sm:px-8 py-6">
      <Navbar />

      <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Salas Disponíveis
      </h1>

      {loading && (
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Carregando salas...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 text-sm mb-8">
          Ocorreu um erro ao carregar as salas. Por favor, tente novamente mais
          tarde.
        </div>
      )}

      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {!loading &&
          !error &&
          salas.map((sala) => <CardClassRoom key={sala.id} sala={sala} />)}
      </main>
    </div>
  );
};

export default Home;
