import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/body/Home';
import LoggedIn from './components/body/LoggedIn';
import Admin from './components/body/Admin';
import { useCookies } from 'react-cookie';

function App() {
	// const [cookies, setCookie, removeCookie] = useCookies(['user']);
	const [user, setUser] = useState('');

	useEffect(() => {
		fetch('/api/checkSession')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.access_id === '0') {
					setUser('admin');
				} else if (data.access_id === '1') {
					setUser('user');
				}
			})
			.catch((error) => console.log(error));
	}, []);

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
