import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, User, Settings, LogOut, Home } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const usuario = user;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Botão de menu */}
      <button
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para fechar menu ao clicar fora */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <button
            className="sidebar-item"
            onClick={() => handleNavigation("/")}
          >
            <Home size={20} />
            <span>Início</span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => handleNavigation("/profile")}
          >
            <User size={20} />
            <span>Meu Perfil</span>
          </button>

          <button
            className="sidebar-item"
            onClick={() => handleNavigation("/settings")}
          >
            <Settings size={20} />
            <span>Configurações</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          {usuario && (
            <div className="user-info">
              <p className="user-email">{usuario.email}</p>
              <p className="user-role">{usuario.role}</p>
            </div>
          )}
          <button className="sidebar-logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
    </>
  );
}
