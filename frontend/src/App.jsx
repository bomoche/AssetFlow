import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated } from './hooks/useAuth';
import ROUTES    from './constants/routes';
import TopBar    from './components/layout/TopBar';
import Sidebar   from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import Footer    from './components/layout/Footer';
import Login     from './pages/Login';
import SignUp    from './pages/SignUp';
import Portfolio from './pages/Portfolio';
import Withdraw  from './pages/Withdraw';
import History   from './pages/History';

function ProtectedRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to={ROUTES.LOGIN} replace />;
}

function AppShell({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-body-md">
      <TopBar />
      <div className="flex flex-1 max-w-container-max mx-auto w-full">
        <Sidebar />
        <main className="flex-1 md:ml-72 p-margin-mobile md:p-margin-desktop bg-background min-h-screen">
          {children}
        </main>
      </div>
      <Footer />
      <BottomNav />
      <div className="h-28 md:hidden" />
    </div>
  );
}

// Separate component so we can use useNavigate inside BrowserRouter
function AppRoutes() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const [portfolioKey, setPortfolioKey] = useState(0);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    navigate(ROUTES.WITHDRAW);
  }

  function handleWithdrawSuccess() {
    setPortfolioKey(k => k + 1);
  }

  return (
    <Routes>
      <Route path={ROUTES.LOGIN}  element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<SignUp />} />

      <Route path={ROUTES.PORTFOLIO} element={
        <ProtectedRoute>
          <AppShell>
            <Portfolio 
              key={portfolioKey}
              onSelectProduct={handleSelectProduct} 
            />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.WITHDRAW} element={
        <ProtectedRoute>
          <AppShell>
            <Withdraw 
              selectedProduct={selectedProduct}
              onWithdrawSuccess={handleWithdrawSuccess}
            />
          </AppShell>
        </ProtectedRoute>
      } />
      <Route path={ROUTES.HISTORY} element={
        <ProtectedRoute>
          <AppShell>
            <History />
          </AppShell>
        </ProtectedRoute>
      } />

      <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}