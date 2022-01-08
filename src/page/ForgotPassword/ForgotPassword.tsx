import BasicLayout from "@/layout/BasicLayout";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormContainer from "@/components/Form";
import styles from "./ForgotPassword.less";
import { Form, Input } from "antd";
import Button from "@/components/Button";
import { EUserActionTypes } from "@/common/User";
import Confirmation from "@/components/Confirmation";

const Confirm = (
	<Confirmation
		title="Reset Your Password"
		description="An email has been sent to your mail box. Please follow the prompt in the email to reset your password."
		buttonName="Return To Home"
		address="/"
	/>
);

const ForgotPassword: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [success, setSuccess] = useState<boolean>(false);

	const onSubmit = () => {
		form.validateFields().then(value => {
			const payload: string = value.email;
			dispatch({
				type: EUserActionTypes.forgotPassword,
				payload: payload
			});
			setSuccess(true);
		});
	};

	const EmailInput = (
		<FormContainer title="Forgot Password" className={styles.form}>
			<Form
				layout={"vertical"}
				form={form}
				validateTrigger="onFinish"
			>
				<Form.Item
					label="Email"
					name="email"
					className={styles.formItem}
					rules={[
						{ required: true, message: "Please enter an email" },
						{
							// eslint-disable-next-line no-useless-escape
							pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
							message: "Incorrect Email Format"
						}
					]}
				>
					<Input
						className={styles.input}
						placeholder="Enter your email to receive reset link"
					/>
				</Form.Item>
			</Form>
			<Button name="Submit" onClick={onSubmit} reverse />
		</FormContainer>
	);

	const emailForm = (
		<BasicLayout flexbox>
			<div className={styles.container}>
				{EmailInput}
			</div>
		</BasicLayout>
	);

	return success ? Confirm : emailForm;
};

export default ForgotPassword;