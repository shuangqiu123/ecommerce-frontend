import { useViewport } from "@/hook/useViewport";
import { Divider, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./Nav.less";

interface INavProps {
	onChange?: (value: string) => void;
	url: string;
}

const Nav: React.FC<INavProps> = ({
	onChange,
	url
}) => {
	const history = useHistory();
	const [width] = useViewport();

	return (
		<div className={styles.navContainer}>
			<h2 className={styles.text}>MENU</h2>
			{width > 992 && <Divider plain></Divider>}
			<Menu mode={width > 992 ? "inline" : "horizontal"} style={{ width: "100%" }} onClick={(e) => history.replace(`${url}/${e.key}`)}>
				<SubMenu key="order" title="Order">
					<Menu.Item key="orderHistory">Order History</Menu.Item>
				</SubMenu>
				<SubMenu key="user" title="User">
					<Menu.Item key="changePassword">Password Change</Menu.Item>
					<Menu.Item key="shipping">Shipping Address</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
};

export default Nav;