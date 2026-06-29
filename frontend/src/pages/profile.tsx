import { useState } from "react";
import { ArrowLeft, User, Mail, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(() => {
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
    <section style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#e94560",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "20px",
          fontSize: "1rem",
          fontWeight: "600",
        }}
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <h1 style={{ color: "#0f3460", marginBottom: "30px" }}>Meu Perfil</h1>

      <div
        style={{
          background: "#f5f5f5",
          border: "2px solid #e94560",
          borderRadius: "12px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <User size={24} color="#e94560" />
          <div>
            <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
              ID do Usuário
            </p>
            <p style={{ margin: "0", fontSize: "1.2rem", fontWeight: "bold" }}>
              {usuario.id}
            </p>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Mail size={24} color="#e94560" />
          <div>
            <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
              Email
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "1.2rem",
                fontWeight: "bold",
                wordBreak: "break-all",
              }}
            >
              {usuario.email}
            </p>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "0" }} />

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Shield size={24} color="#e94560" />
          <div>
            <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
              Função
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#e94560",
                textTransform: "uppercase",
              }}
            >
              {usuario.role}
            </p>
          </div>
        </div>

        {extraFields.map(([key, value]) => (
          <div key={key} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Shield size={24} color="#e94560" />
            <div>
              <p style={{ margin: "0", color: "#666", fontSize: "0.9rem" }}>
                {key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
              <p style={{ margin: "0", fontSize: "1.1rem", fontWeight: "bold" }}>
                {String(value)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
