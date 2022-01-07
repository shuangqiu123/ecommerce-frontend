import React from "react";
import { useHistory } from "react-router-dom";
import BasicLayout from "@/layout/BasicLayout";
import Button from "@/components/Button";
import CustomForm from "@/components/Form";
import styles from "./Confirmation.less";
import { Spin } from "antd";

interface IConfirmationProps {
	title: string;
	description: string;
	buttonName: string;
	address: string;
	loading?: boolean;
}

const Confirmation: React.FC<IConfirmationProps> = ({
	title,
	description,
	buttonName,
	address,
	loading
}) => {
	const history = useHistory();

	return (
		<BasicLayout flexbox>
			{loading ? (<Spin></Spin>) :
					(
						<CustomForm title={title} className={styles.container}>
							<div className={styles.description}>{description}</div>
							<Button name={buttonName} onClick={() => history.push(address)} reverse />
						</CustomForm>
					)
			}
		</BasicLayout>
	);
};

export default Confirmation;