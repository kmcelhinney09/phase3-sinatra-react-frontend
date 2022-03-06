import { useState } from 'react';
import Home from './Home';
import User from './User';
import NavBar from './NavBar';
import RecipeByCategory from './RecipeByCategory';
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <>
      <NavBar user_id={userData.id} name={userData.name} loggedIn={loggedIn}/>
      <Switch>
        <Route exact path="/">
          <Home setUserData={setUserData} setLoggedIn={setLoggedIn} />}
        </Route>
        <Route exact path="/users/:id">
          <User user_id={userData.id} name={userData.name} />
        </Route>
        <Route path={'/category/:categoryId'}>
          <RecipeByCategory />
        </Route>
      </Switch>
    </>
  );
}

export default App;
