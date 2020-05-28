import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useHistory, Link } from 'react-router-dom';
import './NavsBar.css';
import Drawer from '../Drawer';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Button } from 'reactstrap';

export default function NavsBar(props) {
	const { isAuthentication } = useContext(AuthContext);

	let history = useHistory();

	function handleClickLogin() {
		history.push('/users/login');
	}

	function handleCartLick() {
		history.push('/order');
	}

	return (
		<nav className="navs d-flex align-items-center">
			<div className="logo">
				<h4>The Nav</h4>
			</div>
			<ul className="nav-links">
				<li>
					<Link to="#">Home</Link>
				</li>
				<li>
					<Link to="#">About</Link>
				</li>
				<li>
					<Link to="#">Work</Link>
				</li>
				<li>
					<Link to="#">Projects</Link>
				</li>
				{!isAuthentication ? null : (
					<Badge badgeContent={props.cart.length} color="secondary">
						<ShoppingCartIcon onClick={handleCartLick} />
					</Badge>
				)}
			</ul>
			<div className="burger">
				{!isAuthentication ? null : (
					<Badge badgeContent={props.cart.length} color="secondary">
						<ShoppingCartIcon onClick={handleCartLick} />
					</Badge>
				)}
				<Drawer />
			</div>
			{isAuthentication ? null : (
				<Button color="warning" onClick={handleClickLogin} style={{ fontWeight: '600' }}>
					Login
				</Button>
			)}
		</nav>
	);
}
