import { db } from "./firebase";
import { REMUN_COLLECTION } from "./firebaseSetup";

export const getRegisterRef = (email) =>
	db.collection(REMUN_COLLECTION).doc(email);

export const setRegister = async (form) => {
	let res = false;
	const inviteRef = db.collection(REMUN_COLLECTION).doc(form.email);
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
