import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/body/Home';
import LoggedIn from './components/body/LoggedIn';
import Admin from './components/body/Admin';

function App() {
  return (
    <div className="App">
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/loggedIn" component={LoggedIn} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
