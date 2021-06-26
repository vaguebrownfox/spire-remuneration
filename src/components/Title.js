import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Typography } from "@material-ui/core";

const Title = ({ userid, username }) => {
	const classes = useStyles();
	return (
		<div className={classes.title}>
			{userid ? (
				<>
					<Typography
						variant="h5"
						component="div"
						align="center"
						gutterBottom
					>
						Thank you{" "}
						<span className={classes.spn}>
							<b>{username}</b>
						</span>{" "}
						for participating in our research!
					</Typography>
					<Typography
						variant="h6"
						component="div"
						align="center"
						gutterBottom
					>
						Please enter your{" "}
						<span className={classes.spn}>
							<b>Email ID</b>
						</span>
					</Typography>
				</>
			) : (
				<>
					<Typography
						variant="h4"
						component="div"
						align="center"
						gutterBottom
					>
						{getGreet()}
						<br />
						Please visit{" "}
						<span className={classes.spn}>
							<b>Asquire</b>
						</span>{" "}
						project Web-app for participating in our research!
					</Typography>
					<Button
						className={classes.btn}
						variant="outlined"
						color="secondary"
						href="https://asquire-mox.web.app"
					>
						Go to Web App
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
			)}
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
