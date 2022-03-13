import { db } from "./firebase";
import { REMUN_COLLECTION } from "./firebaseSetup";

export const getRegisterRef = (email) =>
	db.collection(REMUN_COLLECTION).doc(email);

export const setRegister = async (form) => {
	let res = false;

	const remunEmailRef = db.collection(REMUN_COLLECTION).doc(form.email);

	await remunEmailRef
		.set({ [form.userid]: JSON.stringify(form) })
		.then(() => {
			res = true;
		})
		.catch((e) => {
			console.log("firestore ::set register error", e);
			res = false;
		});

	// const remunRef = db
	// 	.collection(REMUN_COLLECTION)
	// 	.doc(form.email)
	// 	.collection("registered-users")
	// 	.doc(form.userid);
	// await remunRef
	// 	.set({
	// 		...form,
	// 		paid: false,
	// 		verified: false,
	// 	})
	// 	.then(() => {
	// 		res = true;
	// 	})
	// 	.catch((e) => {
	// 		console.log("firestore ::set register error", e);
	// 		res = false;
	// 	});
	return res;
};
