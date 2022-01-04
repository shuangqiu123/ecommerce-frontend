import ShopLayout from "@/layout/ShopLayout";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { TabularItem as Item } from "@/components/Item";
import styles from "./Cart.less";
import { Input, Modal } from "antd";
import Button from "@/components/Button";
import BasicLayout from "@/layout/BasicLayout";
import SignIn from "@/components/SignIn";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";

const Cart: React.FC = () => {
	const history = useHistory();
	const [isModalVisible, setIsModalVisible] = useState(false);
	const empty = false;

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const checkout = () => {
		showModal();
	};

	const emptyCart = (
		<BasicLayout onePage>
			<div className={styles.emptyCartContainer}>
				<h1 className={styles.title}>
					Shopping Bag
				</h1>
				<div className={styles.description}>
					<ShoppingOutlined className={styles.icon} />
					<span>Your shopping bag is currently empty.</span>
					<Button name="START SHOPPING" onClick={() => history.push("/")} classname={styles.button} />
				</div>
				<div className={styles.prompt}>
					<span>Sign In or Create an Account.</span>
					<Button name="SIGN IN" onClick={() => history.push("/user/login")} classname={styles.button} reverse />
					<Button name="CREATE ACCOUNT" onClick={() => history.push("/user/signup")} classname={styles.button} reverse />
				</div>
			</div>
		</BasicLayout>
	);
	
	const cart = (
		<ShopLayout>
			<div className={styles.cartContainer}>
				<div className={styles.shoppingBag}>
					<h1 className={styles.title}>
						Shopping Bag
						<span>1 Item</span>
					</h1>
					<div className={styles.itemContainer}>
						<ul className={styles.itemList}>
							<li className={styles.item}>
								<Item />
							</li>
							<li className={styles.item}>
								<Item />
							</li>
							<li className={styles.item}>
								<Item />
							</li>
						</ul>
					</div>
				</div>
				<div className={styles.summary}>
					<div className={styles.promo}>
						<Input placeholder="Promo Code" />
						<Button name="Apply" reverse onClick={()=>null} classname={styles.button} />
					</div>
					<div className={styles.total}>
						<span>Order Total</span>
						<span className={styles.price}>$36.00</span>
					</div>
					<div className={styles.checkout}>
						<Button name="CHECK OUT" reverse onClick={checkout} />
					</div>
				</div>
			</div>
			<Modal title="You need to Sign In to continue" visible={isModalVisible} footer={null} onCancel={handleCancel}>
				<SignIn />
			</Modal>
		</ShopLayout>
	);

	return empty? emptyCart : cart;
};

export default Cart;