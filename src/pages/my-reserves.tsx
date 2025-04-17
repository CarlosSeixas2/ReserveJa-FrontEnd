import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import Navbar from "../components/navbar";
import { useAuth } from "../context/auth-context";
import { FetchReserveById } from "../api/api";
import { useApi } from "../hook/useApi";

const Myreserves = () => {
  const { user } = useAuth();
  const { request } = useApi();
  const [reserves, setReserves] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id) {
        const userReserves = await FetchReserveById(user.id, request);
        setReserves(userReserves || []);
        console.log(userReserves);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br px-4 py-8">
      <Box sx={{ minHeight: "100vh" }}>
        <Navbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: { xs: 2, md: 4 },
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 600,
              color: "#333",
              marginTop: 4,
              marginBottom: 2,
            }}
          >
            Minhas Reservas
          </Typography>

          <TableContainer
            component={Paper}
            elevation={3}
            sx={{
              maxWidth: "900px",
              width: "100%",
              borderRadius: 3,
              overflowX: "auto",
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f0f2f5" }}>
                  {["Usuário", "Cargo", "Sala", "Data", "Horário"].map(
                    (header) => (
                      <TableCell
                        key={header}
                        sx={{
                          fontWeight: "bold",
                          color: "#444",
                          fontSize: "1rem",
                        }}
                      >
                        {header}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {reserves.map((reserva) => (
                  <TableRow key={reserva.id} hover>
                    <TableCell>
                      {reserva.reserva?.usuario?.nome || "—"}
                    </TableCell>
                    <TableCell>
                      {reserva.reserva?.usuario?.tipo || "—"}
                    </TableCell>
                    <TableCell>{reserva.reserva?.sala?.nome || "—"}</TableCell>
                    <TableCell>
                      {new Date(reserva.reserva?.criadoEm).toLocaleDateString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell>
                      {reserva.horarioSala?.horario
                        ? `${reserva.horarioSala.horario.inicio} - ${reserva.horarioSala.horario.fim}`
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))}
                {reserves.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      Nenhuma reserva encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default Myreserves;
