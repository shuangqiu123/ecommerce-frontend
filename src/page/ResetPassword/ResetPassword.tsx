import BasicLayout from "@/layout/BasicLayout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FormContainer from "@/components/Form";
import styles from "./ResetPassword.less";
import { Form, Input } from "antd";
import Button from "@/components/Button";
import { EUserActionTypes } from "@/common/User";
import { useHistory, useLocation } from "react-router-dom";
import Confirmation from "@/components/Confirmation";
import { Rule } from "antd/lib/form";

const Confirm = (
	<Confirmation
		title="Success"
		description="Your password has been reset."
		buttonName="Log In Now"
		address="/user/login"
	/>
);

const ResetPassword: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const search = useLocation().search;
	const history = useHistory();
	const token = new URLSearchParams(search).get("token");
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (!token) {
			history.push("/");
		}
	}, [history, token]);

	const onSubmit = () => {
		form.validateFields().then(value => {
			const payload = {
				...value,
				token
			};
			dispatch({
				type: EUserActionTypes.resetPassword,
				payload: payload
			});
			setSuccess(true);
		});
	};

	const rePasswordValidator = (rule: Rule, value: string) => {
		const password: string = form.getFieldValue("password");
		if (value !== password) {
			return Promise.reject("Two passwords are unmatched");
		}
		return Promise.resolve();
	};

	const resetPasswordForm = (
		<BasicLayout flexbox>
			<div className={styles.container}>
				<FormContainer title="Reset Password" className={styles.form}>
					<Form
						layout={"vertical"}
						form={form}
						validateTrigger="onBlur"
					>
						<Form.Item
							label="New Password"
							name="password"
							className={styles.formItem}
							rules={[
								{ required: true, message: "Please enter a password." },
								{
									pattern: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=\S+$).{8,20}$/,
									message: "Password should consist of both letters and digits and the length is between 8 and 20."
								}
							]}
						>
							<Input.Password
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
								{ validator: rePasswordValidator }
							]}
						>
							<Input.Password
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

	return success? Confirm : resetPasswordForm;
};

export default ResetPassword;