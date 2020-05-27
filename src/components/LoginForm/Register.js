import React, { useState } from 'react';
import './loginPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
	const [ account, setAccount ] = useState({ email: '', password: '' });

	const [ message, setMessage ] = useState('');

	const onChangeHandler = (e) => {
		e.preventDefault();
		setAccount({ ...account, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = () => {
		axios({
			method: 'post',
			url: '/user/signup',
			data: { ...account }
		})
			.then((response) => {
				console.log(response.data);
				setMessage('Sign up successfully');
			})
			.catch((error) => {
				console.log(error.response.data.message);
				setMessage(error.response.data.message);
			});
	};

	return (
		<div className="loginPage">
			<div className="myContainer">
				<div className="form">
					<div className="loginForm">
						<div className="form-title">
							<h2>Sign up now</h2>
							{message.length === 0 ? <p>Let's sign up</p> : <p className="alertFail">{message}</p>}
						</div>
						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="text"
								name="email"
								id="email"
								placeholder="Enter your email"
								onChange={onChangeHandler}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Enter your password"
								onChange={onChangeHandler}
							/>
						</div>

						<div className="form-group button">
							<button className="mx-auto" onClick={onSubmitHandler}>
								Sign up
							</button>
							<p>
								<Link to="/users/login">Log in</Link>
							</p>
						</div>
						<div className="sosmed">
							<a href="/" className="google">
								<img src="https://image.flaticon.com/icons/svg/2702/2702602.svg" alt="" />
								Google
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
