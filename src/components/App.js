import { useEffect, useState} from 'react';
import { UserAuth } from '../context/AuthProvider'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from './Home';
import User from './User';
import NavBar from './NavBar';
import RecipeView from './RecipeView';
import RecipeByCategory from './RecipeByCategory';
import RecipeByIngredient from './RecipeByIngredient'
import AddRecipe from './AddRecipe';



function App() {
  const { user, setUser } = UserAuth()
  const [boxReset, setBoxRest] = useState(false)

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
            {user ? <User user_id={user.id} name={user.name} boxReset={boxReset} setBoxRest={setBoxRest}/> : <Home />}
          </Route>
          <Route path={'/category/:categoryId'}>
            <RecipeByCategory boxReset={boxReset} setBoxRest={setBoxRest}/>
          </Route>
          <Route path={'/recipe/:recipeId'}>
            <RecipeView />
          </Route>
          <Route path={'/ingredient/:ingredientName'}>
            <RecipeByIngredient boxReset={boxReset} setBoxRest={setBoxRest}/>
          </Route>
          <Route path={'/recipes/new'}>
            <AddRecipe />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
