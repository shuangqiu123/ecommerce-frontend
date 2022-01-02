import React from "react";
import styles from "./Form.less";

interface IFormProps {
	title: string;
}

const Form: React.FC<IFormProps> = ({
	title,
	children
}) => {

	return (
		<div className={styles.formContainer}>
			<h1 className={styles.title}>{title}</h1>
			{children}
		</div>
	);
};


export default Form;