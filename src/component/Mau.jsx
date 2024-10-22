import React, { useState, useEffect } from "react";
import "./Mau.css";

function PokemonApp() {
  const [pokemonList, setPokemonList] = useState([]); // Lưu trữ danh sách Pokémon
  const [selectedPokemon, setSelectedPokemon] = useState(null); // Lưu trữ Pokémon được chọn để hiển thị chi tiết
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Fetch danh sách Pokémon từ PokeAPI
  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20"
        ); // Fetch 20 Pokémon
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPokemonList(data.results); // Lưu trữ danh sách Pokémon
      } catch (error) {
        setError(error.message); // Xử lý lỗi
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchPokemonList();
  }, []);

  // Fetch chi tiết Pokémon được chọn
  const fetchPokemonDetails = async (url) => {
    setLoading(true); // Hiển thị loading khi đang tải thông tin chi tiết
    try {
      const response = await fetch(url); // Fetch chi tiết từ URL của Pokémon
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSelectedPokemon(data); // Cập nhật thông tin Pokémon được chọn
    } catch (error) {
      setError(error.message); // Xử lý lỗi
    } finally {
      setLoading(false); // Tắt loading
    }
  };

  // Nếu đang tải dữ liệu, hiển thị thông báo
  if (loading) {
    return <p>Loading Pokémon...</p>;
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="App">
      <h1>Pokémon App</h1>

      {/* Hiển thị danh sách Pokémon */}
      <div className="pokemon-list">
        <h2>Pokémon List</h2>
        <ul>
          {pokemonList.map((pokemon, index) => (
            <li key={index}>
              <button onClick={() => fetchPokemonDetails(pokemon.url)}>
                {pokemon.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Hiển thị chi tiết Pokémon được chọn */}
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>
            <strong>Height:</strong> {selectedPokemon.height}
          </p>
          <p>
            <strong>Weight:</strong> {selectedPokemon.weight}
          </p>
          <p>
            <strong>Base Experience:</strong> {selectedPokemon.base_experience}
          </p>
          <h3>Abilities</h3>
          <ul>
            {selectedPokemon.abilities.map((ability, index) => (
              <li key={index}>{ability.ability.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonApp;
