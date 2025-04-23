import { useAuth } from "../context/auth-context";
import { LogOut, KeyRound, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import { JSX } from "react/jsx-dev-runtime";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 sm:px-8 py-6">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 sm:p-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 w-full max-w-2xl p-6 sm:p-10">
          <header className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Meu Perfil</h2>
            <p className="text-sm text-gray-500 mt-1">
              Visualize e gerencie suas informações.
            </p>
          </header>

          <section className="space-y-6 text-base text-gray-700 mb-10">
            <InfoRow label="Nome" value={user?.nome} />
            <InfoRow label="Email" value={user?.email} />
            <InfoRow label="Cargo" value={user?.tipo} />
          </section>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            <ActionButton
              text="Editar Perfil"
              icon={<Pencil size={16} />}
              onClick={() => navigate("/editar-perfil")}
              bg="bg-blue-600"
              hover="hover:bg-blue-700"
              ring="focus:ring-blue-500"
            />
            <ActionButton
              text="Trocar Senha"
              icon={<KeyRound size={16} />}
              onClick={() => navigate("/trocar-senha")}
              bg="bg-gray-600"
              hover="hover:bg-gray-700"
              ring="focus:ring-gray-500"
            />
            <ActionButton
              text="Logout"
              icon={<LogOut size={16} />}
              onClick={handleLogout}
              bg="bg-red-600"
              hover="hover:bg-red-700"
              ring="focus:ring-red-500"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

// Subcomponente para linha de info
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3">
    <span className="font-medium text-gray-900">{label}:</span>
    <span className="text-gray-600">{value || "Não informado"}</span>
  </div>
);

// Subcomponente para botões de ação
const ActionButton = ({
  text,
  icon,
  onClick,
  bg,
  hover,
  ring,
}: {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
  bg: string;
  hover: string;
  ring: string;
}) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center gap-2.5 ${bg} ${hover} text-white text-sm font-medium py-3 px-5 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 ${ring} focus:ring-offset-2 w-full`}
  >
    {icon} {text}
  </button>
);

export default Profile;
