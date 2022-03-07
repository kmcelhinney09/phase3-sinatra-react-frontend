import { UserAuth } from '../context/AuthProvider'
import Home from './Home';
import User from './User';
import NavBar from './NavBar';
import RecipeByCategory from './RecipeByCategory';
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
      {console.log(user)}
      <BrowserRouter>
        <NavBar />
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
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
