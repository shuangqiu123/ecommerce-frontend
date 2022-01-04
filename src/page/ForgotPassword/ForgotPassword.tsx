import BasicLayout from "@/layout/BasicLayout";
import React from "react";
import { useDispatch } from "react-redux";
import FormContainer from "@/components/Form";
import styles from "./ForgotPassword.less";
import { Form, Input } from "antd";
import Button from "@/components/Button";
import { EUserActionTypes } from "@/common/User";

const ForgotPassword: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const onSubmit = () => {
		form.validateFields().then(value => {
			const payload: string = {
				...value
			};
			dispatch({
				type: EUserActionTypes.forgotPassword,
				payload: payload
			});
			form.resetFields();
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

	return (
		<BasicLayout flexbox>
			<div className={styles.container}>
				{EmailInput}
			</div>
		</BasicLayout>
	);
};

export default ForgotPassword;