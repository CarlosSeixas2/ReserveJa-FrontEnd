import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="flex justify-between items-center mb-10">
      <Link to="/">
        <img src="/src/assets/logo.svg" alt="logo" className="h-10" />
      </Link>

      <nav className="flex gap-6 items-center text-sm font-medium text-gray-700">
        {isAuthenticated && (
          <Link to="/my-reserves" className="hover:text-indigo-600 transition">
            Reservas
          </Link>
        )}

        {isAuthenticated && user?.tipo === "Professor" && (
          <Link
            to="#"
            className="hover:text-indigo-600 transition"
            onClick={() => alert("Funcionalidade em desenvolvimento")}
          >
            Liberar Salas
          </Link>
        )}

        <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
          {isAuthenticated && user ? (
            <Link
              to="/profile"
              className="text-sm font-semibold text-gray-800 hover:text-indigo-600 flex flex-row gap-2 items-center"
            >
              {user.nome}
              <CgProfile size={28} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-800 hover:text-indigo-600"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
