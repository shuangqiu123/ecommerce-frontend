import { IStoreState } from "@/interface/Redux";
import BasicLayout from "@/layout/BasicLayout";
import Form from "@/components/Form";
import { Form as AntForm, Input } from "antd";
import React from "react";
import { connect, useDispatch } from "react-redux";
import styles from "./Register.less";
import { IUserPostRequest } from "@/interface/User";
import { EUserActionTypes } from "@/common/User";
import { useHistory } from "react-router";
import Button from "@/components/Button";
import { EOAuthActionTypes } from "@/common/OAuth";
import GoogleOutlined from "@ant-design/icons/GoogleOutlined";
import Icon from "@/components/Icon";

interface IRegisterProps {
	userName: string;
	email: string;
	name: string;
	oauthSignUp: boolean;
}

const Register: React.FC<IRegisterProps> = ({
	userName,
	email,
	name,
	oauthSignUp
}) => {
	const [form] = AntForm.useForm();
	const dispatch = useDispatch();
	const history = useHistory();

	const googleOnClick = () => {
		dispatch({
			type: EOAuthActionTypes.googleSignIn,
			callback: (url: string) => {
				window.location.href = url;
			}
		});
	};

	const onSubmit = () => {
		form.validateFields().then(value => {
			const payload: IUserPostRequest = {
				...value
			};
			dispatch({
				type: EUserActionTypes.signup,
				payload: payload,
				callback
			});
		});
	};

	const callback = (error?: Record<string, string>) => {
		if (error) {
			if (error.username) {
				form.setFields([
					{
					  name: "username",
					  errors: [error["username"]],
					}
				]);
			}
			if (error.email) {
				form.setFields([
					{
						name: "email",
						errors: [error["email"]],
					  },
				]);
			}
			return;
		}
		history.push("/user/signup/confirm");
	};

	return (
		<BasicLayout flexbox>
			<Form
				title={email.length > 0 ? "Finish your sign up" : "Sign Up"}
			>
				<AntForm
					layout={"vertical"}
					form={form}
					validateTrigger="onBlur"
				>
					{!oauthSignUp && <AntForm.Item
						label="Email"
						name="email"
						className={styles.formItem}
						rules={[
							{ required: true, message: "Please enter an email." },
							{
								// eslint-disable-next-line no-useless-escape
								pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
								message: "Incorrect Email Format"
							}
						]}
					>
						<Input
							className={styles.input}
							placeholder="Enter your Email"
						/>
					</AntForm.Item>}
					<AntForm.Item
						label="Username"
						name="username"
						className={styles.formItem}
						rules={[
							{ required: true, message: "Please enter a username." },
							{ pattern: /^[a-zA-Z0-9]{4,16}$/, 
							  message: "Username should contain letters and digits and the length is between 4 and 16."
							}
						]}
					>
						<Input
							className={styles.input}
							placeholder="Enter your username"
						/>
					</AntForm.Item>
					<AntForm.Item
						label="Password"
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
					</AntForm.Item>
				</AntForm>
				<Button name="CREATE ACCOUNT" onClick={onSubmit} reverse classname={styles.button} />
				<div className={styles.bottomContainer}>
					<p className={styles.text}>Or you can sign up with:</p>
					<div className={styles.iconContainer} onClick={googleOnClick}>
						<Icon title="google">
							<GoogleOutlined />
						</Icon>
					</div>
				</div>
			</Form>
		</BasicLayout>
	);
};

export default connect(({ user }: IStoreState) => ({
	email: user.email,
	name: user.name,
	userName: user.userName,
	oauthSignUp: user.email.length > 0,
}))(Register);