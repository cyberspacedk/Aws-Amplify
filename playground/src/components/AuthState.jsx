import React, {useState, useEffect} from 'react'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const AuthStateApp = ({children}) => {
  const [authState, setAuthState] = useState(); 
 
  const [user, setUser] = useState();

  useEffect(()=> {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    })
  }, []);

  const isAuthenticated = authState === AuthState.SignedIn && user;

  return isAuthenticated ? (
    <>
      {children}
      <AmplifySignOut />
    </>
  ): <AmplifyAuthenticator />
};

export default AuthStateApp;