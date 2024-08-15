import React from "react";

function Card({ recipe }) {
    console.table(recipe);
  return (
    <>
      <img src={recipe.img} alt="" />
      <h2>Nombre: {recipe.nombre}</h2>
      <h3>Habilidad: {recipe.habilidad}</h3>
      <h4>Poder: {recipe.poder}</h4>
    </>
  );
}

export default Card;
