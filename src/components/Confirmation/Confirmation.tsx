import React from "react";
import { useHistory } from "react-router-dom";
import BasicLayout from "@/layout/BasicLayout";
import Button from "@/components/Button";
import CustomForm from "@/components/Form";
import styles from "./Confirmation.less";

interface IConfirmationProps {
	title: string;
	description: string;
	buttonName: string;
	address: string;
}

const Confirmation: React.FC<IConfirmationProps> = ({
	title,
	description,
	buttonName,
	address
}) => {
	const history = useHistory();

	return (
		<BasicLayout flexbox>
			<CustomForm title={title} className={styles.container}>
				<div className={styles.description}>{description}</div>
				<Button name={buttonName} onClick={() => history.push(address)} reverse />
			</CustomForm>
		</BasicLayout>
	);
};

export default Confirmation;