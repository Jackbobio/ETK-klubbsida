import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthButtons = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    const isLocalhost = window.location.origin === "http://localhost:5173";
    const returnTo = isLocalhost
      ? "http://localhost:5173"
      : "https://madebyjakob.github.io/ETK-klubbsida";

    console.log(window.location.origin)
    return (
      <>
        {!isAuthenticated && (
          <button className="bg-jakob p-2 cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => loginWithRedirect()}>Logga In</button>
        )}
        {isAuthenticated && (
          <button className="bg-jakob p-2 cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => logout({ logoutParams: { returnTo: returnTo } })}>
            Logga Ut
          </button>
        )}
      </>
    );
  };