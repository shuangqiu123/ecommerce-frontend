import React from "react";
import styles from "./HomePage.less";
import BasicLayout from "@/layout/BasicLayout";
import { Breadcrumb, Input, Select, Select as Option } from "antd";
import Item from "@/components/Item";
import Nav from "./components/Nav";

const HomePage: React.FC = () => {
	return (
		<BasicLayout onePage={false}>
			<div className={styles.homePageContainer}>
				<div className={styles.breadCrumb}>
					<Breadcrumb>
						<Breadcrumb.Item>Home</Breadcrumb.Item>
						<Breadcrumb.Item>New In</Breadcrumb.Item>
					</Breadcrumb>
				</div>
				<section className={styles.main}>
					<div className={styles.nav}>
						<Nav />
					</div>
					<div className={styles.itemWrapper}>
						<div className={styles.title}>
							<h1>New In</h1>
							<div className={styles.titleRight}>
								<span className={styles.itemPlaceHolder}>157 Items</span>
								<Select defaultValue="recommended" style={{ width: "11rem" }}>
									<Option value="recommended">Recommended</Option>
									<Option value="newest">Newest</Option>
									<Option value="pricelh">Price (Low to High)</Option>
									<Option value="pricehl">Price (High to Low)</Option>
								</Select>
							</div>
						</div>
						<div className={styles.itemContainer}>
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
							<Item />
						</div>
					</div>
				</section>
			</div>
		</BasicLayout>
	);
};

export default HomePage;