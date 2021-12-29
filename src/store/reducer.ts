import { combineReducers } from "redux";
import user from "./User/reducer";
import oauth from "./OAuth/reducer";

export default combineReducers({
	user,
	oauth
});