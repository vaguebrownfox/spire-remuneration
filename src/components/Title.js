import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Typography } from "@material-ui/core";

const WEBAPP_LINK = "https://asquire.web.app";

const Title = ({ userid, username }) => {
	const classes = useStyles();

	const [wait, setWait] = React.useState(true);

	React.useEffect(() => {
		setTimeout(() => setWait(false), 5000);
	}, []);
	return (
		<div className={classes.title}>
			<>
				<Typography
					variant="h4"
					component="div"
					align="center"
					gutterBottom
				>
					<br />
					{wait ? (
						<>
							{getGreet()}
							<br />
							Please wait while app is verifying your{" "}
							<span className={classes.spn}>
								<b>Asquire USER ID</b>
							</span>
							<br />
							<div>
								<CircularProgress
									style={{ margin: 32 }}
									color="secondary"
									size={28}
								/>
							</div>
						</>
					) : (
						<>
							{`Hmmm... no user ID found! `}
							<br />
							<br />
							{`Please visit `}
							<span className={classes.spn}>
								<b>{`Asquire`}</b>
							</span>
							{` project Web-app for participating in our research!`}
							<br />
						</>
					)}
				</Typography>
				<Button
					className={classes.btn}
					variant="outlined"
					color="secondary"
					href={WEBAPP_LINK}
				>
					Go to Web-App
				</Button>
				<Typography
					variant="h6"
					component="div"
					align="center"
					gutterBottom
				>
					Thank you!
				</Typography>
			</>
		</div>
	);
};

const useStyles = makeStyles((theme) => ({
	title: {
		flex: 1,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		padding: theme.spacing(2),
	},
	spn: {
		color: theme.palette.secondary.main,
	},
	btn: {
		margin: theme.spacing(2),
		textTransform: "none",
	},
}));

const getGreet = () => {
	var d = new Date();
	var time = d.getHours();

	if (time < 12) {
		return "Good morning!";
	}
	if (time > 12 && time < 17) {
		return "Good afternoon!";
	}
	if (time > 5) {
		return "Good evening!";
	}
};

export default Title;
