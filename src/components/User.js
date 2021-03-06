import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";

function User({ user_id, name, inUserBox, setInUserBox, changeInBox, handleChangeInBox }) {
  const [userRecipeBoxData, setUserRecipeBoxData] = useState([]);
  const fetchUrl = process.env.REACT_APP_SERVER

  
  

  useEffect(() => {    
    fetch(`${fetchUrl}/users/${user_id}/recipe_box`)
      .then((res) => res.json())
      .then((data) => {
       
        setUserRecipeBoxData(data);
        setInUserBox(data.map((recipe) => recipe.id));
      });
  }, [changeInBox]);

  return (
    <>
      <h1 className="text-center">{`${name}'s Recipe Box`}</h1>
      <CardMapping recipeArray={userRecipeBoxData} inUserBox={inUserBox} handleChangeInBox={handleChangeInBox} />
    </>
  );
}

export default User;
