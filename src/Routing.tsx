import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignIn } from './main/modules/signIn/SignIn';
import { Dashboard } from './main/modules/dashboard/Dashboard';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
