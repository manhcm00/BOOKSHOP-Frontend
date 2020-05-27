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

	function handleClick() {
		history.push('/users/login');
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
						<ShoppingCartIcon />
					</Badge>
				)}
			</ul>
			<div className="burger">
				<Badge badgeContent={props.cart.length} color="secondary">
					<ShoppingCartIcon />
				</Badge>
				<Drawer />
			</div>
			{isAuthentication ? null : (
				<Button color="warning" onClick={handleClick} style={{fontWeight: "600"}}>
					Login
				</Button>
			)}
		</nav>
	);
}
