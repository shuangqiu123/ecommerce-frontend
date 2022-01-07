import React, { useEffect, useState } from "react";
import Confirmation from "@/components/Confirmation";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EUserActionTypes } from "@/common/User";

const EmailVerification: React.FC = () => {
	const dispatch = useDispatch();
	const search = useLocation().search;
	const token = new URLSearchParams(search).get("token");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		dispatch({
			type: EUserActionTypes.verifyEmail,
			payload: token,
			callback: () => setLoading(false)
		});
	}, [dispatch, token]);

	return (
		<Confirmation
			title="Congratulation"
			description="You have succesfully verified your email!"
			buttonName="Return To Store"
			address="/"
			loading={loading}
		/>
	);
};

export default EmailVerification;