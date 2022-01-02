import React from "react";
import styles from "./Item.less";
import image from "@/asset/image.jpg";
import { InputNumber } from "antd";

const Item: React.FC= () => {
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
						<span>In Stock</span>
						<span>Unit Price: $12</span>
					</div>
					<div className={styles.input}>
						<InputNumber
							size="large"
							min={1}
							max={99}
							defaultValue={1}
							onChange={() => null}
						/>
					</div>
					<div className={styles.priceHolder}>
						<span className={styles.price}>$12.00</span>
					</div>
				</div>

				<div className={styles.linkContainer}>
					<span className={styles.link} onClick={()=>null}>Save for later</span>
					<span className={styles.link} onClick={()=>null}>Remove</span>
				</div>
			</div>
		</div>
	);
};

export default Item;