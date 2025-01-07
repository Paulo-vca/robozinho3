// import React, { createContext, useState, useContext } from 'react';

// interface AuthContextData {
//   user: string | null;
//   login: (username: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<string | null>(null);

//   const login = (username: string) => {
//     setUser(username);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// export default AuthProvider;
