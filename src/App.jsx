import React, { useState, useEffect } from "react";
// import Counter from "./component/Counter";
// import PokemonApp from "./component/Mau";
// import ListCard from "./component/List";
import Card from "./component/Card";
import Pokeinfo from "./component/Pokeinfo";
import axios from "axios";
import "./App.css";

function App() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };
  const getPokemon = async (res) => {
    res.map(async (item) => {
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };
  useState(() => {
    pokeFun();
  }, [url]);
  return (
    <>
      <div className="container">
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />

          <div className="btn-group">
            {prevUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}

            {nextUrl && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
}
export default App;
