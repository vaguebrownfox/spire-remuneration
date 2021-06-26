// form context
import createDataContext from "../createDataContext";

// Initial State
const formInitialState = {
	loading: false,
	userName: "",
	fullName: "",
	email: "",
	mobileNumber: "",
	paymentType: "",
	paymentId: "",
};

// Reducer
const formReducer = (state, action) => {
	switch (action.type) {
		case "SET_LOADING":
			return { ...state, loading: action.payload };
		default:
			return state;
	}
};

// Actions

const formLoadAction = (dispatch) => {
	return () => {
		dispatch({ type: "SET_LOADING", payload: true });

		console.log("form action log");

		dispatch({ type: "SET_LOADING", payload: false });
	};
};

const formSetFieldAction = (dispatch) => {
	return (field) => {
		console.log("form set action log");
	};
};

// Export
export const { Context, Provider } = createDataContext(
	formReducer,
	{
		formLoadAction,
		formSetFieldAction,
	},
	formInitialState
);
