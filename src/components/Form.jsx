import { useState } from "react";
import { pokemones } from "../js/pokemones";
import Message from "./Message";
import FormComponent from "../Styles/Form.module.css";
import Card from "./Card";

const Form = () => {
  // Creacion de Stage
  const [customer, setCustomer] = useState({
    id: 0,
    name: "",
    age: "",
    pokemon_name: "",
  });

  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState(false);

  // Manejador de eventos
  const handleChange = (event) => {
    //Desestructuro evento
    const { name, value } = event.target;
    
    setCustomer( (prevCustomer) => (
                  {
                  ...prevCustomer,[name]: value, id: name === "pokemon_name" ? getPokemonId(value) : prevCustomer.id,
                  }
                 )
      );

  };

  // Actualizacion correctamente el id del Pokémon según el nombre seleccionado.
  const getPokemonId = (pokemonName) => {
    switch (pokemonName) {
      case "Pikachu":
        return 0;
      case "Charizard":
        return 1;
      case "Bulbasaur":
        return 2;
      default:
        return -1;
    }
  };

  // Manejo de eventos html
  const handleSubmit = (event) => {
    event.preventDefault();
    if (customer.name.trim().length >= 3 &&  parseInt(customer.age) > 0 && customer.pokemon_name.trim().length >= 6    ) {
      setError(false);
      setShow(true);
    } else {
        console.log('Error else : handleSubmit', event.target)
        setError(true);
      
    }
  };

  const reset = () => {
    setCustomer({
      id: 0,
      name: "",
      // Inicialización del estado age: Se mantiene como una cadena vacía para evitar problemas con el tipo de dato.
      age: "",
      pokemon_name: "",
    });
    
  };

  return (
    <>
     
      {show ? (
        <>
          <Card recipe={pokemones[customer.id]}/>
          <Message customer={customer} />
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit} className={FormComponent.formulario}>
            <label>Nombre completo: </label>
            <input type="text" name="name" value={customer.name} onChange={handleChange} />
            <label>Edad: </label>
            <input type="number" name="age" value={customer.age} onChange={handleChange} />
            <label>Pokemon favorito: </label>
            <select name="pokemon_name" value={customer.pokemon_name} onChange={handleChange}>
              <option value="">Selecciona un Pokémon</option>
              <option value="Pikachu">Pikachu</option>
              <option value="Charizard">Charizard</option>
              <option value="Bulbasaur">Bulbasaur</option>
            </select>
            <button type="submit">Enviar</button>
            {/* Tipo de botón en el reset: Cambié el tipo del botón "Limpiar Form" a button para evitar que actúe como un botón de envío. */}
            <button type="button" onClick={reset}>Limpiar Form</button>
          </form>
          
        </>
      )}

      {
        error && (<h4 style={{ color: "red" }}>Por favor, verifique su información</h4>)
      }
    </>
  );
};

export default Form;
