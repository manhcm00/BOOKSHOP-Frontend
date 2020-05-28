import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/LoginForm/Login';
import Register from './components/LoginForm/Register';
import CartProvider from './Context/CartContext';
import OrderPage from './components/OrderPage.js/OrderPage';

function App() {
	return (
		<Router>
			<CartProvider>
				<Switch>
					<Route exact path="/">
						<HomePage />
					</Route>
					<Route exact path="/users/login">
						<Login />
					</Route>
					<Route exact path="/users/signup">
						<Register />
					</Route>
					<Route exact path="/order">
						<OrderPage />
					</Route>
				</Switch>
			</CartProvider>
		</Router>
	);
}

export default App;
