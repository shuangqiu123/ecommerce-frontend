import React from "react";
import styles from "./User.less";
import Nav from "./components/Nav";
import ShopLayout from "@/layout/ShopLayout";
import {
	Switch,
	Route,
	useRouteMatch,
} from "react-router-dom";
import OrderHistory from "./components/OrderHistory";
import ChangePassword from "./components/ChangePassword";
import ShippingInformation from "./components/ShippingInformation";

const User: React.FC = () => {
	const { path, url } = useRouteMatch();
	return (
		<ShopLayout breadCrumb={[{
			name: "User Home"
		}]}>
			<div className={styles.container}>
				<div className={styles.nav}>
					<Nav url={url} />
				</div>
				<div className={styles.wrapper}>
					<Switch>
						<Route exact path={`${path}/orderHistory`}>
							<OrderHistory />
						</Route>
						<Route exact path={`${path}/changePassword`}>
							<ChangePassword />
						</Route>
						<Route exact path={`${path}/shipping`}>
							<ShippingInformation />
						</Route>
						<Route path={`${path}/`}>
							<OrderHistory />
						</Route>
					</Switch>
				</div>
			</div>
		</ShopLayout>
	);
};

export default User;