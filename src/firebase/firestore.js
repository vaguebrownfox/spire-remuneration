import { db } from "./firebase";

const { REGISTER } = require("./firebaseConfig");

export const getRegisterRef = (email) => db.collection(REGISTER).doc(email);

export const setRegister = async (form) => {
	let res = false;
	const inviteRef = db.collection(REGISTER).doc(form.email);
	await inviteRef
		.set({
			...form,
			paid: false,
			verified: false,
		})
		.then(() => {
			res = true;
		})
		.catch((e) => {
			console.log("firestore ::set register error", e);
			res = false;
		});
	return res;
};
