import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { NoMatchingRoute } from './components/NoMatchingRoute';
import { ProtectedRoute } from './components/ProtectedRoute';
import { SignIn } from '../modules/signIn/SignIn';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { useUser } from '../integrations/user/hooks/useUser';

function Routing() {
  const { user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!user} redirectPath="/dashboard" />}>
          <Route path="/" element={<SignIn />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={Boolean(user)} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NoMatchingRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
