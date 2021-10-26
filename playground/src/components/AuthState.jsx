import React, {useState, useEffect} from 'react'
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';

const AuthStateApp = ({children}) => {
  const [authState, setAuthState] = useState();
  console.log("🚀 ~ file: AuthState.jsx ~ line 7 ~ AuthStateApp ~ authState", authState)
  const [user, setUser] = useState();
  console.log("🚀 ~ file: AuthState.jsx ~ line 9 ~ AuthStateApp ~ user", user)

  useEffect(()=> {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    })
  }, []);

  const isAuthenticated = AuthState.SignedIn && user;

  return isAuthenticated ? (
    <>
      {children}
      <AmplifySignOut />
    </>
  ): <AmplifyAuthenticator />
};

export default AuthStateApp;