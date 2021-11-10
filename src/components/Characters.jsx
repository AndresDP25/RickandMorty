import React from "react";
import { Link } from 'react-router-dom';


const Characters = ({ characters, texto}) => {

  if(characters.length === 0) return <p>No se encontraron personajes con {texto}</p>

  return (
    <div className="row">
      {characters.map((character, index) => (
        <div key={index} className="col mb-4">      
            <div className="card" style={{minWidth: '200px', maxWidth: '550px' }}>
              <img src={character.image} alt="" />
              <div className='card-body'>
                <h5 className='card-title'>{character.name}</h5>
                <hr />
                <p>species:{character.species}</p>
                <p>location:{character.location.name}</p>
                <Link to={`/detalle/${character.id}`}>
                  <button>Detalle</button>
                </Link>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default Characters;





