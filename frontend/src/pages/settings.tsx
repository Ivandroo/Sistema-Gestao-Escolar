import { useState } from "react";
import { ArrowLeft, Moon, Globe, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    theme: localStorage.getItem("theme") || "light",
    language: localStorage.getItem("language") || "pt",
    notifications: localStorage.getItem("notifications") === "true",
  });

  const handleToggle = (key: string) => {
    const newValue = key === "notifications" ? !settings.notifications : settings[key as keyof typeof settings];
    setSettings((prev) => ({ ...prev, [key]: newValue }));

    if (key === "theme") {
      localStorage.setItem("theme", newValue as string);
    } else if (key === "language") {
      localStorage.setItem("language", newValue as string);
    } else if (key === "notifications") {
      localStorage.setItem("notifications", String(newValue));
    }
  };

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

      <h1 style={{ color: "#0f3460", marginBottom: "30px" }}>Configurações</h1>

      <div
        style={{
          background: "#f5f5f5",
          border: "2px solid #e94560",
          borderRadius: "12px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "25px",
        }}
      >
        {/* Tema */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Moon size={24} color="#e94560" />
            <div>
              <p
                style={{
                  margin: "0",
                  color: "#666",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Tema Escuro
              </p>
              <p style={{ margin: "0", color: "#999", fontSize: "0.85rem" }}>
                Ativa modo escuro da interface
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.theme === "dark"}
            onChange={() => handleToggle("theme")}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "0" }} />

        {/* Idioma */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Globe size={24} color="#e94560" />
            <div>
              <p
                style={{
                  margin: "0",
                  color: "#666",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Idioma
              </p>
              <p style={{ margin: "0", color: "#999", fontSize: "0.85rem" }}>
                Português (PT)
              </p>
            </div>
          </div>
          <select
            value={settings.language}
            onChange={(e) => {
              setSettings((prev) => ({ ...prev, language: e.target.value }));
              localStorage.setItem("language", e.target.value);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              cursor: "pointer",
              background: "white",
            }}
          >
            <option value="pt">Português</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #ddd", margin: "0" }} />

        {/* Notificações */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Bell size={24} color="#e94560" />
            <div>
              <p
                style={{
                  margin: "0",
                  color: "#666",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                }}
              >
                Notificações
              </p>
              <p style={{ margin: "0", color: "#999", fontSize: "0.85rem" }}>
                Receba alertas do sistema
              </p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={() => handleToggle("notifications")}
            style={{ width: "20px", height: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
}
