import React from "react";
import styles from "./Item.less";
import { InputNumber } from "antd";

interface IItemProps {
	checkout?: boolean;
	quantity: number;
	title: string;
	image: string;
	brand: string;
	price: number;
	num?: number;
	id: string;
	onChange: (quantity: number, id: string) => void;
}

const Item: React.FC<IItemProps> = ({
	checkout,
	quantity,
	title,
	image,
	brand,
	price,
	num,
	id,
	onChange
}) => {
	return (
		<div className={styles.itemContainer}>
			<div className={styles.imageWrapper}>
				<a href={"/item/" + id}>
					<img src={image} alt="The item" className={styles.image} />
				</a>
			</div>
			<div className={styles.contentWrapper}>
				<span className={styles.title}>{title}</span>

				<div className={styles.description}>
					<div className={styles.information}>
						<span>Brand: {brand}</span>
						{!checkout ? (<span>{num === 0 ? "Out Of Stock" : "In Stock"}</span>) : (<span>Quantity: {quantity}</span>)}
						<span>Unit Price: ${Number(price).toFixed(2)}</span>
					</div>
					{!checkout && <div className={styles.input}>
						<InputNumber
							size="large"
							min={1}
							max={10}
							defaultValue={quantity}
							onChange={(value) => onChange(value, id)}
						/>
					</div>}
					<div className={styles.priceHolder}>
						<span className={styles.price}>${Number(price * quantity).toFixed(2)}</span>
					</div>
				</div>

				<div className={styles.linkContainer}>
					{!checkout && <span className={styles.link} onClick={()=>null}>Save for later</span>}
					<span className={styles.link} onClick={() => onChange(-1, id)}>Remove</span>
				</div>
			</div>
		</div>
	);
};

export default Item;