import { EErrorActionTypes } from "@/common/Error";
import { IAction } from "@/interface/Redux";

export const setPageError = () :IAction<void> => ({
	type: EErrorActionTypes.setPageError
});

export const tokenError = () :IAction<void> => ({
	type: EErrorActionTypes.tokenError
});