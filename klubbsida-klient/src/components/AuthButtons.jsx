import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthButtons = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

    console.log(window.location.origin)
    return (
      <>
        {!isAuthenticated && (
          <button className="bg-jakob p-2 cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => loginWithRedirect()}>Logga In</button>
        )}
        {isAuthenticated && (
          <button className="bg-jakob p-2 cursor-pointer transition-transform duration-200 hover:scale-105" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logga Ut
          </button>
        )}
      </>
    );
  };