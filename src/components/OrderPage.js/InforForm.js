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
					name="reciverName"
					onChange={setInfo}
					value={info.reciverName.length > 0 ? info.reciverName : null}
				/>
				<TextField
					id="standard-basic"
					label="Phone Number"
					name="reciverPhone"
					onChange={setInfo}
					value={info.reciverPhone.length > 0 ? info.reciverPhone : null}
				/>
				<TextField
					id="standard-basic"
					label="Email"
					name="reciverEmail"
					onChange={setInfo}
					value={info.reciverEmail.length > 0 ? info.reciverEmail : null}
				/>
				<TextField
					id="standard-basic"
					label="Address"
					name="reciverAddress"
					onChange={setInfo}
					value={info.reciverAddress.length > 0 ? info.reciverAddress : null}
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
