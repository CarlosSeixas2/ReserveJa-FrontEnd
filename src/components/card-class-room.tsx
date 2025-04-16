import { Link } from "react-router-dom";
import { SalasProps } from "../interfaces";
import { useAuth } from "../context/auth-context";
import { CalendarDays, Mail } from "lucide-react";

interface CardClassRoom {
  sala: SalasProps;
}

const CardClassRoom = ({ sala }: CardClassRoom) => {
  const { isAuthenticated, user } = useAuth();

  return (
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
          <h3 className="text-base font-semibold text-gray-800">{sala.nome}</h3>
          <p className="text-sm text-gray-600">Capacidade: {sala.capacidade}</p>
        </div>

        <div className="flex gap-2">
          {user?.tipo === "Professor" && (
            <Link
              to={`reserva/${sala.id}`}
              className="flex items-center justify-center gap-1 flex-1 py-2 px-3 text-sm bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition"
            >
              <CalendarDays size={16} /> Reservar
            </Link>
          )}
          <Link
            to={`solicitar/${sala.id}`}
            onClick={(e) => {
              if (!isAuthenticated) {
                e.preventDefault();
                alert("Você precisa estar logado para reservar uma sala.");
              }
            }}
            className="flex items-center justify-center gap-1 flex-1 py-2 px-3 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition"
          >
            <Mail size={16} /> Solicitar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardClassRoom;
