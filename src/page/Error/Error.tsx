import ErrorComponent from "@/components/Error";
import BasicLayout from "@/layout/BasicLayout";
import React from "react";

const Error: React.FC = () => {
	return (
		<BasicLayout onePage={true}>
			<ErrorComponent />
		</BasicLayout>
	);
};

export default Error;