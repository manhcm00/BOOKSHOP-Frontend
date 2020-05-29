import React, { useState, useContext } from 'react';
import './loginPage.css';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const Login = () => {
	const { setUser, setToken, setIsAuthentication } = useContext(AuthContext);

	const [ account, setAccount ] = useState({ email: '', password: '' });

	const [ message, setMessage ] = useState('');

	let history = useHistory();

	const onChangeHandler = (e) => {
		e.preventDefault();
		setAccount({ ...account, [e.target.name]: e.target.value });
	};

	const onSubmitHandler = () => {
		axios({
			method: 'post',
			url: '/user/login',
			data: { ...account }
		})
			.then((response) => {
				console.log(response.data);
				setUser({ id: response.data.userId });
				setToken(response.data.token);
				setIsAuthentication(true);
				setMessage('Log in successfully');
				localStorage.setItem('jwtToken', response.data.token);
				history.push('/');
			})
			.catch((error) => {
				setMessage('wrong email or password');
			});
	};

	return (
		<div className="loginPage">
			<div className="myContainer">
				<div className="form">
					<div className="loginForm">
						<div className="form-title">
							<h2>Welcome back</h2>
							{message.length === 0 ? <p>Let's sign in</p> : <p className="alertFail">{message}</p>}
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
								Log In
							</button>
							<p>
								<Link to="/users/signup">Sign up</Link>
							</p>
						</div>
						<div className="sosmed">
							<Link to="/" className="google">
								<img src="https://image.flaticon.com/icons/svg/2702/2702602.svg" alt="" />
								Google
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
