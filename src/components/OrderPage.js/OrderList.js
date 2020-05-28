import React, { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import DeleteIcon from '@material-ui/icons/Delete';

export default function OrderList(props) {
	const { cart, setCart } = useContext(CartContext);

	const removeFromCart = (product) => {
		return () => {
			let index = cart.indexOf(product);
			setCart([ ...cart.slice(0, index), ...cart.slice(index + 1) ]);
		};
	};

	return (
		<div>
			{cart.length > 0 ? cart.map((product) => (
				<div className="OrderCard">
					<div className="OrderCardImage">
						<img
							src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
							alt=""
						/>
					</div>
					<div className="TitlePlace">
						<h4>{product.name}</h4>
					</div>
					<div className="Price">
						<p>${product.price}</p>
					</div>
					<div className="Price">
						<DeleteIcon color="secondary" onClick={removeFromCart(product)} />
					</div>
				</div>
			)) : "Your cart has nothing, please come back and select some product"}
		</div>
	);
}
