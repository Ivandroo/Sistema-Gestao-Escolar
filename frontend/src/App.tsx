import { Outlet } from "react-router-dom";
import Header from "./layouts/header";
import Sidebar from "./modules/aluno/components/sidebar";
import { AuthProvider, useAuth } from "./context/AuthContext";

function AppInner() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header />
      {isAuthenticated && <Sidebar />}
      <Outlet />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
