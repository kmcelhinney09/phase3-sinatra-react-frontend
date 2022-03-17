import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";

function User({ user_id, name }) {
  const [userRecipeBoxData, setUserRecipeBoxData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${user_id}/recipe_box`)
      .then((res) => res.json())
      .then((data) => {
        setUserRecipeBoxData(data);
        const userRecipesIds =[]
        data.forEach(recipe => {
            userRecipesIds.push(recipe.id)
        });
        sessionStorage.setItem('box',JSON.stringify(userRecipesIds))
      });
  }, []);

  useEffect(() => {
      fetch(`http://localhost:9292/users/${user_id}/recipes`)
      .then(res => res.json())
      .then(recipes => {
          let userOwnedRecipes = []
          recipes.forEach(recipe => userOwnedRecipes.push(recipe.id))
          sessionStorage.setItem('userOwned',JSON.stringify(userOwnedRecipes))
      })
  },[])
  
  return (
      <>
      <h1 className="text-center">{`${name}'s Recipe Box`}</h1>
      <CardMapping recipeArray={userRecipeBoxData} />
      </>
  );
}

export default User;
