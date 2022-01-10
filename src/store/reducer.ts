import { combineReducers } from "redux";
import user from "./User/reducer";
import oauth from "./OAuth/reducer";
import error from "./Error/reducer";
import loading from "./Loading/reducer";
import item from "./Item/reducer";

export default combineReducers({
	user,
	oauth,
	error,
	loading,
	item
});