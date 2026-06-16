import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { isAuthenticated } = useAuth();

  // Esconder header quando logado
  if (isAuthenticated) {
    return null;
  }

  return (
    <header>
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            <GraduationCap size={30} />
          </Link>
          <div className="header-logo">
            <h1 className="header-title">IPOCET</h1>
            <h3 className="header-subtitle">
              Instituto Politécnico Privado de Ciências e Tecnologias
            </h3>
          </div>
        </div>
        <div className="header-content">
          <nav className="header-nav">
            <ul className="header-ul">
              <li>
                <Link to="login">Entrar no Portal</Link>
              </li>
              <li className="criar-conta">
                <Link to="registar">Criar Conta</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
