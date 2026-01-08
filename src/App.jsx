import { Route, Routes } from 'react-router-dom';
import { PublicNav } from './components/PublicNav';
import { UserNav } from './components/UserNav';
import { AdminNav } from './components/AdminNav';
import { useTalleres } from './hooks/useTalleres';
import { TodosTalleresPage } from './pages/TodosTalleresPage';
import { AdminPanelPages } from './pages/AdminPanelPages';  
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { HomeContentAdmin } from './pages/HomeContentAdmin';
import { VerTaller } from './pages/VerTaller';
import { AdminUsuarios } from './pages/AdminUsuarios';

function App() {
  const { loading, error } = useTalleres();

  if (loading) return <div className="loading-screen">Cargando app...</div>;
  if (error) return <div className="loading-screen">Error: {error}</div>;

  return (
    <Routes>
      <Route path="/" element={<PublicNav />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="talleres" element={<TodosTalleresPage />} />
        <Route path="talleres/:id" element={<VerTaller />} />
      </Route>

      <Route path="/user" element={<UserNav />}>
      
      </Route>

      <Route path="/admin" element={<AdminNav />}>
        <Route index element={<AdminDashboard />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="home" element={<HomeContentAdmin />} />
        <Route path="talleres" element={<AdminPanelPages />} />
      </Route>

      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
