import Button from "@/components/Button";
import { Form, Input } from "antd";
import { Rule } from "antd/lib/form";
import React from "react";
import styles from "./Password.less";

const Password: React.FC = () => {
	const [form] = Form.useForm();
	
	const rePasswordValidator = (rule: Rule, value: string) => {
		const password: string = form.getFieldValue("password");
		if (value !== password) {
			return Promise.reject("Two passwords are unmatched");
		}
		return Promise.resolve();
	};

	const onSubmit = () => {
		//
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>Password Change</h1>
			</div>
			<Form
				layout={"vertical"}
				form={form}
				validateTrigger="onBlur"
				className={styles.form}
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
				<div className={styles.button}><Button name="Submit" onClick={onSubmit} reverse /></div>
			</Form>
		</div>
	);
};

export default Password;