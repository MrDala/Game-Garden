import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameCard from '../components/GameCard';
import { apiGames } from '../lib/ApiGames';
import { apiUsers } from '../lib/ApiUsers';
import Titre from '../components/Titre';
import Body from '../components/Body';

function Boutique() {
  const navigate = useNavigate();
  const [listeJeux, setListeJeux] = useState([]);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    init();
  }, []);

  /**
 * Charge la première page de la liste de jeux lors du chargement initial de la page
 */
  async function init() {
    if (!user) {
      navigate('/');
    } else {
      const jeux = await getJeux();
      setListeJeux(jeux);
      setHasPrevious(jeux.previous !== null);
      setHasNext(jeux.next !== null);
      setCurrentPage(getCurrentPageNumber(jeux));
    }
  }

  /**
 * Récupère les jeux à afficher sur la page
 * @param {string} url - URL de l'API pour récupérer les jeux
 * @return {Promise<Object>} - Un objet représentant la liste des jeux
 */
  async function getJeux(url) {
    const jeux = await apiGames.getGames(url);
    setHasPrevious(!!jeux.previous);
    setHasNext(!!jeux.next);
    setCurrentPage(getCurrentPageNumber(jeux));
    return jeux;
  }

  /**
   * Charge une nouvelle page de la liste de jeux à partir du lien donné
   * @param {string} link - Lien vers la page suivante ou précédente à charger
   */
  async function getNewPage(link) {
    const jeux = await getJeux(link);
    setListeJeux(jeux);
    setCurrentPage(getCurrentPageNumber(jeux));
  }

  /**
   * Calcule le numéro de page courant à partir des données de pagination
   * @param {Object} jeux - Objet représentant une liste de jeux avec des données de pagination
   * @return {number} - Le numéro de page courant
   */
  function getCurrentPageNumber(jeux) {
    if (!jeux.previous) {
      return 1;
    }
    const query = new URLSearchParams(jeux.previous.split('?')[1]);
    const page = query.get('page');
    return page ? parseInt(page) + 1 : 2;
  }


  /**
 * Affiche une notification à l'utilisateur avec un message et une couleur de fond donnés
 * @param {string} message - Le message à afficher dans la notification
 * @param {string} backgroundColor - La couleur de fond de la notification (success, warning, etc.)
 */
  function showNotification(message, backgroundColor) {
    const notification = document.createElement("div");
    notification.className = `alert alert-${backgroundColor} position-fixed bottom-0 end-0 p-4 fade show`;
    notification.role = "alert";
    notification.innerHTML = message;
    notification.style.fontSize = "1rem";
    notification.style.marginRight = "2.4rem";

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  /**
   * Ajoute un jeu à la wishlist de l'utilisateur avec l'identifiant donné
   * Affiche une notification à l'utilisateur si le jeu est déjà présent dans la wishlist
   * @param {number} gameId - L'identifiant du jeu à ajouter à la wishlist
   */
  async function addGame(gameId) {
    // Vérifier si le jeu est déjà présent dans la wishlist de l'utilisateur
    const wishlist = await apiUsers.getWishlist(user.id);

    const gameExists = wishlist.some(wishlistItem => wishlistItem.gamesId.includes(gameId));

    if (gameExists) {
      showNotification("Jeu déjà présent dans la wishlist !", "warning");
    } else {
      await apiUsers.addToWishlist(user.id, gameId);
      showNotification("Jeu ajouté à la wishlist !", "success");
    }
  }

  return (
    <div className="container-nav">
      <Body>
        <Titre
          titre={"Boutique"}
        />
        <div className="row row-cols-1 row-cols-md-3 g-4 w-75 mx-auto">
          {listeJeux.results && listeJeux.results.map(jeu => (
            <GameCard
              key={jeu.id}
              id={jeu.id}
              titre={jeu.name}
              image={jeu.background_image}
              description={jeu.description_raw}
              mode="add"
              onAdd={addGame}
            />
          ))}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-outline-secondary me-2" onClick={() => hasPrevious && getNewPage(listeJeux.previous)} disabled={!hasPrevious}>
            Précédent
          </button>
          <span className="align-self-center">{currentPage}</span>
          <button className="btn btn-outline-secondary ms-2" onClick={() => hasNext && getNewPage(listeJeux.next)} disabled={!hasNext}>
            Suivant
          </button>
        </div>
      </Body>
    </div>


  );
}

export default Boutique;
