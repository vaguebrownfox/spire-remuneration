import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import AsqAppBar from "./components/AsqAppBar";
import ShortForm from "./components/ShortForm";

import { Provider as FormProvider } from "./context/data/FormContext";
import { grey } from "@material-ui/core/colors";
import SignUp from "./components/SignUp";
import Title from "./components/Title";
import { useAuthState } from "react-firebase-hooks/auth";

import { authObj, signInWithEmailLink } from "./firebase/auth";

const App = () => {
	const classes = useStyles();
	const [user] = useAuthState(authObj);
	const [userID, setUserID] = React.useState(null);
	const [userName, setUsername] = React.useState(null);

	React.useLayoutEffect(() => {
		// authObj.signOut();
		signInWithEmailLink().then(() => {
			let parsee = window.location.search;
			const val = new URLSearchParams(parsee).get("userid");
			if (val) {
				window.localStorage.setItem("userid", val);
				window.location.href = "/";
			} else {
				let userid = window.localStorage.getItem("userid");
				if (userid) {
					let username = userid.split("_")[0];
					setUserID(userid);
					setUsername(username);
				}
				// window.localStorage.removeItem("userid");
			}
		});
	}, []);

	const bull = <span className={classes.bullet}>•</span>;

	return (
		<>
			{/* <ShortForm /> */}
			<Container
				className={classes.container}
				style={{ padding: 0 }}
				maxWidth="md"
			>
				<FormProvider>
					<AsqAppBar title="SPIRE Lab | Volunteer compensation" />

					{userID ? (
						user ? (
							<ShortForm
								userid={userID}
								username={userName}
								user={user}
							/>
						) : (
							<>
								<Title userid={userID} username={userName} />
								<div className={classes.sign}>
									<SignUp
										userid={userID}
										username={userName}
									/>
								</div>
							</>
						)
					) : (
						<>
							<Title userid={userID} username={userName} />
							<div className={classes.sign}>
								{bull}
								{bull}
								{bull}
							</div>
						</>
					)}
				</FormProvider>
			</Container>
		</>
	);
};

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		flexDirection: "column",
		alignSelf: "center",
		backgroundColor: grey[200],
		padding: 0,

		height: "100vh",

		borderStyle: "solid",
		borderTopWidth: 1,
		borderBottomWidth: 0,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		borderColor: theme.palette.secondary.main,
		borderTopColor: "#fff",

		overflow: "auto",
	},
	sign: {
		flex: 4,
		display: "flex",
		justifyContent: "center",
		alignItems: "flex-start",
	},
	bullet: {
		display: "inline-block",
		cursor: "none",
		margin: 4,
		transform: "scale(2)",
		"&:hover": {
			transform: "scale(2.5)",
			color: theme.palette.secondary.main,
		},
	},
}));

export default App;
