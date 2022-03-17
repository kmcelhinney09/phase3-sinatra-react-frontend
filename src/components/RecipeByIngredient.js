import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";
import { useParams } from "react-router-dom";

function RecipeByIngredient() {
  let { ingredientName } = useParams();
  const [recipeByIngredient, setrecipeByIngredient] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:9292/recipes/ingredient/${ingredientName}`)
      .then((res) => res.json())
      .then((ingredientData) => {
        console.log("From Server")
        console.log(ingredientData)
        setrecipeByIngredient(ingredientData);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
    {console.log(recipeByIngredient)}
      <h1 className="text-center">{`Recipe Including ${ingredientName}`}</h1>
      <CardMapping
        recipeArray={recipeByIngredient}
      />
    </>
  );
}

export default RecipeByIngredient;
