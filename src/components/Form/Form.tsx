import React from "react";
import { useDispatch } from "react-redux";
import styles from "./Form.less";
import { EOAuthActionTypes } from "@/common/OAuth";

interface IFormProps {
	title: string;
}

const Form: React.FC<IFormProps> = ({
	title,
	children
}) => {
	const dispatch = useDispatch();

	return (
		<div className={styles.formContainer}>
			<h1 className={styles.title}>{title}</h1>
			{children}
		</div>
	);
};


export default Form;