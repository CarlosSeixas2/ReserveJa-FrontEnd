/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useApi } from "../hook/useApi";
import {
  FetchByIdRoom,
  FetchClassroomById,
  SendSolicitation,
} from "../api/api";
import { SalasProps } from "../interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Navbar from "../components/navbar";

const SolicitationDetails = () => {
  const { classroomId } = useParams();
  const { error, loading, request } = useApi();

  const navigate = useNavigate();

  const [classroom, setClassroom] = useState<SalasProps | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [reason, setReason] = useState<string>("");
  const calendarRef = useRef<HTMLDivElement>(null);

  const toggleTimeSelection = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sala = await FetchClassroomById(classroomId as string, request);

        if (sala) setClassroom(sala);

        const horarios = await FetchByIdRoom(classroomId as string, request);

        const timesSet = new Set<string>();

        horarios[0].horarios.forEach((time: any) => {
          timesSet.add(time);
        });

        setAvailableTimes(Array.from(timesSet));
      } catch (err) {
        console.error("Erro ao buscar dados da sala:", err);
      }
    };
    fetchData();
  }, [classroomId]);

  useEffect(() => {
    const closeCalendar = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", closeCalendar);
    return () => document.removeEventListener("mousedown", closeCalendar);
  }, []);

  const handleRequestSubmit = async () => {
    if (
      !selectedDate ||
      selectedTimes.length === 0 ||
      !reason ||
      !classroomId
    ) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    try {
      await SendSolicitation(
        classroomId,
        selectedDate.toISOString(),
        reason,
        selectedTimes,
        request
      );

      alert("Solicitação enviada com sucesso!");
      navigate({
        pathname: "/",
      });
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm">Carregando salas...</p>
      </div>
    );

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">Erro ao carregar sala.</p>
    );
  if (!classroom) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 py-8">
      <Navbar />

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <img
          src="/src/assets/sala.jpeg"
          alt={classroom.nome}
          className="w-full h-56 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {classroom.nome}
          </h1>
          <p className="text-gray-500 mb-6">
            Capacidade: {classroom.capacidade}
          </p>

          <div ref={calendarRef} className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Selecione uma data
            </label>
            <div className="relative">
              <input
                readOnly
                value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
              {showCalendar && (
                <div className="absolute z-30 bg-white shadow-md border rounded-md mt-2 p-2">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setShowCalendar(false);
                    }}
                    disabled={{
                      before: new Date(),
                      after: new Date(
                        new Date().setDate(new Date().getDate() + 6)
                      ),
                      dayOfWeek: [0, 6],
                    }}
                    locale={ptBR}
                    styles={{
                      caption: { color: "#2563eb", fontWeight: "bold" },
                      day_selected: {
                        backgroundColor: "#2563eb",
                        color: "white",
                      },
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Motivo da Solicitação
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Descreva o motivo da solicitação"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableTimes.map((time: any) => (
              <button
                key={time.horarioSalaId}
                onClick={() => toggleTimeSelection(time.horarioSalaId)}
                className={`px-4 py-2 rounded-lg text-sm border transition duration-150 ${
                  selectedTimes.includes(time.horarioSalaId)
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {time.inicio} - {time.fim}
              </button>
            ))}
          </div>

          <button
            disabled={!selectedDate || selectedTimes.length === 0 || !reason}
            onClick={handleRequestSubmit}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Solicitar Reserva
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolicitationDetails;
