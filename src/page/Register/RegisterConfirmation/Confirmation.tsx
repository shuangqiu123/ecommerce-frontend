import React from "react";
import Confirmation from "@/components/Confirmation";

const RegisterConfirm: React.FC = () => (
	<Confirmation
		title="Verify Your Email"
		description="A verification email has been sent to your mail box. Please go and verify your email!"
		buttonName="Return To Store"
		address="/"
	/>
);

export default RegisterConfirm;