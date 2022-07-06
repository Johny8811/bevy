import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from '../modules/signIn/SignIn';
import { Dashboard } from '../modules/dashboard/Dashboard';

import { NoMatchingRoute } from './components/NoMatchingRoute';
import { TEST_USER } from '../../types/User';
import { ProtectedRoute } from './components/ProtectedRoute';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<ProtectedRoute isAllowed={!!TEST_USER} />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NoMatchingRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
