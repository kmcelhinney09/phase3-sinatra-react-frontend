import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardMapping from "./CardMapping";

function RecipeByCategory() {
  let { categoryId } = useParams();
  const [recipeByCategory, setrecipeByCategory] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setrecipeByCategory(data);
      });
  }, [categoryId]);

  return (
    <CardMapping recipeArray={recipeByCategory} />
  );
}

export default RecipeByCategory;
