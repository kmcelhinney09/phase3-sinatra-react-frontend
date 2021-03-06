import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";
import { useParams } from "react-router-dom";

function RecipeByIngredient({ inUserBox, handleChangeInBox }) {
  let { ingredientName } = useParams();
  const [recipeByIngredient, setrecipeByIngredient] = useState([]);
  const fetchUrl = process.env.REACT_APP_SERVER

  useEffect(() => {
    fetch(`${fetchUrl}/recipes/ingredient/${ingredientName}`)
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
        inUserBox={inUserBox}
        handleChangeInBox={handleChangeInBox}
      />
    </>
  );
}

export default RecipeByIngredient;
