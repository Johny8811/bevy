import React from 'react';
import { Link } from 'react-router-dom';

export function SignIn() {
  return (
    <div>
      Sign In
      <Link to="/dashboard">dashboard</Link>
    </div>
  );
}
