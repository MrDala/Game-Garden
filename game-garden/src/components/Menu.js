import React from "react";
import logo from "../img/logo.png"

function Menu() {
  const user = sessionStorage.getItem("user");

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  function handleImageLoadError(event) {
    console.error("Failed to load image:", event.target.src);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand col-1 d-flex flex-column" href={user ? "/wishlist" : "/login"}>
          <img src={logo} alt="Game Garden" className="navbar-brand me-2 img-fluid" onError={handleImageLoadError} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {user ? (
          <div className="collapse navbar-collapse d-flex justify-content-between align-items-center" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/boutique">
                  Boutique
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/wishlist">
                  Wishlist
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/profil">
                  Mon profil
                </a>
              </li>
            </ul>
            <button className="btn btn-outline-light" onClick={handleLogout}>
              Se déconnecter
            </button>
          </div>
        ) : (
          <div className="collapse navbar-collapse d-flex justify-content-end align-items-center" id="navbarNav">
            <button className="btn btn-outline-light" onClick={() => window.location.href = "/login"}>
              Se connecter
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Menu;
