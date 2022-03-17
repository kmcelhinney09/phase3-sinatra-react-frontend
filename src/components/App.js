import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthProvider";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import User from "./User";
import NavBar from "./NavBar";
import RecipeView from "./RecipeView";
import RecipeByCategory from "./RecipeByCategory";
import RecipeByIngredient from "./RecipeByIngredient";
import AddRecipe from "./AddRecipe";
import EditRecipe from "./EditRecipe";

function App() {
  const { user, setUser } = UserAuth();
  const [categoryList, setCategoryList] = useState([]);
  const [inUserBox, setInUserBox] = useState([]);

  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem("user"));
    setUser(userData);
  }, [setUser]);

  useEffect(() => {
    fetch(`http://localhost:9292/categories`)
      .then((res) => res.json())
      .then((categoriesData) => {
        setCategoryList(categoriesData);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        {user ? <NavBar /> : null}
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to={`/users/${user.id}`} /> : <Home />}
          </Route>
          <Route exact path="/users/:id">
            {user ? (
              <User
                user_id={user.id}
                name={user.name}
                categoryList={categoryList}
                inUserBox={inUserBox}
                setInUserBox={setInUserBox}
              />
            ) : (
              <Home />
            )}
          </Route>
          <Route path={"/category/:categoryId"}>
            <RecipeByCategory categoryList={categoryList} inUserBox={inUserBox}/>
          </Route>
          <Route path={"/recipe/:recipeId"}>
            <RecipeView />
          </Route>
          <Route path={"/ingredient/:ingredientName"}>
            <RecipeByIngredient  inUserBox={inUserBox} />
          </Route>
          <Route path={"/recipes/new"}>
            <AddRecipe />
          </Route>
          <Route path={"/recipes/:id/edit"}>
            <EditRecipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
