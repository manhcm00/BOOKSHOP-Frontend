import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Slide from './Slide';
import { CartContext } from '../Context/CartContext';
import NavsBar from './Navs-bar/NavsBar';
import CardProduct from './CardProduct';
import Pagination from '@material-ui/lab/Pagination';

const HomePage = () => {
	const [ products, setProducts ] = useState([]);

	const { cart, setCart } = useContext(CartContext);

	useEffect(() => {
		axios({
			method: 'get',
			url: '/products'
		})
			.then((response) => {
				setProducts(response.data.products);
			})
			.catch((error) => console.log(error));
	}, []);

	const addToCart = (product) => {
		return () => {
			setCart([ ...cart, product ]);
			console.log(cart);
		};
	};

	return (
		<div style={{ background: '#f5f5f5' }}>
			<NavsBar cart={cart} />
			<Slide />
			<div style={{ width: '100%', textAlign: 'center', fontFamily: 'arial' }}>
				<h1 style={{ margin: '50px' }}> OUR PRODUCT </h1>
			</div>
			<Container style={{ marginTop: '50px' }}>
				<Row>
					{products.map((product, index) => {
						return (
							<Col md="4" key={index}>
								<CardProduct click={addToCart(product)} />
							</Col>
						);
					})}
				</Row>
				<Row style={{padding: "50px", justifyContent: "center"}}>
					<Pagination count={10} color="secondary" />
				</Row>
			</Container>
		</div>
	);
};

export default HomePage;
