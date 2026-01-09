import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { PublicNav } from './components/PublicNav';
import { UserNav } from './components/UserNav';
import { AdminNav } from './components/AdminNav';
import { useAuthContext } from './contexts/AuthContext';
import { TodosTalleresPage } from './pages/TodosTalleresPage';
import { AdminPanelPages } from './pages/AdminPanelPages';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { HomeContentAdmin } from './pages/HomeContentAdmin';
import { VerTaller } from './pages/VerTaller';
import { AdminUsuarios } from './pages/AdminUsuarios';
import { MisTalleres } from './pages/MisTalleres';

function App() {
  const { usuario, cargando } = useAuthContext();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<PublicNav />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="talleres" element={<TodosTalleresPage />} />
        <Route path="talleres/:id" element={<VerTaller />} />
      </Route>

      <Route
        path="/user"
        element={usuario ? <UserNav /> : <Navigate to="/login" replace />}
      >
        <Route index element={<MisTalleres />} />
        <Route path="home" element={<HomePage />} />
        <Route path="talleres" element={<TodosTalleresPage />} />
        <Route path="talleres/:id" element={<VerTaller />} />
      </Route>

      <Route
        path="/admin"
        element={
          usuario?.role === 'admin' ? <AdminNav /> : <Navigate to="/" replace />
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="home" element={<HomeContentAdmin />} />
        <Route path="talleres" element={<AdminPanelPages />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;