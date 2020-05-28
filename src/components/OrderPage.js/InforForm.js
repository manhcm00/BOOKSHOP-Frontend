import React from 'react';
import TextField from '@material-ui/core/TextField';

export default function InforForm(props) {
	const { setInfo, info } = props;
	return (
		<div className="Info">
			<h1>Please fill your information in this form</h1>
			<form>
				<TextField
					id="standard-basic"
					label="Your Full Name"
					name="name"
					onChange={setInfo}
					value={info.name.length > 0 ? info.name : null}
				/>
				<TextField
					id="standard-basic"
					label="Phone Number"
					name="phone"
					onChange={setInfo}
					value={info.phone.length > 0 ? info.phone : null}
				/>
				<TextField
					id="standard-basic"
					label="Email"
					name="email"
					onChange={setInfo}
					value={info.email.length > 0 ? info.email : null}
				/>
				<TextField
					id="standard-basic"
					label="Address"
					name="address"
					onChange={setInfo}
					value={info.address.length > 0 ? info.address : null}
				/>
				<TextField
					id="standard-basic"
					label="Comment"
					name="comment"
					onChange={setInfo}
					value={info.comment.length > 0 ? info.comment : null}
				/>
			</form>
		</div>
	);
}
