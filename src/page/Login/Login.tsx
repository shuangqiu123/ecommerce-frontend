import React from "react";
import { Form, Input } from "antd";
import { useDispatch } from "react-redux";
import BasicLayout from "@/layout/BasicLayout";
import CustomForm from "@/components/Form";
import styles from "./Login.less";
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
			}).catch(error => {
				console.log(error);
			});
	};

	return (
		<BasicLayout onePage={true}>
			<CustomForm title="Sign In" onSubmit={submit}>
				<Form
					layout={"vertical"}
					form={form}
					validateTrigger="onFinish"
				>
					<Form.Item
						label="Username / Email Address"
						name="usernameOrEmail"
						className={styles.formItem}
						rules={[{ required: true, message: "Please enter a username or password" }]}
					>
						<Input
							className={styles.input}
							placeholder="Enter your username or email here"
						/>
					</Form.Item>
					<Form.Item
						label="Password"
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
				</Form>
				<div className={styles.otherlink}>
					<a href="/user/signup">Sign Up</a>
				</div>
			</CustomForm>
		</BasicLayout>
	);
};

export default Login;