import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";
import { useParams } from "react-router-dom";

function RecipeByIngredient(boxReset, setBoxRest) {
  let { ingredientName } = useParams();
  const [recipeByIngredient, setrecipeByIngredient] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:9292/recipes/ingredient/${ingredientName}`)
      .then((res) => res.json())
      .then((ingredientData) => {
        setrecipeByIngredient(ingredientData);
      })
      .catch((error) => console.log(error));
  }, [ingredientName]);

  return (
    <>
      <h1 className="text-center">{`Recipe Including ${ingredientName}`}</h1>
      <CardMapping
        recipeArray={recipeByIngredient}
        boxReset={boxReset} 
        setBoxRest={setBoxRest}
      />
    </>
  );
}

export default RecipeByIngredient;
