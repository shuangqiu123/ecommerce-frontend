import { EItemActionType } from "@/common/Item";
import Button from "@/components/Button";
import Item from "@/components/Item";
import { IItemDisplay } from "@/interface/Item";
import { IStoreState } from "@/interface/Redux";
import BasicLayout from "@/layout/BasicLayout";
import ShopLayout from "@/layout/ShopLayout";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styles from "./SaveItem.less";

const SaveItem: React.FC = () => {
	const history = useHistory();
	const savedItems = useSelector(({ item }: IStoreState) => item.savedItems);
	const [items, setItems] = useState<IItemDisplay[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: EItemActionType.getItemDetailsFromSave,
			payload: savedItems,
			callback: (items: IItemDisplay[]) => {
				setItems(items);
			}
		});
	}, [dispatch, savedItems]);

	const emptySave = (
		<BasicLayout>
			<div className={styles.emptyCartContainer}>
				<h1 className={styles.title}>
					Saved Items
				</h1>
				<div className={styles.description}>
					<HeartOutlined className={styles.icon} />
					<span>Your currently have no saved items. </span>
					<Button name="START SHOPPING" onClick={() => history.push("/")} classname={styles.button} />
				</div>
			</div>
		</BasicLayout>
	);
	const save = (
		<ShopLayout breadCrumb={[{
			name: "Saved Items",
			path: "/saveItem"
		}]}>
			<div className={styles.container}>
				<div className={styles.title}>
					<h1><span>Your Saved Items</span></h1>
				</div>
				<div className={styles.quantity}>
					<span>{savedItems.length === 1 ? "1 item" : `${savedItems.length} items`}</span>
				</div>
				<div className={styles.itemContainer}>
					{items?.map((value) => {
						return (
							<Item
								title={value.title}
								price={value.price}
								isNewIn={value.isNewIn}
								num={value.num}
								image={value.image.split(";")[0]}
								id={value.id}
								breadcrumb={[]}
							/>
						);
					})}
				</div>
			</div>
		</ShopLayout>
	);
	return savedItems.length === 0 ? emptySave: save;
};

export default SaveItem;