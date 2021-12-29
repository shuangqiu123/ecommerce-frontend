import { EUserActionTypes } from "@/common/User";
import { IAction } from "@/interface/Redux";
import { User } from "@/interface/User";

export const setUser = (user: User) :IAction<User> => ({
	type: EUserActionTypes.setUser,
	payload: user
});