import React from "react";
import styles from "./Item.less";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";
import { useHistory } from "react-router-dom";

interface IItemProps {
	image: string;
	isNewIn: boolean;
	num: number;
	price: number;
	title: string;
}

const Item: React.FC<IItemProps> = ({
	image,
	isNewIn,
	num,
	price,
	title
}) => {
	const history = useHistory();
	return (
		<div className={styles.itemContainer}>
			<div className={styles.item}>
				<div className={styles.imageContainer} onClick={() => history.push("/item")}>
					<img src={image} alt="The item" className={styles.image} />
				</div>
				<div className={styles.icons}>
					<HeartOutlined className={styles.icon} />
					<ShoppingOutlined className={styles.icon} />
				</div>
				<div className={styles.click}>
					<div className={styles.firstLine}>
						<span className={styles.title}>{title}</span>
					</div>
					<div>
						<span className={styles.price}>${Number(price).toFixed(2)}</span>
					</div>
					<div>
						<span className={styles.description}>{num === 0 ? "Out Of Stock" : "Shop Today"}</span>
					</div>
					<div>
						<span className={styles.description}>{isNewIn ? "New In" : ""}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Item;