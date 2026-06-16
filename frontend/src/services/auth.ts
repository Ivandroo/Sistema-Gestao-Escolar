import { AuthLogin } from "../types/auth.type";

const API_URL = "http://localhost:3001/api";

export interface AuthResponse {
  message: string;
  token: string;
  usuario: {
    id: number;
    email: string;
    role: string;
  };
}

export const authService = {

  async login(data: AuthLogin): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.error || result.message || "Erro ao autenticar";
      throw new Error(errorMessage);
    }

    // salvar token e usuário no localStorage
    if (result.token) {
      localStorage.setItem("token", result.token);
    }
    if (result.usuario) {
      // garante que o role esteja em maiúsculas para roteamento consistente
      if (result.usuario.role) {
        result.usuario.role = String(result.usuario.role).toUpperCase();
      }
      localStorage.setItem("usuario", JSON.stringify(result.usuario));
    }

    return result as AuthResponse;
  },
};
