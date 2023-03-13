import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUsers } from "../lib/ApiUsers";
import Titre from "../components/Titre";
import Body from "../components/Body";

function Profil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const fields = [
    { label: "Email", name: "email", type: "email" },
    { label: "Nom d'utilisateur", name: "username", type: "text" },
    { label: "Prénom", name: "firstname", type: "text" },
    { label: "Nom de famille", name: "lastname", type: "text" },
    { label: "Date de naissance", name: "birthdate", type: "date" },
  ];


  /**
   * Fonction appelée à chaque modification d'un champ
   * Met à jour l'état de l'utilisateur avec les nouvelles valeurs
   * @param {Object} event - L'événement onChange de l'input
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  /**
   * Fonction appelée à la soumission du formulaire de modification du profil
   * Appelle l'API pour mettre à jour l'utilisateur et enregistre l'utilisateur dans la session storage
   * @param {Object} event - L'événement onSubmit du formulaire
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    await apiUsers.updateUser(user);

    setEditMode(false);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  /**
  * Fonction appelée à l'annulation de la modification du profil
  * Passe en mode affichage et annule les modifications
  */
  const handleCancel = () => {
    setEditMode(false);
  };

  /**
   * Fonction appelée pour passer en mode modification
   * Passe en mode modification
   */
  const handleEdit = () => {
    setEditMode(true);
  };

  /**
   * Effet pour charger l'utilisateur à partir de la session storage
   * Redirige vers la page d'accueil si l'utilisateur n'est pas connecté
   */
  useEffect(() => {
    const userFromSession = JSON.parse(sessionStorage.getItem("user"));
    if (!userFromSession) {
      navigate("/");
    } else {
      setUser(userFromSession);
    }
  }, [navigate]);

  // Si l'utilisateur n'est pas chargé, on retourne null
  if (!user) {
    return null;
  }

  return (
    <div className="container-nav">
      <Body>
        <Titre titre={"Mon profil"} />
        <form onSubmit={handleSubmit} className="w-50 mx-auto container">
          {fields.map((field) => (
            <div className="mb-3" key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={user[field.name]}
                onChange={handleInputChange}
                disabled={!editMode}
                className="form-control"
              />
            </div>
          ))}
          {editMode ? (
            <div>
              <button type="submit" className="btn btn-secondary me-4">
                Valider
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-outline-secondary">
                Annuler
              </button>
            </div>
          ) : (
            <button type="button" onClick={handleEdit} className="btn btn-outline-secondary">
              Modifier
            </button>
          )}
        </form>
      </Body>
    </div>
  );
}

export default Profil;
