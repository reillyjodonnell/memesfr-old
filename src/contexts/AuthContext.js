import React from "react";

const AuthContext = React.createContext();

export function signIn(username, password) {}
export function signUp(username, password) {}

export default function AuthContext({ children }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}
