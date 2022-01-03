import BasicLayout from "@/layout/BasicLayout";
import React from "react";
import { useDispatch } from "react-redux";
import FormContainer from "@/components/Form";
import styles from "./ResetPassword.less";
import { Form, Input } from "antd";
import Button from "@/components/Button";
import { EUserActionTypes } from "@/common/User";

const ResetPassword: React.FC = () => {
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

	return (
		<BasicLayout onePage>
			<div className={styles.container}>
				<FormContainer title="Reset Password" className={styles.form}>
					<Form
						layout={"vertical"}
						form={form}
						validateTrigger="onFinish"
					>
						<Form.Item
							label="New Password"
							name="password"
							className={styles.formItem}
							rules={[
								{ required: true, message: "Please enter a password" },
								{ min: 8, message: "Password must be minimum 8 characters" },
								{
									pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/,
									message: "Password should contain digits, uppercase and lowercase characters "
								}
							]}
						>
							<Input
								className={styles.input}
								placeholder="Enter your password here"
								type="password"
							/>
						</Form.Item>
						<Form.Item
							label="Re-enter your Password"
							name="repassword"
							className={styles.formItem}
							rules={[
								{ required: true, message: "Please enter a password" },
								{ min: 8, message: "Password must be minimum 8 characters" },
								{
									pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,32}$/,
									message: "Password should contain digits, uppercase and lowercase characters "
								}
							]}
						>
							<Input
								className={styles.input}
								placeholder="Enter your new password again"
								type="password"
							/>
						</Form.Item>
					</Form>
					<Button name="Submit" onClick={onSubmit} reverse />
				</FormContainer>
			</div>
		</BasicLayout>
	);
};

export default ResetPassword;