import { useState } from 'react';
import Home from './Home';
import User from './User';
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  const [userData, setUserData] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn? <Redirect to={`/users/${userData.id}`} /> :<Home setUserData = {setUserData} setLoggedIn={setLoggedIn} />}
      </Route>
      <Route exact path={`/users/${userData.id}`}>
        <User user_id={userData.id} name={userData.name}/>
      </Route>
    </Switch>
  );
}

export default App;
