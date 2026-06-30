import { useState } from "react";
import { Link } from "react-router-dom";
import { Award, Bell, BellRing, Calendar, CreativeCommons, CreditCard, GraduationCap, Info, LayoutDashboard, User, UserCheck } from "lucide-react";

export default function AdminPage() {
  const [usuario] = useState(() => {
    try {
      const raw = localStorage.getItem("usuario");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const extraFields = Object.entries(usuario ?? {}).filter(
    ([key]) => !["id", "name", "email", "role"].includes(key),
  );

  if (!usuario) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Carregando perfil...</p>
      </div>
    );
  }
  return (
    <section>
      <header>
        <div className="header-container">
          <div className="header-content">
            <Link to="admin" className="logo">
              <GraduationCap size={30} />
            </Link>
            <div className="header-logo">
              <h1 className="header-title">IPOCET</h1>
              <h3 className="header-subtitle">
                Portal de gestão escolar
              </h3>
            </div>
          </div>
          <div className="header-content">
            <div className="notifications-bell">
              <button className="notifications-button">
                <Bell />
              </button>
            </div>
            <nav className="header-nav">
              <button className="button-user-header">
                <div className="nome-user-header">
                  {usuario.name}
                  {usuario.email}
                  {usuario.role}
                </div>
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <div className="side-bar-menu">
          <h2>Perfil de acesso</h2>
          <nav className="side-bar-menu-item">
              <button className="active">
                <LayoutDashboard size={20} />
                Painel
              </button>
              <button>
                <Calendar size={20} />
                Cronograma</button>
              <button>
                <BellRing size={20} />
                Notificações</button>
              <button>
                <Info size={20} />
                Diretrizes</button>
          </nav>
        </div>
        <div className="main-content">

          {/* Secção do perfil, parte de cima */}
          <div className="profile-div">
            <div className="profile-letter">
              <h1>{usuario.email.charAt(0)}</h1>
            </div>
            <div className="profile-content">
              <h1>{usuario.email}</h1>
              <p><h4>Nome: </h4>{usuario.nome}</p>
              <p><h4>Função:</h4>{usuario.role}</p>
            </div>
          </div>

          {/* Secção estatisticas da instituição */}
          <div className="estatistica-div">
            <div className="estatistica-box">
              <h3>Total de estudantes</h3>
              <span>
                <h2>5</h2>
                <div className="estatistica-icon icon-1">
                  <User size={28}/>
                </div>
                
              </span>
            </div>
            <div className="estatistica-box">
              <h3>Total de Docentes</h3>
              <span>
                <h2>5</h2>
                <div className="estatistica-icon icon-2">
                  <UserCheck size={25} />
                </div>
              </span>
            </div>
            <div className="estatistica-box">
              <h3>Total de Turmas</h3>
              <span>
                <h2>5</h2>
                <div className="estatistica-icon icon-3">
                  <Award size={28} />
                </div>
              </span>
            </div>
            <div className="estatistica-box">
              <h3>Total de Cursos</h3>
              <span>
                <h2>5</h2>
                <div className="estatistica-icon icon-4">
                  <CreditCard size={30} />
                </div>

              </span>
            </div>
          </div>

          {/* Secção de turmas administrador*/}
          <div className="turmas-conteiner">
            <div className="turmas-title">
              <span>
                <h2> Gestão de turmas ( Classes ) </h2>
                <p> Crie e configure as turmas pedagógicas de nível escolar</p>
              </span>
              <button>
                + Nova turma
              </button>
            </div>
            <div className="turmas-content">
              <div className="turmas-box">
                <span className="turmas-badge"> Período: Manhã </span>
                <h1 className="turmas-nome"> Turma: TI120A</h1>
                <span className="turmas-info"> Curso: <h4>Informática</h4></span>
                <span className="turmas-info"> Diretor: <h4>Aniceto Ferreira</h4></span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
