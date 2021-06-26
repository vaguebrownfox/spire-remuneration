import { auth } from "./firebase";

const authObj = auth();

authObj.setPersistence(auth.Auth.Persistence.SESSION);

export { authObj };

export const signInWithEmailID = async (email, userID) => {
	const actionCodeSettings = {
		url: `${window.location.href}?userid=${userID}`,
		handleCodeInApp: true,
	};
	console.log();
	const res = await auth()
		.sendSignInLinkToEmail(email, actionCodeSettings)
		.then(() => {
			window.localStorage.setItem("emailForSignIn", email);
			return true;
		})
		.catch((e) => {
			console.log(" signup ::send link error", e);
			return false;
		});

	return res;
};

export const getVerifier = (element) =>
	new auth.RecaptchaVerifier(element, {
		size: "invisible",
	});

const verifyAuthUrl = (url) => {
	const isEmailLink = auth().isSignInWithEmailLink(url);
	return isEmailLink;
};

export const signInWithEmailLink = async () => {
	const url = window.location.href;
	const isEmailLink = verifyAuthUrl(url);
	if (isEmailLink) {
		let email = window.localStorage.getItem("emailForSignIn");
		if (!email) {
			email = window.prompt(
				"Seems like you are signing in from a different device or browser window; Please provide your email for confirmation"
			);
		}

		try {
			await auth().signInWithEmailLink(email, url);
			window.localStorage.removeItem("emailForSignIn");

			let parsee = window.location.search;
			const val = new URLSearchParams(parsee).get("continueUrl");
			console.log(val);

			window.location.href = val;
		} catch (e) {
			console.log("email link url error", e);
		}
	}
};
