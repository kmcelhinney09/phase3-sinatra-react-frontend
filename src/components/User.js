import React, { useState, useEffect } from "react";
import CardMapping from "./CardMapping";

function User({ user_id, name }) {
  const [userRecipeBoxData, setUserRecipeBoxData] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9292/users/${user_id}/recipe_box`)
      .then((res) => res.json())
      .then((data) => {
        setUserRecipeBoxData(data);
      });
  }, [user_id]);

  return (
    <CardMapping recipeArray={userRecipeBoxData} />
  );
}

export default User;
