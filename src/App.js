import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/LoginForm/Login';
import Register from './components/LoginForm/Register';
import CartProvider from './Context/CartContext';
import OrderPage from './components/OrderPage.js/OrderPage';
import { AuthContext } from './Context/AuthContext';

function App() {
	const { setUser, setToken, setIsAuthentication } = React.useContext(AuthContext);

	React.useEffect(() => {
		const beforeLoad = async () => {
			if (sessionStorage.getItem('jwtToken') !== null && sessionStorage.getItem('userId') !== null) {
				await setUser({ id: sessionStorage.getItem('user') });
				await setToken(sessionStorage.getItem('jwtToken'));
				await setIsAuthentication(true);
			}
		};
		beforeLoad();
	}, []);

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
