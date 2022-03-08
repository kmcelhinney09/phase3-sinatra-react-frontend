import { UserAuth } from '../context/AuthProvider'
import Home from './Home';
import User from './User';
import NavBar from './NavBar';
import RecipeView from './RecipeView';
import RecipeByCategory from './RecipeByCategory';
import RecipeByIngredient from './RecipeByIngredient'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const { user, setUser } = UserAuth()

  useEffect(() => {
    let userData = JSON.parse(sessionStorage.getItem('user'))
    setUser(userData)
  }, [setUser])

  return (
    <>
      <BrowserRouter>
        {user ? <NavBar /> : null}
        <Switch>
          <Route exact path="/">
            {user ? <Redirect to={`/users/${user.id}`} /> : <Home />}
          </Route>
          <Route exact path="/users/:id">
            {user ? <User user_id={user.id} name={user.name} /> : <Home />}
          </Route>
          <Route path={'/category/:categoryId'}>
            <RecipeByCategory />
          </Route>
          <Route path={'/recipe/:recipeId'}>
            <RecipeView />
          </Route>
          <Route path={'/ingredient/:ingredientName'}>
            <RecipeByIngredient />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
