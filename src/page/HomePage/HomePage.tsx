import React, { useEffect, useState } from "react";
import styles from "./HomePage.less";
import ShopLayout from "@/layout/ShopLayout";
import { Select, Select as Option } from "antd";
import Item from "@/components/Item";
import Nav from "./components/Nav";
import { useDispatch } from "react-redux";
import { EItemActionType } from "@/common/Item";
import { Category, IItemBatchDisplay, IItemMetadata } from "@/interface/Item";
import { BreadCrumbFill } from "@/layout/ShopLayout/ShopLayout";

interface IHomePageProps {
	category?: Category;
}

const HomePage: React.FC<IHomePageProps> = ({
	category
}) => {
	const dispatch = useDispatch();
	const [total, setTotal] = useState<number>(0);
	const [itemDisplayList, setItemDisplayList] = useState<IItemBatchDisplay[]>([]);
	const [sort, setSort] = useState<number>();
	const [brand, setBrand] = useState<string>();
	const [title, setTitle] = useState<string>();
	const [breadCrumb, setBreadCrumb] = useState<BreadCrumbFill[]>([]);
	const [priceRangeLow, setPriceRangeLow] = useState<number>();
	const [priceRangeHigh, setPriceRangeHigh] = useState<number>();
	
	useEffect(() => {
		if (!category) {
			setTitle("All Items");
		}
		if (category === 0) {
			setTitle("New In");
			setBreadCrumb([{
				name: "New In",
				path: "/newIn"
			}]);
		}
		if (category === 1) {
			setTitle("Popular");
			setBreadCrumb([{
				name: "Popular",
				path: "/popular"
			}]);
		}
	}, [category]);

	useEffect(() => {
		dispatch({
			type: EItemActionType.batchGetItems,
			payload: {
				pageNum: 1,
				pageSize: 100,
				brand,
				priceRangeLow,
				priceRangeHigh,
				sort,
				category
			},
			callback: (itemMetadata: IItemMetadata) => {
				setTotal(itemMetadata.total);
				console.log(itemMetadata.itemBatchDisplayList[0]);
				setItemDisplayList(itemMetadata.itemBatchDisplayList);
			}
		});
	}, [brand, dispatch, priceRangeHigh, priceRangeLow, sort, category]);

	const handleSort = (value: number) => {
		setSort(value);
	};

	const changeBrand = (value: string) => {
		setBrand(value);
	};

	const changePrice = (value: string) => {
		if (value === "1") {
			setPriceRangeLow(0);
			setPriceRangeHigh(100);
		}
		if (value === "2") {
			setPriceRangeLow(101);
			setPriceRangeHigh(500);
		}
		if (value === "3") {
			setPriceRangeLow(501);
			setPriceRangeHigh(1000);
		}
		if (value === "4") {
			setPriceRangeLow(1001);
			setPriceRangeHigh(5000);
		}
	};

	return (
		<ShopLayout breadCrumb={breadCrumb}>
			<div className={styles.nav}>
				<Nav changeBrand={changeBrand} changePrice={changePrice}/>
			</div>
			<div className={styles.itemWrapper}>
				<div className={styles.title}>
					<h1>{title}</h1>
					<div className={styles.titleRight}>
						<span className={styles.itemPlaceHolder}>{total === 1 ? "1 item" : `${total} items`}</span>
						<Select style={{ width: "11rem" }} onChange={handleSort}>
							<Option value={0}>Newest</Option>
							<Option value={1}>Price (Low to High)</Option>
							<Option value={2}>Price (High to Low)</Option>
						</Select>
					</div>
				</div>
				<div className={styles.itemContainer}>
					{itemDisplayList?.map((value) => {
						return (
							<Item
								title={value.title}
								price={value.price}
								isNewIn={value.isNewIn}
								num={value.num}
								image={value.image.split(";")[0]}
								id={value.id}
								breadcrumb={breadCrumb}
							/>
						);
					})}
				</div>
			</div>
		</ShopLayout>
	);
};

export default HomePage;