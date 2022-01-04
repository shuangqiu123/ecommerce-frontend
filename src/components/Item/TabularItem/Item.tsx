import React from "react";
import styles from "./Item.less";
import image from "@/asset/image.jpg";
import { InputNumber } from "antd";

interface IItemProps {
	checkout?: boolean;
	quantity?: number;
}

const Item: React.FC<IItemProps> = ({
	checkout,
	quantity
}) => {
	return (
		<div className={styles.itemContainer}>
			<div className={styles.imageWrapper}>
				<a href="/item">
					<img src={image} alt="The item" className={styles.image} />
				</a>
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.title}>Switch Pro Controller</span>

				<div className={styles.description}>
					<div className={styles.information}>
						<span>Brand: Nintendo</span>
						{!checkout ? (<span>In Stock</span>) : (<span>Quantity: {quantity}</span>)}
						<span>Unit Price: $12</span>
					</div>
					{!checkout && <div className={styles.input}>
						<InputNumber
							size="large"
							min={1}
							max={99}
							defaultValue={1}
							onChange={() => null}
						/>
					</div>}
					<div className={styles.priceHolder}>
						<span className={styles.price}>$12.00</span>
					</div>
				</div>

				<div className={styles.linkContainer}>
					{!checkout && <span className={styles.link} onClick={()=>null}>Save for later</span>}
					<span className={styles.link} onClick={()=>null}>Remove</span>
				</div>
			</div>
		</div>
	);
};

export default Item;