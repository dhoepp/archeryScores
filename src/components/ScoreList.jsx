import React, { useState } from 'react';

export default function ScoreList({ scores, onEdit, onDelete }) {
  const [editIdx, setEditIdx] = useState(null);
  const [editScore, setEditScore] = useState({});

  const startEdit = (idx) => {
    setEditIdx(idx);
    setEditScore(scores[idx]);
  };

  const handleEditChange = (e) => {
    setEditScore({ ...editScore, [e.target.name]: e.target.value });
  };

  const saveEdit = () => {
    onEdit(editIdx, {
      ...editScore,
      score: parseInt(editScore.score, 10),
    });
    setEditIdx(null);
    setEditScore({});
  };

  return (
    <ul className="divide-y divide-gray-200">
      {scores.map((score, idx) => (
        <li key={idx} className="py-2 flex flex-col">
          {editIdx === idx ? (
            <div className="space-y-2">
              <input name="date" type="date" value={editScore.date} onChange={handleEditChange} className="border p-1 rounded w-full" />
              <input name="distance" type="text" value={editScore.distance} onChange={handleEditChange} className="border p-1 rounded w-full" />
              <input name="score" type="number" value={editScore.score} onChange={handleEditChange} className="border p-1 rounded w-full" />
              <textarea name="notes" value={editScore.notes} onChange={handleEditChange} className="border p-1 rounded w-full" />
              <div className="flex gap-2">
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={saveEdit}>Save</button>
                <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setEditIdx(null)}>Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <span>{score.date} - {score.distance} - <span className="font-bold">{score.score}</span> {score.notes && <span className="text-gray-400 ml-2">{score.notes}</span>}</span>
              <div className="flex gap-2">
                <button className="text-blue-600 underline" onClick={() => startEdit(idx)}>Edit</button>
                <button className="text-red-600 underline" onClick={() => onDelete(idx)}>Delete</button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
