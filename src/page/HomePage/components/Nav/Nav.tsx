import { Divider, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import React from "react";
import styles from "./Nav.less";

interface INavProps {
	changeBrand: (value: string) => void;
	changePrice: (value: string) => void;
}

const Nav: React.FC<INavProps> = ({
	changeBrand,
	changePrice
}) => {
	return (
		<div className={styles.navContainer}>
			<h2 className={styles.text}>REFINE</h2>
			<Divider plain></Divider>
			<Menu mode="inline" style={{ width: "100%" }}>
				<SubMenu key="brand" title="Brand">
					<Menu.Item key="Intel" onClick={(value) => changeBrand(value.key)}>Intel</Menu.Item>
					<Menu.Item key="AMD" onClick={(value) => changeBrand(value.key)}>AMD</Menu.Item>
					<Menu.Item key="ASUS" onClick={(value) => changeBrand(value.key)}>ASUS</Menu.Item>
					<Menu.Item key="MyBrand" onClick={(value) => changeBrand(value.key)}>MyBrand</Menu.Item>
					<Menu.Item key="MyBrand2" onClick={(value) => changeBrand(value.key)}>MyBrand2</Menu.Item>
				</SubMenu>
				<SubMenu key="price" title="Price">
					<Menu.Item key={1} onClick={(value) => changePrice(value.key)}>$0 - $100</Menu.Item>
					<Menu.Item key={2} onClick={(value) => changePrice(value.key)}>$101 - $500</Menu.Item>
					<Menu.Item key={3} onClick={(value) => changePrice(value.key)}>$501 - $1000</Menu.Item>
					<Menu.Item key={4} onClick={(value) => changePrice(value.key)}>$1000 or above</Menu.Item>
				</SubMenu>
			</Menu>
		</div>
	);
};

export default Nav;