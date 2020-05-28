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
	return [ 'Verify your cart', "Fill the receiver's infomation", 'Your bill' ];
}

export default function HorizontalLinearStepper() {
	let history = useHistory();
	const classes = useStyles();
	const { cart } = React.useContext(CartContext);
	const [ activeStep, setActiveStep ] = React.useState(0);
	const [ skipped, setSkipped ] = React.useState(new Set());
	const [ userInfo, setUserInfo ] = React.useState({ name: '', phone: '', email: '', address: '', comment: '' });
	const steps = getSteps();

	const onChangeHandler = (e) => {
		e.preventDefault();
		setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
	};

	function getStepContent(step) {
		switch (step) {
			case 0:
				return <OrderList />;
			case 1:
				return <InforForm setInfo={onChangeHandler} info={userInfo} />;
			case 2:
				return <Bill info={userInfo} />;
			default:
				return 'Unknown step';
		}
	}

	const isStepOptional = (step) => {
		return step === 1;
	};

	function backToHomePage() {
		history.push('/');
	}

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
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
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
								>
									Finish
								</Button>
							</div>
						</div>
					)}
				</div>
			</div>
		</Container>
	);
}
