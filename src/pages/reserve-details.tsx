/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useApi } from "../hook/useApi";
import { FetchClassroomById } from "../api/api";
import { SalasProps } from "../interfaces";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Navbar from "../components/navbar";

const availableTimes = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

const ReserveDetails = () => {
  const { classroomId } = useParams();
  const { error, loading, request } = useApi();
  const [classroom, setClassroom] = useState<SalasProps | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const toggleTimeSelection = (time: string) => {
    setSelectedTimes(
      (prevTimes) =>
        prevTimes.includes(time)
          ? prevTimes.filter((t) => t !== time) // remove
          : [...prevTimes, time] // adiciona
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FetchClassroomById(
          classroomId as string,
          request
        );
        if (response) setClassroom(response);
      } catch (error) {
        console.error("Erro ao buscar dados da sala:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading)
    return <p className="text-center text-gray-600">Carregando sala...</p>;
  if (error)
    return (
      <p className="text-center text-red-600">
        Ocorreu um erro ao buscar os dados da sala.
      </p>
    );
  if (!classroom) return null;

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-6">
      <Navbar />

      <div className="w-full max-w-screen flex justify-center items-center">
        <div className="w-full max-w-screen-md p-8 relative">
          <img
            src="/src/assets/sala.jpeg"
            alt={classroom.nome}
            className="w-full h-56 object-cover rounded-lg mb-6"
          />

          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            {classroom.nome}
          </h1>
          <p className="text-gray-500 mb-6">
            Capacidade: {classroom.capacidade}
          </p>

          <div className="mb-6 relative" ref={calendarRef}>
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Selecione uma data
            </h2>
            <input
              type="text"
              readOnly
              value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md cursor-pointer focus:outline-none"
            />

            {showCalendar && (
              <div className="absolute z-20 bg-white mt-2 p-2 border rounded-md shadow-lg">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}
                  locale={ptBR}
                  styles={{
                    caption: { color: "#1e3a8a", fontWeight: "bold" },
                    day_selected: { backgroundColor: "#2563eb", color: "#fff" },
                  }}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">
              Horários disponíveis
            </h2>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <li key={time}>
                  <button
                    onClick={() => toggleTimeSelection(time)}
                    className={`w-full px-4 py-2 rounded-md text-sm border transition ${
                      selectedTimes.includes(time)
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {time}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() =>
              alert(
                `Reservado para ${format(
                  selectedDate!,
                  "dd/MM/yyyy"
                )} nos horários:\n${selectedTimes.join(", ")}`
              )
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-medium transition disabled:opacity-50"
            disabled={!selectedDate || selectedTimes.length === 0}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReserveDetails;
