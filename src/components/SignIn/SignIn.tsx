/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useHistory } from "react-router-dom";
import { Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import CustomForm from "@/components/Form";
import styles from "./SignIn.less";
import Button from "@/components/Button";
import { EUserActionTypes } from "@/common/User";
import { IUserLoginRequest } from "@/interface/User";
import { EOrderActionTypes } from "@/common/Order";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";
import Icon from "../Icon";
import { EOAuthActionTypes } from "@/common/OAuth";

const Login: React.FC = () => {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const history = useHistory();

	const submit = () => {
		form
			.validateFields()
			.then(values => {
				const loginForm: IUserLoginRequest = {
					username: values.username,
					password: values.password,
					rememberMe: values.remember
				};

				dispatch({
					type: EUserActionTypes.login,
					payload: loginForm,
					callback: callback
				});
			});
	};

	const callback = (error?: Record<string, string>) => {
		if (error) {
			form.setFields([
				{
				  name: "username",
				  errors: [error["username"]],
				},
			 ]);
			return;
		}
		dispatch({
			type: EOrderActionTypes.createOrder,
			callback: (id?: string) => {
				if (!id) return;
				history.push("/checkout/" + id);
			}
		});
	};
	const googleOnClick = () => {
		dispatch({
			type: EOAuthActionTypes.googleSignIn,
			callback: (url?: string) => {
				if (!url) {
					return;
				}
				window.location.href = url;
			}
		});
	};
	return (
		<CustomForm title="" className={styles.signinModal}>
			<Form
				layout={"vertical"}
				form={form}
				validateTrigger="onBlur"
			>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{ required: true, message: "Please enter a username." },
						{ pattern: /^[a-zA-Z0-9]{4,16}$/, 
							  message: "Username should contain letters and digits and the length is between 4 and 16."
						}
					]}
				>
					<Input
						className={styles.input}
						placeholder="Enter your username here"
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
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
				<Form.Item name="remember" valuePropName="checked" >
					<div className={styles.linkContainer}>
						<Checkbox>Remember me</Checkbox>
						<a onClick={() => history.push("/user/forgotPassword")} className={styles.link}>Forgot Password?</a>
					</div>
				</Form.Item>
			</Form>
			<Button name="SIGN IN" onClick={submit} reverse />
			<div className={styles.bottomContainer}>
				<p className={styles.text}>Or you can sign in with:</p>
				<div className={styles.iconContainer} onClick={googleOnClick}>
					<Icon title="google">
						<GoogleOutlined />
					</Icon>
				</div>
			</div>
		</CustomForm>
	);
};

export default Login;