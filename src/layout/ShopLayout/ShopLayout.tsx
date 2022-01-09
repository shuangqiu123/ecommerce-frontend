import { Breadcrumb } from "antd";
import React from "react";
import BasicLayout from "../BasicLayout";
import styles from "./ShopLayout.less";

export interface BreadCrumbFill {
	name: string;
	path: string;
}

interface IShopLayoutProps {
	breadCrumb?: BreadCrumbFill[];
}

const ShopLayout: React.FC<IShopLayoutProps> = ({
	children,
	breadCrumb
}) => {
	return (
		<BasicLayout>
			<div className={styles.homePageContainer}>
				<div className={styles.breadCrumb}>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
						{breadCrumb?.map((value) => (
							<Breadcrumb.Item href={value.path} >{value.name}</Breadcrumb.Item>
						))}
					</Breadcrumb>
				</div>
				<section className={styles.main}>
					{children}
				</section>
			</div>
		</BasicLayout>
	);
};

export default ShopLayout;