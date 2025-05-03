import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const AuthButtons = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  
    return (
      <>
        {!isAuthenticated && (
          <button class="bg-jakob p-2 cursor-pointer" onClick={() => loginWithRedirect()}>Logga In</button>
        )}
        {isAuthenticated && (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Logga Ut
          </button>
        )}
      </>
    );
  };