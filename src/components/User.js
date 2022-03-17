import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";

function User({ user_id, name, inUserBox, setInUserBox }) {
  const [userRecipeBoxData, setUserRecipeBoxData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${user_id}/recipe_box`)
      .then((res) => res.json())
      .then((data) => {
        setUserRecipeBoxData(data);
        setInUserBox(data.map(recipe => recipe.id))        
      });
  }, []);

  
  return (
      <>
      <h1 className="text-center">{`${name}'s Recipe Box`}</h1>
      <CardMapping recipeArray={userRecipeBoxData} inUserBox={inUserBox} />
      </>
  );
}

export default User;
