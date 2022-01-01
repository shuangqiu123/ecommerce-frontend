import React from "react";
import Button from "@/components/Button";
import { useHistory } from "react-router-dom";
import styles from "./Error.less";

const Error: React.FC = () => {
	const history = useHistory();
	return (
		<div className={styles.errorContainer}>
			<span className={styles.title}>404</span>
			<div className={styles.description}>
				<span>The information you requested is not found.</span>
			</div>
			<div className={styles.button}>
				<Button name="RETURN TO HOME" onClick={()=> history.push("/")} />
			</div>
		</div>
	);
};

export default Error;