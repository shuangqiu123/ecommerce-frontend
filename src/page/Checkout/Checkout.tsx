import ShopLayout from "@/layout/ShopLayout";
import React, { useEffect, useState } from "react";
import { TabularItem as Item } from "@/components/Item";
import styles from "./Checkout.less";
import { Checkbox, Form, Input, Modal, Select } from "antd";
import Button from "@/components/Button";
import { useDispatch } from "react-redux";
import { EOrderActionTypes } from "@/common/Order";
import { useHistory, Prompt } from "react-router-dom";
import { IItemDisplay } from "@/interface/Item";
import CopyOutlined from "@ant-design/icons/CopyOutlined";
import Error from "@/components/Error";
import { IOrderGetResponse, IOrderCompletionResponse, IOrderShipping, IOrderShippingForm } from "@/interface/Order";
import { setLoading } from "@/store/Loading/action";

const { Option } = Select;
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

const Checkout: React.FC = () => {
	const history = useHistory();
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const [error, setError] = useState<boolean>(false);
	const [price, setPrice] = useState<number>(0);
	const [items, setItems] = useState<IItemDisplay[]>([]);
	const [disable, setDisable] = useState<boolean>(false);
	const [viewOnly, setViewOnly] = useState<boolean>(true);
	const [isModalVisible, setIsModalVisible] = useState(false);
	
	useEffect(() => {
		const path = history.location.pathname;
		const orderId = path.split("/")[2];
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
				setViewOnly(response.viewOnly);
				if (response.viewOnly) {
					setDisable(true);
				}
			}
		});
		dispatch({
			type: EOrderActionTypes.getShippingInfo,
			callback: (info: IOrderShippingForm) => {
				form.setFieldsValue(info);
			}
		});
	}, [dispatch, history, form]);

	const checkoutOnClick = () => {
		form.validateFields()
			.then(values => {
				setIsModalVisible(true);
			});
	};

	const handleOk = () => {
		const values: IOrderShippingForm = form.getFieldsValue();
		const path = history.location.pathname;
		const orderId = path.split("/")[2];
		const ordershipping: IOrderShipping = {
			receiverAddress: values.streetaddress1 + " " + values.streetaddress2,
			receiverCity: values.suburb,
			receiverName: values.firstname + " " + values.lastname,
			receiverState: values.state,
			receiverZip: values.postcode
		};
		if (values.remember) {
			dispatch({
				type: EOrderActionTypes.saveShippingInfo,
				payload: values
			});
		}
		dispatch({
			type: EOrderActionTypes.getOrderPayment,
			payload: {
				orderId: orderId,
				shippingDto: ordershipping
			},
			callback: (data?: IOrderCompletionResponse, error?: string) => {
				dispatch(setLoading(false));
				if (error) {
					history.push("/user/home/orderHistory");
					return;
				}
				if (data?.isChanged && data.items !== void(0) ) {
					if (data.items.length === 0) {
						history.push("/user/home/orderHistory");
						return;
					}
					setItems(data.items);
					return;
				}
				if (!data?.url) return;
				window.location.href = data?.url;
				setDisable(true);
			}
		});
		dispatch(setLoading(true));
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};
	const checkout = (
		<div className={styles.container}>
			{!viewOnly && <Prompt message={"Are you sure you want to leave? Your order will be saved."}/>}
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
							disabled={disable}
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
							disabled={disable}
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
							disabled={disable}
						/>
					</Form.Item>
					<Form.Item
						label="Street Address (Optional)"
						name="streetaddress2"
					>
						<Input
							className={styles.input}
							placeholder=""
							disabled={disable}
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
							disabled={disable}
						/>
					</Form.Item>
					<Form.Item
						label="State"
						name="state"
						rules={[{ required: true, message: "Please enter your state." }]}
					>
						<Select disabled={disable}>
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
							disabled={disable}
						/>
					</Form.Item>
					{!viewOnly &&<Form.Item name="remember" valuePropName="checked" >
						<div className={styles.linkContainer}>
							<Checkbox>Save the information for a quicker checkout</Checkbox>
						</div>
					</Form.Item>}
					{!viewOnly && <Form.Item className={styles.button}>
						<Button name="Check Out Now" onClick={checkoutOnClick} />
					</Form.Item>}
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
			<Modal
				title="You will be directed to Paypal Sandbox Payment"
				visible={isModalVisible}
				onOk={handleOk}
				okText="Continue To Payment"
				onCancel={handleCancel}
				cancelText="Go Back"
			>
				<p>To complete the payment, you will be directed to Paypal Sandbox. Please use the sample account below to make the mock payment.</p>
				<Form
					layout={"vertical"}
					validateTrigger="onBlur"
				>
					<Form.Item label="Email">
						<Input.Search
							value={"sample@123.com"}
							onSearch={(value) => {navigator.clipboard.writeText(value);} }
							enterButton={<CopyOutlined />}
						/>
					</Form.Item>
					<Form.Item label="Password">
						<Input value={"123456789"}/>
					</Form.Item>
				</Form>
			</Modal>
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