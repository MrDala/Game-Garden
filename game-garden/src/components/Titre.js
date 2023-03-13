import React from 'react';

function Titre({ titre }) {
  return (
    <h1 className="mb-3 fw-bold text-center text-uppercase mt-2">
      {titre}
    </h1>
  );
}

export default Titre;
