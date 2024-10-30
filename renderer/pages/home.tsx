import React, { useState } from 'react'
import Login from './logoIn'
import Dashboard from './dashboard';
import { RootLayout } from '../components/AppLayout';

export default function HomePage() {
  const [IsSignIn, setIsSignIn] = useState(false);
  return (
    <RootLayout>
      {
        IsSignIn ? (<Dashboard setIsSignIn={setIsSignIn} />) : (<Login setIsSignIn={setIsSignIn} />)
      }
    </RootLayout>
  )
}
