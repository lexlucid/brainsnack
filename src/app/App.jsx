"use client" 

import React, { useState, useEffect } from 'react';
import { account, ID } from './lib/appwrite';
import { Dashboard } from '@/components/dashboard';
import { useRouter } from 'next/navigation';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await account.get();
        console.log('User data:', user);
        setLoggedInUser(user);
      } catch (error) {
        console.log('Auth error:', error);
        router.push('/login')
      }
    }
    checkUser()
  }, [])
 
  console.log('Current loggedInUser state:', loggedInUser);

  if (!loggedInUser) {
    return null
  }

  return <Dashboard />;
};

export default App;
