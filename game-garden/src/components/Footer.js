import React from 'react';

function Footer() {
  const year = "2022 - 2023";
  const members = ['Alexis LEON', 'Ita MAKNINE', 'Naël MEZOUAR'];
  const projectName = 'Game Garden Projet Programmation Avancée et Application';
  const schoolName = 'Université de Paris';

  return (
    <footer className="bg-dark text-white py-4 mt-3">
      <div className="container text-center">
        <div className="text-muted">{projectName} - {year} - {schoolName}</div>
        <div className="mt-2">{members.join(' | ')}</div>
      </div>
    </footer>
  );
}

export default Footer;
