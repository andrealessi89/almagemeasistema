import { useState } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import PlayersProvider from './store/PlayersContext';

function App() {
  return (
    <div className="app">
      <PlayersProvider>
        <ToastContainer />
        <AppRoutes />
      </PlayersProvider>
    </div>
  )
}

export default App
