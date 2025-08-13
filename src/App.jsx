import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ScoreForm from './components/ScoreForm';

function Dashboard() {
  const { user } = useAuth();
  const [scores, setScores] = useState([]);

  const handleSaveScore = (score) => {
    setScores(prev => [score, ...prev]);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user?.email || 'User'}!</h1>
      <ScoreForm onSave={handleSaveScore} />
      <div className="w-full max-w-md">
        <h2 className="text-lg font-bold mb-2">Logged Scores</h2>
        {scores.length === 0 ? (
          <p className="text-gray-500">No scores logged yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {scores.map((score, idx) => (
              <li key={idx} className="py-2">
                <div className="flex justify-between">
                  <span>{score.date} - {score.distance} - <span className="font-bold">{score.score}</span></span>
                  {score.notes && <span className="text-gray-400 ml-2">{score.notes}</span>}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center mt-20">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
