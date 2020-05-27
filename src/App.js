import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/LoginForm/Login';
import Register from './components/LoginForm/Register';
import CartProvider from './Context/CartContext'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<CartProvider>
						<HomePage />
					</CartProvider>
				</Route>
				<Route exact path="/users/login">
					<Login />
				</Route>
				<Route exact path="/users/signup">
					<Register />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
