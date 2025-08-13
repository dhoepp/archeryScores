import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import ScoreForm from './components/ScoreForm';
import ScoreList from './components/ScoreList';

function Dashboard() {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(user?.email);
  const [allUsers, setAllUsers] = useState(() => {
    // Get all users from localStorage (mock)
    const keys = Object.keys(localStorage).filter(k => k.startsWith('scores_'));
    return keys.map(k => k.replace('scores_', ''));
  });
  const isAdmin = user?.role === 'admin';

  // Load scores for selected user
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem(`scores_${selectedUser}`);
    return saved ? JSON.parse(saved) : [];
  });

  React.useEffect(() => {
    const saved = localStorage.getItem(`scores_${selectedUser}`);
    setScores(saved ? JSON.parse(saved) : []);
  }, [selectedUser]);

  const handleSaveScore = (score) => {
    const updated = [score, ...scores];
    setScores(updated);
    localStorage.setItem(`scores_${selectedUser}`, JSON.stringify(updated));
    if (!allUsers.includes(selectedUser)) {
      setAllUsers([...allUsers, selectedUser]);
    }
  };

  const handleEditScore = (idx, updatedScore) => {
    const updated = scores.map((s, i) => (i === idx ? updatedScore : s));
    setScores(updated);
    localStorage.setItem(`scores_${selectedUser}`, JSON.stringify(updated));
  };

  const handleDeleteScore = (idx) => {
    const updated = scores.filter((_, i) => i !== idx);
    setScores(updated);
    localStorage.setItem(`scores_${selectedUser}`, JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user?.email || 'User'} ({user?.role})</h1>
      {isAdmin && (
        <div className="mb-4 w-full max-w-md">
          <label className="block mb-2">Select User</label>
          <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} className="border p-2 rounded w-full mb-2">
            {allUsers.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
            {!allUsers.includes(user.email) && <option value={user.email}>{user.email}</option>}
          </select>
        </div>
      )}
      <ScoreForm onSave={handleSaveScore} />
      <div className="w-full max-w-md">
        <h2 className="text-lg font-bold mb-2">Logged Scores {isAdmin ? `for ${selectedUser}` : ''}</h2>
        {scores.length === 0 ? (
          <p className="text-gray-500">No scores logged yet.</p>
        ) : (
          <ScoreList scores={scores} onEdit={handleEditScore} onDelete={handleDeleteScore} />
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
