import { EOAuthActionTypes } from "@/common/OAuth";
import { IAction } from "@/interface/Redux";

export const setURL = (url: string) :IAction<string> => ({
	type: EOAuthActionTypes.setURL,
	payload: url
});