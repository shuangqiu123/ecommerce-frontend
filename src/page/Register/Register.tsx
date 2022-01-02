import { IStoreState } from "@/interface/Redux";
import BasicLayout from "@/layout/BasicLayout";
import Form from "@/components/Form";
import { Form as AntForm, Input } from "antd";
import React, { useEffect } from "react";
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

	useEffect(() => {
		if (userName) {
			history.push(`/${userName}`);
			return;
		}
	}, [history, userName, email]);

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
			const payload: IUserPostRequest = oauthSignUp ? {
				...value,
				email,
				name
			}: {
				...value
			};

			// console.log(payload);

			dispatch({
				type: EUserActionTypes.signup,
				payload: payload
			});
			form.resetFields();
		});
	};

	return (
		<BasicLayout onePage={true}>
			<Form
				title={email.length > 0 ? "Finish your sign up" : "Sign Up"}
			>
				<AntForm
					layout={"vertical"}
					form={form}
					validateTrigger="onFinish"
				>
					{!oauthSignUp && <AntForm.Item
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
							placeholder="Enter your Email"
						/>
					</AntForm.Item>}
					<AntForm.Item
						label="Username"
						name="userName"
						className={styles.formItem}
						rules={[
							{ required: true, message: "Please enter a username" },
							{ min: 4, message: "Username must be minimum of 4 characters" },
							{
								pattern: /^[a-z]*[0-9]*$/,
								message: "Username should be consist of lowercase characters or digits"
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
					</AntForm.Item>
				</AntForm>
				<Button name="CREATE ACCOUNT" onClick={onSubmit} reverse />
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