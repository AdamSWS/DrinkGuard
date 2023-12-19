import React, { useState } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { UserContext } from './components/UserContext';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null); 

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AppNavigator />
    </UserContext.Provider>
  );
}
