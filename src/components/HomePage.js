import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import Slide from './Slide';
import { CartContext } from '../Context/CartContext';
import NavsBar from './Navs-bar/NavsBar';
import CardProduct from './CardProduct';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';

const HomePage = () => {
	const [ products, setProducts ] = useState([]);

	const [ loading, setLoading ] = useState(false);

	const { cart, setCart } = useContext(CartContext);

	const [ page, setPage ] = React.useState(1);
	const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value);
	};

	useEffect(
		() => {
			const getData = async () => {
				await setLoading(true);
				await axios({
					method: 'get',
					url: '/products?page=' + (page - 1)
				})
					.then((response) => {
						setProducts(response.data.products);
					})
					.catch((error) => console.log(error));
				setLoading(false);
			};
			getData();
		},
		[ page ]
	);

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
				{!loading ? (
					<Row>
						{products.map((product, index) => {
							return (
								<Col md="4" key={index}>
									<CardProduct click={addToCart(product)} product={product} />
								</Col>
							);
						})}
					</Row>
				) : (
					<Row style={{ justifyContent: 'center' }}>
						<CircularProgress color="secondary" />
					</Row>
				)}
				<Row style={{ padding: '50px', justifyContent: 'center' }}>
					<Pagination count={10} color="secondary" page={page} onChange={handleChange} />
				</Row>
			</Container>
		</div>
	);
};

export default HomePage;
