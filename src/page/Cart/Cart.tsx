import ShopLayout from "@/layout/ShopLayout";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { TabularItem as Item } from "@/components/Item";
import styles from "./Cart.less";
import { Input, Modal } from "antd";
import Button from "@/components/Button";
import BasicLayout from "@/layout/BasicLayout";
import SignIn from "@/components/SignIn";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";
import { useDispatch, useSelector } from "react-redux";
import { EItemActionType } from "@/common/Item";
import { IItemDisplay } from "@/interface/Item";
import { IStoreState } from "@/interface/Redux";

const Cart: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const isLogin = useSelector(({ user }: IStoreState) => user.username !== "");
	const cartItems = useSelector(({ item }: IStoreState) => item.cartItems);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [items, setItems] = useState<IItemDisplay[]>([]);

	useEffect(() => {
		dispatch({
			type: EItemActionType.getItemsFromCart,
			payload: cartItems,
			callback: (items: IItemDisplay[]) => {
				setItems(items);
			}
		});
	}, [dispatch, cartItems]);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	const checkout = () => {
		if (!isLogin) {
			showModal();
			return;
		}
	};

	const getQuantity = (id: string) => {
		for (const cartItem of cartItems) {
			if (cartItem.id === id) {
				return cartItem.quantity;
			}
		}
		return 1;
	};

	const itemOnChange = (quantity: number, id: string) => {
		dispatch({
			type: EItemActionType.updateCartItem,
			payload: {
				quantity,
				id
			}
		});
	};

	const getOrderTotal = () => {
		let price = 0;
		const obj = new Map();
		for (const cartItem of cartItems) {
			obj.set (cartItem.id, cartItem.quantity);
		}
		for (const item of items) {
			price += item.price * obj.get(item.id);
		}
		return price;
	};

	const emptyCart = (
		<BasicLayout>
			<div className={styles.emptyCartContainer}>
				<h1 className={styles.title}>
					Shopping Bag
				</h1>
				<div className={styles.description}>
					<ShoppingOutlined className={styles.icon} />
					<span>Your shopping bag is currently empty.</span>
					<Button name="START SHOPPING" onClick={() => history.push("/")} classname={styles.button} />
				</div>
				{!isLogin && (
					<div className={styles.prompt}>
						<span>Sign In or Create an Account.</span>
						<Button name="SIGN IN" onClick={() => history.push("/user/login")} classname={styles.button} reverse />
						<Button name="CREATE ACCOUNT" onClick={() => history.push("/user/signup")} classname={styles.button} reverse />
					</div>
				)}
			</div>
		</BasicLayout>
	);
	
	const cart = (
		<ShopLayout breadCrumb={[
			{
				name: "Check Out",
				path: "/cart"
			}
		]}>
			<div className={styles.cartContainer}>
				<div className={styles.shoppingBag}>
					<h1 className={styles.title}>
						Shopping Bag
						<span>{items.length === 1 ? "1 Item" : `${items.length} items`}</span>
					</h1>
					<div className={styles.itemContainer}>
						<ul className={styles.itemList}>
							{items.map((value, key) => (
								<li className={styles.item} key={key}>
									<Item
										id={value.id}
										image={value.image.split(";")[0]}
										title={value.title}
										quantity={getQuantity(value.id)}
										brand={value.brand}
										price={value.price}
										num={value.num}
										onChange={itemOnChange}
									/>
								</li>
							))}
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
						<span className={styles.price}>${Number(getOrderTotal()).toFixed(2)}</span>
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

	return cartItems.length === 0? emptyCart : cart;
};

export default Cart;