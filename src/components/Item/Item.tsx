import React from "react";
import styles from "./Item.less";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";
import { useHistory } from "react-router-dom";
import { BreadCrumbFill } from "@/layout/ShopLayout/ShopLayout";
import { EItemActionType } from "@/common/Item";
import { useDispatch } from "react-redux";
import { notification } from "antd";

interface IItemProps {
	image: string;
	isNewIn: boolean;
	num: number;
	price: number;
	title: string;
	id: string;
	breadcrumb: BreadCrumbFill[];
}

const Item: React.FC<IItemProps> = ({
	image,
	isNewIn,
	num,
	price,
	title,
	id, 
	breadcrumb
}) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const addToCartOnClick = () => {
		if (num === 0) {
			notification.info({
				message: "This item is out of stock",
				duration: 3
			});
			return;
		}
		dispatch({
			type: EItemActionType.addItemIntoCart,
			payload: {
				id: id,
				quantity: 1
			}
		});
	};

	return (
		<div className={styles.itemContainer}>
			<div className={styles.item}>
				<div className={styles.imageContainer} onClick={() => history.push("/item/" + id)}>
					<img src={image} alt="The item" className={styles.image} />
				</div>
				<div className={styles.icons}>
					<HeartOutlined className={styles.icon} />
					<ShoppingOutlined className={styles.icon} onClick={addToCartOnClick} />
				</div>
				<div className={styles.click} onClick={() => history.push("/item/" + id)}>
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