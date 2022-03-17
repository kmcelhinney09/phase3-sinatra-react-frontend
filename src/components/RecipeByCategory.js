import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardMapping from "./CardMapping";

function RecipeByCategory({ inUserBox }) {
  let { categoryId } = useParams();
  const [recipeByCategory, setrecipeByCategory] = useState([]);
  const [categoryName, setCategoryName] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/categories/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryName(data[0].category.category_name)
        setrecipeByCategory(data);
      });
  }, [categoryId]);

  return (
    <>
    {console.log(inUserBox)}
      <h1 className="text-center">{categoryName} Recipes Category</h1>
      <CardMapping
        recipeArray={recipeByCategory}
        inUserBox={inUserBox}
      />
    </>
  );
}

export default RecipeByCategory;
