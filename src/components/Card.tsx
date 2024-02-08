import "../App.css";
import {  useEffect } from "react";

function Card(props) {
  async function fetchApi() {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${props.randomNumber}`
      );
      if (!response.ok) {
        throw new Error("There has been an error fetching the API.");
      }
      const data = await response.json();
      const pokemonSprite = document.querySelector(`#card-img-${props.randomNumber}`);
      const pokemonName = document.querySelector(`#card-name-${props.randomNumber}`);
      pokemonSprite.src = data.sprites.front_default;
      pokemonName.innerHTML = data.name;

      /* console.log(`${data.name} ${data.id}`); */
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchApi();
  }, [props.randomNumber]);


  return (
    <>
      <div className="card" key={props.randomNumber} onClick={props.onClick} >
        <img src="" className="card-img" id={`card-img-${props.randomNumber}`}/>
        <p className="card-name" id={`card-name-${props.randomNumber}`}></p>
      </div>
    </>
  );
}

export default Card;
