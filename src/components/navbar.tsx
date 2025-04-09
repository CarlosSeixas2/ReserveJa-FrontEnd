import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-context";

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <header className="flex justify-between items-center mb-10">
      <Link
        to={{
          pathname: "/",
        }}
      >
        <img src="/src/assets/logo.svg" alt="logo" className="h-10" />
      </Link>
      <nav className="flex gap-8 items-center text-sm font-medium text-gray-700">
        <Link to="#" className="hover:text-indigo-600 transition">
          Reservas
        </Link>
        <Link to="#" className="hover:text-indigo-600 transition">
          Liberar Salas
        </Link>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="text-sm font-semibold text-gray-800 hover:text-indigo-600"
              >
                {user?.nome}
              </Link>
              <div className="h-10 w-10 rounded-full overflow-hidden">
                <img
                  src="/src/assets/perfil.png"
                  alt="perfil"
                  className="h-full w-full object-cover"
                />
              </div>
            </>
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
