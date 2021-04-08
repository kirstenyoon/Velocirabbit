import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/body/Home';
import LoggedIn from './components/body/LoggedIn';
import Admin from './components/body/Admin';

function App() {
  // useEffect(() => {
  //   fetch(`/ + ${username} + ${password}`);
  // });
  const [user, setUser] = useState('admin');

  // setUser('user');
  // setUser("admin")

  return (
    <div className="App">
      <main>
        {user === 'user' && <Redirect to="/loggedIn" />}
        {user === 'admin' && <Redirect to="/admin" />}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/loggedIn" component={LoggedIn} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
