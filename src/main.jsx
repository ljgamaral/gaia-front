import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import Result from './pages/Result.jsx'
import Analyzes from './pages/Analyzes.jsx'
import Training from './pages/Training.jsx'
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="bottom-center" />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/result" element={<Result />} />
          <Route path="/analyzes" element={<Analyzes />} />
          <Route path="/training" element={<Training />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
