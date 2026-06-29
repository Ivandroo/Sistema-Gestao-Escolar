import { useState, FormEvent } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const result = await authService.login({ email, senha: password });
      // atualiza o estado de autenticação global
      loginUser(result.usuario, result.token);

      const role = (result.usuario?.role || "").toString().toUpperCase();

      const redirectByRole: Record<string, string> = {
        ALUNOS: "/aluno",
        RESPONSAVEL: "/responsavel",
        PROFESSORES: "/professor",
        ADMINISTRADORES: "/admin",
      };

      const destination = redirectByRole[role] || "/";
      navigate(destination);
    } catch (err: any) {
      setError(err?.message || "Falha ao fazer login");
    }
  };
  
  return (
    <section className="register-container">
      <div className="register-content">
        <div className="register-upper">
          <h2>Acessar o portal</h2>
          <p>Coloque suas credenciaias e acesse o Portal.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login-form">
            <div className="register-form-box">
              <label htmlFor="" className="register-box-title">
                Email de Usuário
              </label>
              <div className="register-box-input">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: ManuelJunqx67@gmail.com"
                  required
                  className="register-input"
                />
              </div>
            </div>

            <div className="register-form-box">
              <label htmlFor="" className="register-box-title">
                Palavra passe
              </label>
              <div className="register-box-input">
                <Lock className="input-icon" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*****"
                  required
                  className="register-input"
                />
              </div>
            </div>
          </div>

          <div className="register-form-box">
            <input
              type="checkbox"
              defaultChecked
              id="remember-me"
              className="checkbox-input"
            />
            <label htmlFor="remember-me" className="remember-label">
              {" "}
              Manter-me conectado{" "}
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}
          
          <button type="submit" className="register-confirm-button">
            Entrar <ArrowRight size={14} />
          </button>
        </form>
      </div>

      <p className="register-login-button">
        Ainda não tem uma conta? <a href="#/registar"> Fazer Cadastro </a>
      </p>
    </section>
  );
}
