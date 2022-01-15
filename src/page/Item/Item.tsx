/* eslint-disable jsx-a11y/alt-text */
import ShopLayout from "@/layout/ShopLayout";
import LeftOutlined from "@ant-design/icons/LeftOutlined";
import RightOutlined from "@ant-design/icons/RightOutlined";
import React, { useEffect, useState } from "react";
import styles from "./Item.less";
import { Carousel, Divider, InputNumber } from "antd";
import Button from "@/components/Button";
import { useHistory } from "react-router-dom";
import { BreadCrumbFill } from "@/layout/ShopLayout/ShopLayout";
import { useDispatch } from "react-redux";
import { EItemActionType } from "@/common/Item";
import { IItemDisplay } from "@/interface/Item";
import Error from "@/components/Error";


const ItemPage: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [item, setItem] = useState<IItemDisplay>();
	const [breadCrumb, setBreadCrumb] = useState<BreadCrumbFill[]>([]);
	const [error, setError] = useState<boolean>(false);
	const [quantity, setQuantity] = useState<number>(1);

	useEffect(() => {
		const path = history.location.pathname;
		const id = path.split("/")[2];
		if (!id) {
			setError(true);
			return;
		}
		dispatch({
			type: EItemActionType.getItemById,
			payload: id,
			callback: (item: IItemDisplay) => {
				if (!item) {
					setError(true);
					return;
				}
				setBreadCrumb([{
					name: item.title,
					path: "/item/" + item.id
				}]);
				setItem(item);
			}
		});
	}, [history, dispatch]);

	const addToCartOnClick = () => {
		dispatch({
			type: EItemActionType.addItemIntoCart,
			payload: {
				id: item?.id,
				quantity: quantity
			}
		});
	};

	const itemDisplay = (
		<div className={styles.itemWrapper}>
			<div className={styles.imageContainer}>
				<Carousel
					arrows
					prevArrow={<LeftOutlined />}
					nextArrow={<RightOutlined />}
					fade
				>
					{item?.image.split(";").map((value, key) => (
						<div className={styles.imageWrapper} key={key}>
							<img src={value} className={styles.image} />
						</div>
					))}
				</Carousel>
			</div>
			<div className={styles.contentContainer}>
				<h1 className={styles.title}>{item?.title}</h1>
				<div className={styles.productInfo}>
					<span>{item?.isNewIn ? "New In" : ""}</span>
				</div>
				<div className={styles.outofstock}>
					<span>{item?.num === 0 ? "Out Of Stock" : ""}</span>
				</div>
				<div className={styles.price}>
					<span>${Number(item?.price).toFixed(2)}</span>
				</div>
				<Divider />
				<div className={styles.qty}>
					<span>Quantity:</span>
				</div>
				<div className={styles.button}>
					<InputNumber
						size="large"
						min={1}
						max={10}
						defaultValue={1}
						onChange={(value) => setQuantity(value)}
						controls={false}
						className={styles.input}
						disabled={item?.num === 0}
					/>
					{item?.num !== void(0) && item?.num > 0 && <Button name="ADD TO CART" onClick={addToCartOnClick} reverse />}
				</div>
				<Divider />
				<div className={styles.description}>
					<span>Detail:</span>
					<p>{item?.description}</p>
				</div>
			</div>
		</div>
	);

	return (
		<ShopLayout breadCrumb={breadCrumb}>
			{error ? (
				<div className={styles.errorContainer}><Error /></div>
			)
			 : itemDisplay}
		</ShopLayout>
	);
};

export default ItemPage;