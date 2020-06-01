import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import OrderList from './OrderList';
import './style.css';
import { Container } from 'reactstrap';
import InforForm from './InforForm';
import Bill from './Bill';
import { useHistory } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { AuthContext } from '../../Context/AuthContext';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	button: {
		marginRight: theme.spacing(1)
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

function getSteps() {
	return [ 'Verify your cart', "Fill the receiver's infomation form", 'Your bill' ];
}

export default function HorizontalLinearStepper() {
	let history = useHistory();
	const classes = useStyles();
	const { cart, setCart } = React.useContext(CartContext);
	const { isAuthentication, token, user } = React.useContext(AuthContext);
	const [ activeStep, setActiveStep ] = React.useState(0);
	const [ skipped, setSkipped ] = React.useState(new Set());
	const [ message, setMessage ] = React.useState('');
	const [ reciverInfo, setReciverInfo ] = React.useState({
		reciverName: '',
		reciverPhone: '',
		reciverEmail: '',
		reciverAddress: '',
		comment: ''
	});
	const steps = getSteps();

	React.useEffect(() => {
		if (!isAuthentication) {
			history.push('/users/login');
		}
	}, []);

	const onChangeHandler = (e) => {
		e.preventDefault();
		setReciverInfo({ ...reciverInfo, [e.target.name]: e.target.value });
	};

	const getStepContent = (step) => {
		switch (step) {
			case 0:
				return <OrderList />;
			case 1:
				return <InforForm setInfo={onChangeHandler} info={reciverInfo} />;
			case 2:
				return <Bill info={reciverInfo} />;
			default:
				return 'Unknown step';
		}
	};

	const isStepOptional = (step) => {
		return step === 1;
	};

	const backToHomePage = () => {
		history.push('/');
	};

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleNext = () => {
		let newSkipped = skipped;
		if (isStepSkipped(activeStep)) {
			newSkipped = new Set(newSkipped.values());
			newSkipped.delete(activeStep);
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
		setSkipped(newSkipped);
	};

	const handleBack = () => {
		setMessage('');
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const submitHandler = () => {
		axios({
			method: 'post',
			url: '/orders',
			headers: {
				Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken')
			},
			data: {
				...reciverInfo,
				products: [ ...cart ],
				userId: user.id,
				total: cart.reduce((total, product) => {
					return total + product.price;
				}, 0)
			}
		})
			.then((response) => {
				console.log(response.data);
				setMessage(response.data.message);
				if (response.data.message === 'Order successfully') {
					setTimeout(() => {
						setCart([]);
						history.push('/');
					}, 3000);
				} else if (response.data.message === 'Auth failed') {
					setTimeout(() => {
						history.push('/users/login');
					}, 3000);
				}
			})
			.catch((error) => {
				history.push('/users/login');
			});
	};

	return (
		<Container className="OrderPage">
			<Button color="primary" onClick={backToHomePage}>
				Back to Home Page
			</Button>
			<div className={classes.root}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						if (isStepOptional(index)) {
							labelProps.optional = <Typography variant="caption">Required</Typography>;
						}
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>
				<div>
					{activeStep === steps.length ? (
						<div>
							<Typography className={classes.instructions}>
								All steps completed - you&apos;re finished
							</Typography>
							<Button onClick={handleReset} className={classes.button}>
								Reset
							</Button>
						</div>
					) : (
						<div>
							<Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
							<div>
								<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
									Back
								</Button>
								<Button
									variant="contained"
									color="primary"
									onClick={handleNext}
									className={classes.button}
									disabled={cart.length === 0 || activeStep === steps.length - 1}
								>
									Next
								</Button>
								<Button
									variant="contained"
									color="primary"
									className={classes.button}
									disabled={activeStep !== steps.length - 1}
									onClick={submitHandler}
								>
									Finish
								</Button>
								{message}
							</div>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
}
