import Button from "@/components/Button";
import { Form, Input, Select } from "antd";
import React from "react";
import styles from "./Shipping.less";

const { Option } = Select;
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const Shipping: React.FC = () => {
	const [form] = Form.useForm();


	const onSubmit = () => {
		//
	};

	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<h1>Shipping Address</h1>
			</div>
			<Form
				layout={"vertical"}
				form={form}
				validateTrigger="onBlur"
				className={styles.form}
			>
				<Form.Item
					label="First Name"
					name="firstname"
					rules={[{ required: true, message: "Please enter your first name." }]}
				>
					<Input
						className={styles.input}
						placeholder=""
					/>
				</Form.Item>
				<Form.Item
					label="Last Name"
					name="lastname"
					rules={[{ required: true, message: "Please enter your last name." }]}
				>
					<Input
						className={styles.input}
						placeholder=""
					/>
				</Form.Item>
				<Form.Item
					label="Street Address"
					name="streetaddress1"
					rules={[{ required: true, message: "Please enter your address." }]}
				>
					<Input
						className={styles.input}
						placeholder=""
					/>
				</Form.Item>
				<Form.Item
					label="Street Address (Optional)"
					name="streetaddress2"
				>
					<Input
						className={styles.input}
						placeholder=""
					/>
				</Form.Item>
				<Form.Item
					label="Suburb"
					name="suburb"
					rules={[{ required: true, message: "Please enter your suburb." }]}
				>
					<Input
						className={styles.input}
						placeholder=""
					/>
				</Form.Item>
				<Form.Item
					label="State"
					name="state"
					rules={[{ required: true, message: "Please enter your state." }]}
				>
					<Select>
						{states.map(state => (
							<Option key={state}>{state}</Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Postcode"
					name="postcode"
					rules={[{ required: true, message: "Please enter your postcode." }]}
				>
					<Input
						className={styles.input}
						placeholder=""
					/>
				</Form.Item>
				<div className={styles.button}><Button name="Save" onClick={onSubmit} reverse /></div>
			</Form>
		</div>
	);
};

export default Shipping;