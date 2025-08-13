import React, { useState } from 'react';

export default function ScoreForm({ onSave }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [distance, setDistance] = useState('');
  const [score, setScore] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance || !score) return;
    onSave({ date, distance, score: parseInt(score, 10), notes });
    setDistance('');
    setScore('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow w-full max-w-md mb-6">
      <h2 className="text-lg font-bold mb-4">Log Score</h2>
      <label className="block mb-2">Date</label>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-2 rounded w-full mb-2" required />
      <label className="block mb-2">Distance (yards/meters)</label>
      <input type="text" value={distance} onChange={e => setDistance(e.target.value)} className="border p-2 rounded w-full mb-2" required />
      <label className="block mb-2">Score</label>
      <input type="number" value={score} onChange={e => setScore(e.target.value)} className="border p-2 rounded w-full mb-2" required />
      <label className="block mb-2">Notes (optional)</label>
      <textarea value={notes} onChange={e => setNotes(e.target.value)} className="border p-2 rounded w-full mb-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Save Score</button>
    </form>
  );
}
