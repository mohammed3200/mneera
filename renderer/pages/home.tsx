import React, { useState } from 'react'
import Login from './logoIn'
import Dashboard from './dashboard';

export default function HomePage() {
  const [IsSignIn, setIsSignIn] = useState(false);

  return (
    <>
      {IsSignIn ? <Dashboard /> : <Login setIsSignIn={setIsSignIn} />}
    </>
  )
}
