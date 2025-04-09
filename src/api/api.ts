import { useApi } from "../hook/useApi";

export const URL_BASE = import.meta.env.VITE_URL_BASE;

export const FetchLogin = async (
  email: string,
  password: string,
  request: ReturnType<typeof useApi>["request"]
) => {
  try {
    const data = await request(`${URL_BASE}/user/login`, {
      method: "POST",
      body: {
        email,
        password,
      },
    });

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    console.log(data);

    return data;
  } catch (error) {
    console.log("Erro ao fazer login:", error);
  }
};

export const FetchRegister = async (
  name: string,
  email: string,
  password: string,
  role: string,
  request: ReturnType<typeof useApi>["request"]
) => {
  try {
    const data = await request(`${URL_BASE}/user/`, {
      method: "POST",
      body: {
        name,
        email,
        password,
        type: role,
      },
    });

    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.log("Erro ao fazer cadastro:", error);
  }
};

export const FetchClassrooms = async (
  request: ReturnType<typeof useApi>["request"]
) => {
  try {
    const data = await request(`${URL_BASE}/room/`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    console.log("Erro ao buscar salas:", error);
  }
};

export const FetchClassroomById = async (
  id: string,
  request: ReturnType<typeof useApi>["request"]
) => {
  try {
    const data = await request(`${URL_BASE}/room/${id}`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return data;
  } catch (error) {
    console.log("Erro ao buscar sala:", error);
  }
};

export const FetchCurrentUser = async (
  request: ReturnType<typeof useApi>["request"]
) => {
  try {
    const data = await request(`${URL_BASE}/user/profile`, {
      method: "GET",
      headers: {
        authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    return data;
  } catch (error) {
    console.log("Erro ao buscar usuário:", error);
  }
};
