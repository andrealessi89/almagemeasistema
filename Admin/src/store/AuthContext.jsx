import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
);