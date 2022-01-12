import ShopLayout from "@/layout/ShopLayout";
import React, { useEffect, useState } from "react";
import { TabularItem as Item } from "@/components/Item";
import styles from "./Checkout.less";
import { Checkbox, Form, Input, Select } from "antd";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { EOrderActionTypes } from "@/common/Order";
import { useHistory, Prompt } from "react-router-dom";
import { IItemDisplay } from "@/interface/Item";
import Error from "@/components/Error";
import { IOrderGetResponse } from "@/interface/Order";

const { Option } = Select;
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const Checkout: React.FC = () => {
	const history = useHistory();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [error, setError] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);
	const [items, setItems] = useState<IItemDisplay[]>([]);
	
	useEffect(() => {
		const path = history.location.pathname;
		const orderId = path.split("/")[2];
		console.log(orderId);
		if (!orderId) {
			setError(true);
			return;
		}
		dispatch({
			type: EOrderActionTypes.getOrder,
			payload: orderId,
			callback: (response?: IOrderGetResponse) => {
				if (!response) {
					setError(true);
					return;
				}
				setItems(response.items);
				setPrice(response.price);
			}
		});
	}, [dispatch, history]);

	const checkoutOnClick = () => {
		// 
	};

	const checkout = (
		<div className={styles.container}>
			<Prompt message={"Are you sure you want to leave? Your order will be saved."}/>
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
						<Button name="Check Out Now" onClick={checkoutOnClick} />
					</Form.Item>
				</Form>
			</div>
			<div className={styles.order}>
				<h1 className={styles.title}>
						Your Order
					<span>{items.length === 1 ? "1 Item" : `${items.length} items`}</span>
				</h1>
				<div className={styles.itemContainer}>
					<ul className={styles.itemList}>
						{items.map((value, key) => (
							<li className={styles.item} key={key}>
								<Item
									checkout
									quantity={value.quantity || 0}
									title={value.title}
									image={value.image.split(";")[0]}
									brand={value.brand}
									price={value.price}
									id={value.id}
									onChange={() => void(0)}
								/>
							</li>
						))}
					</ul>
				</div>
				<div className={styles.summary}>
					<span>Order Total</span>
					<span className={styles.price}>${Number(price).toFixed(2)}</span>
				</div>
			</div>
		</div>
	);

	return (
		<ShopLayout breadCrumb={[{
			name: "Check Out"
		}]}>
			{error ? (
				<div className={styles.errorContainer}><Error /></div>
			)
			 : checkout}
		</ShopLayout>
	);
};

export default Checkout;