import React from 'react';
import Footer from './Footer';
import Menu from './Menu';

const Body = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Body;
