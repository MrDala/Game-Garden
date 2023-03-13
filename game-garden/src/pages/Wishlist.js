import { useNavigate } from 'react-router-dom';
import { apiGames } from "../lib/ApiGames";
import { apiUsers } from "../lib/ApiUsers";
import { useState, useEffect } from 'react';
import GameCard from "../components/GameCard";
import Titre from "../components/Titre";
import Body from "../components/Body";

function Wishlist() {
  const navigate = useNavigate();
  const [listeJeux, setListeJeux] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    init();
  }, []);

  /**
   * Initialise la liste de souhaits de l'utilisateur et redirige vers la page de connexion si l'utilisateur n'est pas connecté
   */
  async function init() {
    if (!user) {
      navigate('/');
    } else {
      const jeux = await getJeux();
      setListeJeux(jeux);
    }
  }

  /**
   * Supprime un jeu de la wishlist de l'utilisateur
   * @param {string} gameId - ID du jeu à supprimer
   */
  async function removeGame(gameId) {
    await apiUsers.removeFromWishlist(user.id, gameId);
    const jeux = await getJeux();
    setListeJeux(jeux);
  }

  /**
   * Récupère la liste des jeux de la wishlist de l'utilisateur depuis l'API
   * @returns {Promise<Object[]>} Liste des jeux de la wishlist
   */
  async function getJeux() {
    var listeIdJeux = (await apiUsers.getWishlist(user.id))[0].gamesId;
    var listeJeux = [];

    await Promise.all(listeIdJeux.map(async ID => {
      const jeu = await apiGames.getGameDetail(ID);
      listeJeux.push(jeu);
    }));

    return listeJeux;
  }

  return (
    <div>
      <Body>
        <Titre
          titre={"Ma wishlist"}
        />
        <div className="row row-cols-1 row-cols-md-2 g-4 w-75 mx-auto">
          {listeJeux.map(jeu => (
            <GameCard
              key={jeu.id}
              id={jeu.id}
              titre={jeu.name}
              image={jeu.background_image}
              description={jeu.description}
              onDelete={removeGame}
            />
          ))}
        </div>
      </Body>
    </div>
  );
}

export default Wishlist;
