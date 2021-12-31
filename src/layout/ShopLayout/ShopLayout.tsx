import { Breadcrumb } from "antd";
import React from "react";
import BasicLayout from "../BasicLayout";
import styles from "./ShopLayout.less";

const ShopLayout: React.FC = ({
	children
}) => {
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
					{children}
				</section>
			</div>
		</BasicLayout>
	);
};

export default ShopLayout;