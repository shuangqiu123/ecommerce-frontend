import { Divider, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import styles from "./Nav.less";

const Nav: React.FC = () => {
	return (
		<div className={styles.navContainer}>
			<h2 className={styles.text}>REFINE</h2>
			<Divider plain></Divider>
			<Menu mode="inline" style={{ width: "100%" }}>
				<SubMenu key="brand" title="Brand">
					<Menu.Item key="1">Option 1</Menu.Item>
					<Menu.Item key="2">Option 2</Menu.Item>
					<Menu.Item key="3">Option 3</Menu.Item>
					<Menu.Item key="4">Option 4</Menu.Item>
				</SubMenu>
				<SubMenu key="price" title="Price">
					<Menu.Item key="9">Option 9</Menu.Item>
					<Menu.Item key="10">Option 10</Menu.Item>
					<Menu.Item key="11">Option 11</Menu.Item>
					<Menu.Item key="12">Option 12</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
};

export default Nav;