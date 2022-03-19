import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import HomeIcon from "@material-ui/icons/HomeRounded";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import { Button, Card, Paper, Tooltip } from "@material-ui/core";
import { VERSION } from "../firebase/firebaseSetup";

// import { spire_logo_url, iisc_logo_url } from "../firebase/firebaseConfig";

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	toolbar: {
		background: theme.palette.secondary.background,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		color: theme.palette.primary.main,
	},
	link: {
		textDecoration: "none",
		"&:visited": {
			color: theme.palette.primary.contrastText,
		},
	},
	avatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		background: theme.palette.background.default,
		borderWidth: 1,
		borderColor: theme.palette.primary.contrastText,
	},
	avagroup: {
		marginRight: theme.spacing(2),
	},
	avatarDiv: {
		color: "inherit" /* blue colors for links too */,
		textDecoration: "none" /* no underline */,
		borderRadius: "50%",
		borderColor: theme.palette.secondary.dark,
	},
	warning: {
		color: "red",
		padding: theme.spacing(1),
	},
	note: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "center",
		alignContent: "center",
	},
	contact: {
		textTransform: "none",
		padding: 0,
		color: "blue",
	},
}));

function AsqAppBar({ title }) {
	const classes = useStyles();
	return (
		<>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="primary"
						aria-label="open drawer"
						href="/"
					>
						<HomeIcon />
					</IconButton>

					<Typography className={classes.title} variant="h5" noWrap>
						{title}
					</Typography>
					<div className={classes.grow} />
					<AvatarGroup max={4} className={classes.avagroup}>
						<a
							className={classes.avatarDiv}
							href="https://spire.ee.iisc.ac.in/spire/index.php"
							target="_blank"
							rel="noreferrer"
						>
							<Tooltip title="Spire Lab">
								<Avatar
									alt="Spire lab logo"
									variant="circular"
									src="/spire_logo_sq.png"
									className={classes.avatar}
								/>
							</Tooltip>
						</a>
						<a
							className={classes.avatarDiv}
							href="https://iisc.ac.in/"
							target="_blank"
							rel="noreferrer"
						>
							<Tooltip title="IISc Bangalore">
								<Avatar
									alt="IISc logo"
									variant="circular"
									src="iisc_logo_sq.png"
									className={classes.avatar}
								/>
							</Tooltip>
						</a>
					</AvatarGroup>
					<Typography
						variant="caption"
						style={{
							position: "absolute",
							bottom: 0,
							right: 0,
							fontSize: "8px",
							color: "white",
						}}
					>{`ver:${VERSION}`}</Typography>
				</Toolbar>
			</AppBar>
			<Paper className={classes.note}>
				<Typography
					variant="subtitle1"
					className={classes.warning}
				>{`Please contact us if you are having any issues with registrations`}</Typography>
				<Button
					className={classes.contact}
					variant="text"
					size="medium"
					color="secondary"
					target="_blank"
					rel="noreferrer"
					href={`https://asquire.web.app/contact`}
				>
					Contact
				</Button>
			</Paper>
		</>
	);
}

export default AsqAppBar;
