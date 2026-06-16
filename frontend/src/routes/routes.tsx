import App from "../App";
import Casa from "../pages/casa";
import Login from "../pages/login";
import Registar from "../pages/registar";
import ProfilePage from "../pages/profile";
import SettingsPage from "../pages/settings";
import AdminPage from "../pages/admin";
import AlunoPage from "../modules/aluno/pages/aluno";
import ProfessorPage from "../pages/professor";
import ResponsavelPage from "../pages/responsavel";

import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

export default function Rotas() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Casa />} />
          <Route path="login" element={<Login />} />
          <Route path="registar" element={<Registar />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["administradores"]}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="aluno"
            element={
              <ProtectedRoute allowedRoles={["alunos"]}>
                <AlunoPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="professor"
            element={
              <ProtectedRoute allowedRoles={["professores"]}>
                <ProfessorPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="responsavel"
            element={
              <ProtectedRoute allowedRoles={["responsavel"]}>
                <ResponsavelPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Casa />} />
      </Routes>
    </HashRouter>
  );
}
