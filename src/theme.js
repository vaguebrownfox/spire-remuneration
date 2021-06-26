import { red, grey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app

const o = 1;

const theme = createMuiTheme({
	palette: {
		primary: {
			// main: "#BF0404",
			main: grey[100],
		},
		secondary: {
			main: "#BF4904",
			// background: `linear-gradient(45deg, #BF4904,  #BF0404)`,
			background: `linear-gradient(90deg, rgba(191,73,4,1) 0%, rgba(217,61,4,1) 50%, rgba(191,4,4,1) 95%, rgba(191,73,4,1) 100%)`,
			background_o: `linear-gradient(90deg, rgba(191,73,4,${o}) 0%, rgba(217,61,4,,${o}) 50%, rgba(191,4,4,,${o}) 95%, rgba(191,73,4,,${o}) 100%)`,
			background_rev: `linear-gradient(45deg, #BF0404 ,  #BF4904)`,
			card: "#faebd7",
			// main: "#BF0404",
		},
		error: {
			main: red.A400,
		},
		background: {
			default: grey[100],
		},
	},
	overrides: {
		MuiStepIcon: {
			root: {
				"&$completed": {
					color: "#BF4904B3",
				},
				"&$active": {
					color: "#BF4904",
				},
			},
			text: {
				fill: grey[100],
			},
			active: {},
			completed: {},
		},
		MuiStepLabel: {
			label: {
				"&$completed": {
					color: grey[800],
				},
				"&$active": {
					color: grey[900],
				},
				color: grey[800],
			},
		},
	},
});

export default theme;
