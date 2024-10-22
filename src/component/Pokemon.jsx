import React, { useState, useEffect } from "react";

function PokemonList() {
  const [pokemons, setPokemons] = useState([]); // Lưu trữ danh sách Pokémon
  const [loading, setLoading] = useState(true); // Quản lý trạng thái loading
  const [error, setError] = useState(null); // Quản lý trạng thái lỗi

  useEffect(() => {
    // Hàm fetch data từ PokeAPI
    const fetchPokemons = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=10"
        ); // Gọi API để lấy danh sách Pokémon
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
        setPokemons(data.results); // Cập nhật state với danh sách Pokémon
      } catch (error) {
        setError(error.message); // Cập nhật trạng thái lỗi nếu có
      } finally {
        setLoading(false); // Tắt trạng thái loading
      }
    };

    fetchPokemons(); // Gọi hàm fetch data khi component mount
  }, []); // useEffect chỉ chạy một lần sau khi component được render lần đầu

  if (loading) return <p>Loading Pokémon...</p>; // Hiển thị khi đang tải dữ liệu
  if (error) return <p>Error: {error}</p>; // Hiển thị lỗi nếu có

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <p>{pokemon.name}</p>
            <p>{pokemon.url}</p>
            {/* <p>{pokemon.url.sprites["front_default"]}</p> */}
          </li> // Render danh sách Pokémon
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;
