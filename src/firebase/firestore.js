import { db } from "./firebase";

const { REGISTER } = require("./firebaseConfig");

export const invitesQuery = (id) =>
	db.collection(REGISTER).where("sender", "==", id);

export const getRegisterRef = (email) => db.collection(REGISTER).doc(email); // ! keep

export const setRegister = async (form) => {
	const inviteRef = db.collection(REGISTER).doc(form.email);
	await inviteRef
		.set({
			...form,
			paid: false,
			verified: false,
		})
		.then(() => {
			//
		})
		.catch((e) => {
			console.log("firestore ::set register error", e);
		});
};
