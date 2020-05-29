import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { CartContext } from '../../Context/CartContext';
import { AuthContext } from '../../Context/AuthContext';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	}
});

const total = (cart) => {
	return cart.reduce((total, product) => {
		return total + product.price;
	}, 0);
};

export default function Bill(props) {
	const classes = useStyles();
	const { cart } = React.useContext(CartContext);
	const { user } = React.useContext(AuthContext);
	console.log(cart);
	const rows = [ ...cart ];
	const { info } = props;
	return (
		<React.Fragment>
			<div className="CustomerInfomation">
				<h2>Reciver's information</h2>
				<h3>Name: {info.reciverName}</h3>
				<h3>Phone number: {info.reciverPhone}</h3>
				<h3>Email: {info.reciverEmail}</h3>
				<h3>Address: {info.reciverAddress}</h3>
				<h3>Comment: {info.comment}</h3>
			</div>
			<h2>Your bill</h2>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product Id</TableCell>
							<TableCell align="right">Name</TableCell>
							<TableCell align="right">Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell component="th" scope="row">
									{row._id}
								</TableCell>
								<TableCell align="right">{row.name}</TableCell>
								<TableCell align="right">${row.price}</TableCell>
							</TableRow>
						))}
					</TableBody>
					<TableFooter>
						<TableRow key={-99999}>
							<TableCell component="th" scope="row">
								User ID: {user.id}
							</TableCell>
							<TableCell align="right">total: ${total(cart).toFixed(2)}</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</React.Fragment>
	);
}
