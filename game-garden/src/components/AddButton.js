import React from 'react';

function AddButton({ gameId, onAdd }) {
  async function handleClick() {
    await onAdd(gameId);
  }

  return (
    <button className="btn btn-outline-secondary rounded-pill" onClick={handleClick}>
      Ajouter
    </button>
  );
}

export default AddButton;
