import React from "react";
import { Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import CustomForm from "@/components/Form";
import styles from "./SignIn.less";
import Button from "@/components/Button";
import { EUserActionTypes } from "@/common/User";
import { IUserLoginRequest } from "@/interface/User";

const Login: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();

	const submit = () => {
		form
			.validateFields()
			.then(values => {
				const loginForm: IUserLoginRequest = {
					password: values.password
				};
				// eslint-disable-next-line no-useless-escape
				if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.usernameOrEmail)) {
					loginForm.email = values.usernameOrEmail;
				}
				else {
					loginForm.userName = values.usernameOrEmail;
				}
				const callback = () => {
					form.resetFields();
				};
				dispatch({
					type: EUserActionTypes.login,
					payload: loginForm,
					callback: callback
				});
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			}).catch(error => {
			});
	};

	return (
		<CustomForm title="" className={styles.signinModal}>
			<Form
				layout={"vertical"}
				form={form}
				validateTrigger="onFinish"
			>
				<Form.Item
					label="Username"
					name="usernameOrEmail"
					rules={[{ required: true, message: "Please enter a username" }]}
				>
					<Input
						className={styles.input}
						placeholder="Enter your username or email here"
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
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
				<Form.Item name="remember" valuePropName="checked" >
					<div className={styles.linkContainer}>
						<Checkbox>Remember me</Checkbox>
						<a href="/user/forgotPassword" className={styles.link}>Forgot Password?</a>
					</div>
				</Form.Item>
			</Form>
			<Button name="SIGN IN" onClick={submit} reverse />
		</CustomForm>
	);
};

export default Login;