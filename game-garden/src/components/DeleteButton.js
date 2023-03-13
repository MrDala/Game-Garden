function DeleteButton({ gameId, onRemove }) {
  async function handleClick() {
    await onRemove(gameId);
  }

  return (
    <button onClick={handleClick}>Supprimer</button>
  );
}



export default DeleteButton;