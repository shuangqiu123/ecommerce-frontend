import React from "react";
import styles from "./Item.less";
import image from "@/asset/image.jpg";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";

const Item: React.FC= () => {
	return (
		<div className={styles.itemContainer}>
			<div className={styles.item}>
				<a href="/item">
					<img src={image} alt="The item" className={styles.image} />
				</a>
				<div className={styles.icons}>
					<HeartOutlined className={styles.icon} />
					<ShoppingOutlined className={styles.icon} />
				</div>
				<div className={styles.click}>
					<div className={styles.firstLine}>
						<span className={styles.title}>Switch Pro Controller</span>
					</div>
					<div>
						<span className={styles.price}>$12.00</span>
					</div>
					<div>
						<span className={styles.description}>Shop Today</span>
					</div>
					<div>
						<span className={styles.description}>New In</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;