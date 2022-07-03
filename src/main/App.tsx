import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      Main page
      <nav
        style={{
          borderBottom: 'solid 1px',
          paddingBottom: '1rem'
        }}>
        <Link to="/invoices">Sign In</Link>
        <Link to="/expenses">Logged user</Link>
      </nav>
    </div>
  );
}

export default App;
