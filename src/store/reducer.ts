import { combineReducers } from "redux";
import user from "./User/reducer";
import oauth from "./OAuth/reducer";
import error from "./Error/reducer";

export default combineReducers({
	user,
	oauth,
	error
});