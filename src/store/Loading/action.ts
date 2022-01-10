import { ELoadingActionTypes } from "@/common/Loading";
import { IAction } from "@/interface/Redux";

export const setLoading = (loading: boolean) :IAction<boolean> => ({
	type: ELoadingActionTypes.setLoading,
	payload: loading
});