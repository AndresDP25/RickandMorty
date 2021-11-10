import { Switch, Route } from 'react-router-dom'
import { Fragment, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Characters from "./components/Characters";
import Pagination from "./components/Pagination";
import Detail from "./components/Detail";
import Filtro from './components/Filtro';

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});
  const [texto, setTexto] = useState('')

  const initialUrl = `https://rickandmortyapi.com/api/character`;

  //función async porque esperamos info, usamos async y await
  const fetchCharacters = async (url) => {

    try {
      //cuando espereamos un retorno tenemos q usar await o then?
      const response = await fetch(url);
      const data = await response.json();
      setInfo(data.info);
      setCharacters(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const onPrevious = () => {
    fetchCharacters(info.prev);
  };

  const onNext = () => {
    fetchCharacters(info.next);
  };

  //como no tiene dependencias al estar el array vacío, esto se va a ejecutar una sola vez al inicio
  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);

  const charactersFiltrados = characters.filter(character => character.name.toLowerCase().includes(texto))

  return (
    <>
        <Navbar brand="Rick and Morty" />
        <div className="container mt-5">
          <Switch>
            <Fragment>
              <Filtro texto={texto} setTexto={setTexto} />
              <Route exact path='/' >
                  <Pagination prev={info.prev}
                  next={info.next}
                  onPrevious={onPrevious}
                  onNext={onNext} />
              </Route>
              <Route exact path='/' >
                  <Characters texto={texto} characters={charactersFiltrados} />
              </Route>
              <Route exact path='/' >
                  <Pagination prev={info.prev}
                  next={info.next}
                  onPrevious={onPrevious}
                  onNext={onNext} />
              </Route>
              <Route exact path='/detalle/:id' component={Detail} />
            </Fragment>
          </Switch>   
        </div>
    </>
  );
}

export default App;
