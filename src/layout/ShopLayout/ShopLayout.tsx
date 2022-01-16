import { Breadcrumb } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import BasicLayout from "../BasicLayout";
import styles from "./ShopLayout.less";

export interface BreadCrumbFill {
	name: string;
	path?: string;
}

interface IShopLayoutProps {
	breadCrumb?: BreadCrumbFill[];
}

const ShopLayout: React.FC<IShopLayoutProps> = ({
	children,
	breadCrumb
}) => {
	const history = useHistory();
	return (
		<BasicLayout>
			<div className={styles.homePageContainer}>
				<div className={styles.breadCrumb}>
					<Breadcrumb>
						<Breadcrumb.Item href="/">Home</Breadcrumb.Item>
						{breadCrumb?.map((value) => (
							<>
								{value.path ? 
										(<Breadcrumb.Item onClick={() => history.push(value.path || "/")} >{value.name}</Breadcrumb.Item>) :
										(<Breadcrumb.Item >{value.name}</Breadcrumb.Item>)
								}
							</>
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