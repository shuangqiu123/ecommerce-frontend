import React from "react";
import classnames from "classnames";
import styles from "./Form.less";

interface IFormProps {
	title: string;
	className?: string;
}

const Form: React.FC<IFormProps> = ({
	title,
	className,
	children
}) => {

	return (
		<div className={classnames(styles.formContainer, className)}>
			{title && <h1 className={styles.title}>{title}</h1>}
			{children}
		</div>
	);
};


export default Form;