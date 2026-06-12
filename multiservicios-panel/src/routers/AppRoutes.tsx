import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useLogin } from '../modules/login/login';
import LoginPage from '../pages/login/login';
import Dashboard from '../pages/dashboard/dashboard';
import MainLayout from '../components/layout/MainLayout';
import { RUTAS_CONFIG } from './rutasConfig';
import GeneralSettings from '../pages/settings/generalSettings';
import UnderConstruction from '../pages/construction/UnderConstruction';
import CategoryPage from '../pages/category/category';
import ProductPage from '../pages/products/products';
import UsuariosPage from '../pages/users/users';
import ImagenesPage from '../pages/images/image';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useLogin();
  const location = useLocation();
  if (!user) return <Navigate to="/" state={{ from: location }} replace />;
  return <>{children}</>;
}

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<RequireAuth><MainLayout><Dashboard /></MainLayout></RequireAuth>} />

        {RUTAS_CONFIG.map(group => (
          group.categorias.map(cat => (
            <Route
              key={cat.ruta}
              path={cat.ruta || '#'}
              element={(
                <RequireAuth>
                  <MainLayout>
                    {cat.ruta === '/configuracion' ? <GeneralSettings /> :
                     cat.ruta === '/catalogo/categorias' ? <CategoryPage /> :
                     cat.ruta === '/catalogo/productos' ? <ProductPage /> :
                     cat.ruta === '/catalogo/imagenes' ? <ImagenesPage /> :
                     cat.ruta === '/usuarios' ? <UsuariosPage /> :
                     <UnderConstruction title={cat.opcion} />}
                  </MainLayout>
                </RequireAuth>
              )}
            />
          ))
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
