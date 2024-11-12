import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsPage from './pages/NewsPage';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/top" replace />} />
          <Route path="/:category" element={<NewsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}