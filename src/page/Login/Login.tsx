import React from "react";
import { Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import BasicLayout from "@/layout/BasicLayout";
import CustomForm from "@/components/Form";
import styles from "./Login.less";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";
import { EUserActionTypes } from "@/common/User";
import { IUserLoginRequest } from "@/interface/User";
import { EOAuthActionTypes } from "@/common/OAuth";

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
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			}).catch(error => {
			});
	};

	const googleOnClick = () => {
		dispatch({
			type: EOAuthActionTypes.googleSignIn,
			callback: (url: string) => {
				window.location.href = url;
			}
		});
	};

	return (
		<BasicLayout onePage={true}>
			<CustomForm title="Sign In">
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
				<div className={styles.bottomContainer}>
					<p><span className={styles.boldText}>Need an account?</span> Sign up&nbsp;
						<a href="/user/signup" className={styles.link}>here</a>
					</p>
					<p className={styles.text}>Or you can sign in with:</p>
					<div className={styles.iconContainer} onClick={googleOnClick}>
						<Icon title="google">
							<GoogleOutlined />
						</Icon>
					</div>
				</div>
			</CustomForm>
		</BasicLayout>
	);
};

export default Login;