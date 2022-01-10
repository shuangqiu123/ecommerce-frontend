import ErrorComponent from "@/components/Error";
import BasicLayout from "@/layout/BasicLayout";
import React from "react";
import styles from "./Error.less";

const Error: React.FC = () => {
	return (
		<BasicLayout flexbox>
			<div className={styles.errorContainer}><ErrorComponent /></div>
		</BasicLayout>
	);
};

export default Error;