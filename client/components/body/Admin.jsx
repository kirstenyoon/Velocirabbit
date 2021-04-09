import React from 'react';

function Admin() {
	return (
		<div className="admin">
			<h1>Admin Console</h1>
			<div>
				<form action="/api/allUsers">
					<button>GET ALL USERS</button>
				</form>
				<br></br>
				<form action="/api/allProducts">
					<button>GET ALL PRODUCTS</button>
				</form>
				<br></br>
				<br></br>
				<form action="/api/checkSession">
					<button>CHECK SESSION</button>
				</form>
				<br></br>
				<form action="/api/logout">
					<button>LOGOUT</button>
				</form>
			</div>
		</div>
	);
}

export default Admin;
