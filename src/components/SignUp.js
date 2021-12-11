import React, { useState, useRef, useEffect } from "react";
import emailRx from "email-regex";
import { signInWithEmailID, getVerifier } from "../firebase/auth";
import { getRegisterRef } from "../firebase/firestore";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, FormHelperText, Grid } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	paper: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		height: "100%",
	},
	form: {
		display: "flex",
		flexDirection: "column",
		maxWidth: theme.spacing(64),
		margin: "auto",
	},
	text: {
		maxWidth: theme.spacing(32),
		minWidth: theme.spacing(32),
	},
	submit: {
		marginTop: theme.spacing(4),
		marginBottom: theme.spacing(2),
		minWidth: theme.spacing(32),
		margin: "auto",
	},
	getinvite: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	links: {
		"&:focus, &:visited, &:link, &:active": {
			textDecoration: "none",
			color: theme.palette.primary.main,
		},
		"&:hover": {
			color: theme.palette.secondary.main,
		},
	},
	info: {
		margin: theme.spacing(1),
		color: theme.palette.error,
		fontSize: "0.77em",
	},

	menuPaper: {
		minHeight: 120,
		opacity: 0,
	},
	divider: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(1),
	},
	progress: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	},
}));

const SignUp = ({ userid, username }) => {
	const classes = useStyles();

	const [recaptcha, setRecaptcha] = useState();
	const element = useRef(null);

	useEffect(() => {
		if (!recaptcha) {
			const verifier = getVerifier(element.current);

			verifier.verify().then(() => setRecaptcha(verifier));
		}
	});

	return (
		<div>
			{recaptcha ? (
				<SignUpComponent userid={userid} username={username} />
			) : (
				<div className={classes.progress}>
					<div className={classes.progress}>
						<CircularProgress
							style={{ margin: 32 }}
							color="secondary"
							size={28}
						/>
					</div>
					<Typography variant="caption">
						Setting up authentication, please wait...
					</Typography>
				</div>
			)}
			<div ref={element}></div>
		</div>
	);
};

const SignUpComponent = ({ userid, username }) => {
	const classes = useStyles();

	const [email, setEmail] = useState("");
	const [registered, setRegistered] = useState(false);
	const [linkSent, setLinkSent] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (emailRx().test(email)) {
			const registerRef = getRegisterRef(email);
			registerRef.get().then(({ exists }) => {
				console.log("exists: ", exists);
				setRegistered(exists);
			});
		} else {
			setRegistered(false);
		}
	}, [email]);

	const submitHelper = () => {
		setLoading(true);
		if (emailRx().test(email)) {
			signInWithEmailID(email, userid)
				.then((res) => {
					setLinkSent(res);
					setLoading(false);
				})
				.catch((e) => {
					setLoading(false);
				});
		} else {
			setLoading(false);
		}
	};

	return (
		<div className={classes.sign}>
			<form
				className={classes.form}
				noValidate
				onSubmit={(e) => e.preventDefault()}
			>
				<Grid container spacing={1} justify="center">
					<Grid container item xs={12} justify="center">
						<TextField
							className={classes.text}
							required
							fullWidth
							id="asquserid"
							placeholder="myuserid"
							name="userID"
							autoComplete="asquserid"
							value={username}
							error={!userid}
							disabled
						/>
					</Grid>
					<Grid container item xs={12} justify="center">
						<TextField
							className={classes.text}
							required
							fullWidth
							id="email"
							label="Email ID"
							placeholder="emailid@example.com"
							name="emailId"
							autoComplete="email"
							value={email}
							error={registered && email.length > 0}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Grid>{" "}
					<FormHelperText error={registered && email.length > 0}>
						{registered
							? "This email ID is already registered for compensation!"
							: ""}
					</FormHelperText>
				</Grid>

				<Button
					type="submit"
					variant="contained"
					color="secondary"
					className={classes.submit}
					onClick={submitHelper}
					disabled={registered || linkSent || loading}
				>
					{!linkSent ? "Register" : "Check your inbox!"}
				</Button>
				{loading && (
					<div className={classes.progress}>
						<CircularProgress color="secondary" size={28} />
					</div>
				)}
				{linkSent && (
					<>
						<Typography
							variant="caption"
							gutterBottom
							align="center"
						>
							You'll receive an email to <b>{email}</b>
						</Typography>{" "}
						<Typography
							variant="caption"
							gutterBottom
							align="center"
						>
							Follow the link in the email to finish registering
							for compensation!
						</Typography>
					</>
				)}
			</form>
		</div>
	);
};

export default SignUp;
