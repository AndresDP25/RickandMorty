import { useParams } from "react-router-dom";
import React from 'react'
import { useEffect, useState } from "react";

function Detail( ) {
  const [character, setCharacter] = useState()
  const [loading, setloading] = useState(true)
  const {id} = useParams()

  const fetchCharacter = async (id) => {

    try {
      //cuando espereamos un retorno tenemos q usar await o then?
      const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
      const data = await response.json();
      setCharacter(data);
      console.log(character);
       
    } catch (error) {
      console.log(error);
    }
    finally{ setloading(false)
    console.log(loading); }
  };

  useEffect(() => {
    
      fetchCharacter(id);    
    
  }, []);
  
  return (
    <>
      <div className="container mt-5 text-danger text-center">
        {loading ? (
          <h2 className="itemDetailStyle">Cargando...</h2>
        ) : (
          <div className="col mb-4 d-flex justify-content-center">
            <div className="card" style={{maxWidth: '600px' }}>
            <img src={character.image} alt="" />
                <div className='card-body'>
                  <h5 className='card-title'>{character.name}</h5>
                  <hr />
                  <p>Species: {character.species}</p>
                <p>Location: {character.location.name}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Detail

