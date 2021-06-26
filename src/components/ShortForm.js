import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { setRegister } from "../firebase/firestore";
import { authObj } from "../firebase/auth";
import { Typography } from "@material-ui/core";

const ShortForm = ({ userid, username, user }) => {
	const classes = useStyles();

	const [form, setForm] = React.useState({
		userid,
		username,
		email: user.email,
	});
	const [error, setError] = React.useState({ field: "", isErr: false });
	const [registered, setRegistered] = React.useState(false);

	// inputs handles
	const fields = ["fullname", "mobile", "paymentMode", "paymentInfo"];
	const fieldErrors = ["Name", "Mobile number", "Payment", "Payment Info"];

	const handleInputs = (type, event) => {
		let data = event.target.value;
		if (data === "") return setForm({ ...form, [type]: data });

		switch (type) {
			case fields[0]: // name
				console.log(data);
				data = 1 ? data : form["fullname"] || "";
				break;
			case fields[1]: // mobile
				data = r_digit.test(data) ? data : form["mobile"] || "";
				break;
			case fields[2]: // paymentMode
				data = 1 ? data : form["paymentMode"] || "";

				break;
			case fields[3]: // paymentInfo
				data = 1 ? data : form["paymentInfo"] || "";
				break;
			default:
				return;
		}
		setForm({ ...form, [type]: data });
	};

	const onNextHelper = () => {
		let f = true;

		for (let field in fields) {
			if (form[fields[field]]?.length > 0) {
				setError({ field: "", isErr: false });
				continue;
			} else {
				setError({ field: fieldErrors[field], isErr: true });
				f = false;
				break;
			}
		}
		return f;
	};

	const handleNext = async () => {
		console.log(form, user);
		if (onNextHelper()) {
			await setRegister(form);
			setRegistered(true);
			// await authObj.signOut();
			// window.location.href = "/";
		}
	};

	return (
		<>
			<Card className={classes.root} elevation={8}>
				<CardContent>
					<form
						className={classes.textInput}
						noValidate
						autoComplete="off"
						onSubmit={(e) => {
							e.preventDefault();
						}}
					>
						<TextField
							id="userid"
							fullWidth
							label="User ID"
							placeholder="Your User ID"
							variant="standard"
							color="secondary"
							value={form.username}
							disabled
						/>
						<TextField
							id="email"
							fullWidth
							label="Email ID"
							placeholder="Your Email ID"
							variant="standard"
							color="secondary"
							value={form.email}
							disabled
						/>
						<TextField
							id="fullname"
							fullWidth
							label="Full Name"
							placeholder=""
							variant="standard"
							color="secondary"
							value={form.fullname || ""}
							onChange={(e) => handleInputs(fields[0], e)} // ! name : 0
							disabled={registered}
						/>
						<TextField
							id="mobile_no"
							fullWidth
							label="Mobile Number"
							placeholder=""
							variant="standard"
							color="secondary"
							value={form.mobile || ""}
							error={form.mobile?.length < 10 || !form.mobile}
							onChange={(e) => handleInputs(fields[1], e)} // ! mobile num : 1
							disabled={registered}
						/>
						<TextField
							id="payment-mode"
							select
							label="Payment mode"
							color="secondary"
							fullWidth
							value={form.paymentMode || ""}
							onChange={(e) => handleInputs(fields[2], e)} // ! payment mode : 2
							variant="outlined"
							helperText="Select your prefered payment mode"
							disabled={registered}
						>
							{paymentModes.map((mode) => (
								<MenuItem key={mode.value} value={mode.value}>
									{mode.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							id="payment-id"
							fullWidth
							label="Payment Info"
							placeholder={`Enter your ${form.paymentMode}`}
							variant="standard"
							color="secondary"
							value={form.paymentInfo || ""}
							onChange={(e) => handleInputs(fields[3], e)} // ! payment mode : 3
							disabled={registered}
						/>
					</form>
				</CardContent>
				{error.isErr && (
					<FormHelperText error={true} component="div">
						<div
							className={classes.helpertxt}
						>{`Please fill ${error.field} properly`}</div>
					</FormHelperText>
				)}
				{false && (
					<div className={classes.progress}>
						<CircularProgress color="secondary" size={28} />
					</div>
				)}
				<Button
					variant="contained"
					color="secondary"
					onClick={handleNext}
					className={classes.button}
					disabled={registered}
				>
					Submit
				</Button>
				{registered && (
					<>
						<Typography variant="body" gutterBottom align="center">
							You've been registered for receiving remuneration!
						</Typography>
						<br />
						<Typography variant="body2" gutterBottom align="center">
							Please wait while we verify your data (may take 2 or
							3 days)!
						</Typography>
					</>
				)}
			</Card>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		flex: "1",
		background: theme.palette.primary.card,
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
	},
	textInput: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		maxWidth: theme.spacing(32),
		margin: "auto",
		alignContent: "center",
		"& > *": {
			margin: theme.spacing(1),
			minWidth: "20ch",
		},
	},
	button: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(2),
	},
	helpertxt: {
		textAlign: "center",
		paddingBottom: theme.spacing(2),
	},
}));

const paymentModes = [
	{
		value: "UPI ID",
		label: "Google pay / UPI ID",
		tag: "Enter your UPI ID",
	},
	{
		value: "Paytm Number",
		label: "Paytm",
		tag: "Enter your Paytm Number",
	},
	{
		value: "Account Number",
		label: "Account Transfer",
		tag: "Enter your Account number",
	},
];

const r_digit = /^[\d+]{0,10}$/;

export default ShortForm;
