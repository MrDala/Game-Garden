import React, { useState } from "react";
import { apiUsers } from "../lib/ApiUsers";
import { useNavigate } from 'react-router-dom';
import Body from "../components/Body";
import Titre from "../components/Titre";

function Login() {
  const navigate = useNavigate();
    // État local pour stocker les erreurs et les champs de l'utilisateur
    const [error, setError] = useState("");
    const [user, setUser] = useState({
      email: ""
    });
  
    /**
     * Gestionnaire d'événements pour la modification des champs de l'utilisateur
     * @param {Object} event - Événement de modification d'un champ
     */
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    };
  
    /**
     * Gestionnaire d'événements pour la soumission du formulaire de connexion
     * @param {Object} event - Événement de soumission de formulaire
     */
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Vérifier que l'email est rempli
      if (!user.email) {
        setError("Veuillez entrer votre adresse email.");
        return;
      }
  
      try {
        // Vérifier si l'utilisateur existe
        const users = await apiUsers.getUser(user.email);
        if (users.length > 0) {
          const user = users[0];
          sessionStorage.setItem('user', JSON.stringify(user)); // Stocker l'utilisateur dans la session storage
          navigate('/Wishlist'); // Effectuer la redirection
        } else {
          setError("Utilisateur inconnu");
        }
      } catch (error) {
        setError("Erreur lors de la connexion");
      }
    };

  return (
    <div className="container-nav">
      <Body>
        <Titre titre={"Connexion"} />
        <div className="w-50 mx-auto container">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse mail :</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="text-center">
              <button type="submit" className="btn btn-secondary me-4">
                Se connecter
              </button>
              <button onClick={() => navigate('/Inscription')} className="btn btn-outline-secondary">
                S'inscrire
              </button>
            </div>
          </form>
        </div>
      </Body>
    </div>
  );
}

export default Login;
