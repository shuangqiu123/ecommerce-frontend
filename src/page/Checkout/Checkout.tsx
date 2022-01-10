import ShopLayout from "@/layout/ShopLayout";
import React from "react";
// import { TabularItem as Item } from "@/components/Item";
import styles from "./Checkout.less";
import { Checkbox, Form, Input, Select } from "antd";
import Button from "@/components/Button";

const { Option } = Select;
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const Checkout: React.FC = () => {
	const [form] = Form.useForm();

	return (
		<ShopLayout breadCrumb={[{
			name: "Check Out"
		}]}>
			<div className={styles.container}>
				<div className={styles.form}>
					<h2 className={styles.title}>Delivery Address</h2>
					<Form
						layout={"vertical"}
						form={form}
						validateTrigger="onBlur"
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
						<Form.Item name="remember" valuePropName="checked" >
							<div className={styles.linkContainer}>
								<Checkbox>Save the information for a quicker checkout</Checkbox>
							</div>
						</Form.Item>
						<Form.Item className={styles.button}>
							<Button name="Check Out Now" onClick={()=>null} />
						</Form.Item>
					</Form>
				</div>
				<div className={styles.order}>
					<h1 className={styles.title}>
						Your Order
						<span>1 Item</span>
					</h1>
					<div className={styles.itemContainer}>
						<ul className={styles.itemList}>
							{/* <li className={styles.item}>
								<Item checkout quantity={1}/>
							</li>
							<li className={styles.item}>
								<Item checkout quantity={1}/>
							</li>
							<li className={styles.item}>
								<Item checkout quantity={1}/>
							</li> */}
						</ul>
					</div>
					<div className={styles.summary}>
						<span>Order Total</span>
						<span className={styles.price}>$36.00</span>
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default Checkout;