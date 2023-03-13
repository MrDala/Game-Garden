import AddButton from "./AddButton";

function GameCard({ id, titre, image, description, mode, onAdd, onDelete }) {
  return (
    <div className="col" key={id}>
      <div className="card h-100 d-flex flex-column">
        <div
          className="card-img card-img-top"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: 0,
            paddingBottom: '75%',
          }}
          alt={titre}
        />
        <div className="card-body d-flex flex-column align-items-start">
          <h5 className="card-title">{titre}</h5>
          {mode === 'add' ? (
            <div className="d-flex justify-content-start">
              <AddButton gameId={id} onAdd={onAdd} />
            </div>
          ) : (
            <>
              <p dangerouslySetInnerHTML={{ __html: description }} />
              <div className="flex-grow-1" />
              <button className="btn btn-danger ml-auto" onClick={() => onDelete(id)}>
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}





export default GameCard;

