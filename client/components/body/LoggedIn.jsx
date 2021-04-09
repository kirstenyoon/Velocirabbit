import React from 'react';

function LoggedIn() {
	return (
		<div className="userLoginPage">
			<h1>Welcome back!</h1>
			<form action="/api/logout">
				<button>LOGOUT</button>
			</form>
		</div>
	);
}

export default LoggedIn;
