"use client" 

import React, { useState, useEffect } from 'react';
import { UserProvider } from '@/app/lib/context/user';
import Dashboard from './dashboard/page';
import { LoginForm } from '@/components/LoginForm';

function App() {
  const isLoginPage = window.location.pathname === "/login";

  return (
    <div>
      <UserProvider>
        <main>{isLoginPage ? <LoginForm/> : <Dashboard />}</main>
      </UserProvider>
    </div>
  );
}

export default App;
