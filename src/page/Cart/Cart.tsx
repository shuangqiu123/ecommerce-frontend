import ShopLayout from "@/layout/ShopLayout";
import React from "react";
import Item from "./Item";
import styles from "./Cart.less";
import { Input } from "antd";
import Button from "@/components/Button";

const Cart: React.FC = () => {
	return (
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
						<Button name="CHECK OUT" reverse onClick={()=>null} />
					</div>
				</div>
			</div>
		</ShopLayout>
	);
};

export default Cart;