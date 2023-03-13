import React, { useState } from "react";
import { apiUsers } from "../lib/ApiUsers";
import { useNavigate } from 'react-router-dom';
import Body from "../components/Body";
import Titre from "../components/Titre";

function Inscription() {
/**
 * Hook permettant de gérer l'affichage d'un message d'erreur
 * @returns {[string, function]} Un tableau contenant le message d'erreur et une fonction pour le modifier
 */
  const [error, setError] = useState("");

  /**
   * Hook permettant de naviguer vers une autre page
   */
  const navigate = useNavigate();

  /**
   * Hook permettant de stocker les informations saisies par l'utilisateur dans un formulaire
   * @type {Object}
   * @property {string} email L'adresse email de l'utilisateur
   * @property {string} username Le nom d'utilisateur de l'utilisateur
   * @property {string} firstname Le prénom de l'utilisateur
   * @property {string} lastname Le nom de famille de l'utilisateur
   * @property {string} birthdate La date de naissance de l'utilisateur
   */
  const [user, setUser] = useState({
    email: "",
    username: "",
    firstname: "",
    lastname: "",
    birthdate: "",
  });

  /**
   * Les champs d'un formulaire
   * @type {Array}
   * @property {string} label Le label du champ
   * @property {string} name Le nom du champ
   * @property {string} type Le type du champ
   */
  const fields = [
    { label: "Email*", name: "email", type: "email" },
    { label: "Nom d'utilisateur*", name: "username", type: "text" },
    { label: "Prénom", name: "firstname", type: "text" },
    { label: "Nom de famille", name: "lastname", type: "text" },
    { label: "Date de naissance*", name: "birthdate", type: "date" },
  ];

  /**
   * Fonction appelée lorsqu'un champ du formulaire est modifié
   * @param {Event} event L'événement de modification
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  /**
   * Fonction appelée lorsqu'un formulaire est soumis
   * @param {Event} event L'événement de soumission
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Vérifier que tous les champs obligatoires sont remplis
    if (!user.email || !user.username || !user.birthdate) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      // Vérifier si l'email est déjà utilisé
      const users = await apiUsers.getUser(user.email);
      if (users.find(u => u.email === user.email)) {
        setError("Cette adresse email est déjà utilisée.");
        return;
      }

      const response = await apiUsers.createUser(user);
      sessionStorage.setItem("user", JSON.stringify(response));
      navigate('/wishlist');
    } catch (error) {
      setError("Erreur lors de la création du compte");
    }
  };

  return (
    <div className="container-nav">
      <Body>
        <Titre titre={"Inscription"} />
        <div className="w-50 mx-auto container">
          <form onSubmit={handleSubmit}>
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
                  className="form-control"
                  required={field.name === "email" || field.name === "username" || field.name === "birthdate"}
                />
              </div>
            ))}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-secondary me-4">
                Valider
              </button>
              <button onClick={() => navigate('/login')} className="btn btn-outline-secondary ">
                Déjà inscrit ?
              </button>
            </div>
          </form>
          <p className="text-muted mt-3">* champ obligatoire</p>
        </div>
      </Body>
    </div>
  );
}

export default Inscription;
