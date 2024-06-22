import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {createContext, useState, useEffect} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;
        setUserId(userId);
        setToken(token);
      }
    };

    getToken();
  }, []);
  return (
    <AuthContext.Provider value={{token, userId, setUserId, setToken}}>
      {children}
    </AuthContext.Provider>
  );
};
