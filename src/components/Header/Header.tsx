/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch } from "react-redux";
import { IStoreState } from "@/interface/Redux";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";
import logo from "@/asset/icon/S.svg";
import Toggler from "./components/Toggler";
import { useScroll } from "@/hook/useScroll";
import styles from "./Header.less";
import classnames from "classnames";
import { useViewport } from "@/hook/useViewport";
import { getItem } from "@/util/localstorage";
import { EUserActionTypes } from "@/common/User";
import { Dropdown, Menu } from "antd";

interface IHeaderProps {
	userId: string;
	userName: string;
}

const Header: React.FC<IHeaderProps> = ({
	userId,
	userName,
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const [pin, setPin] = useState("");
	const [up, down, top] = useScroll();
	const [viewport] = useViewport();
	const dropdownRef = useRef<HTMLDivElement>(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (userId === "") {
			const user = getItem("eportfolio/user");
			dispatch({
				type: EUserActionTypes.setUser,
				payload: user
			});
		}
	}, [userId, dispatch]);

	useEffect(() => {
		if (down) {
			setPin(styles.unpinned);
		}
		if (top || up) {
			setPin("");
		}
	}, [up, down, top]);

	useEffect(() => {
		if (viewport > 768) return;
		const dropdownContainer = dropdownRef.current;
		const style = dropdownContainer?.style;
		const children = dropdownContainer?.firstElementChild?.children;
		if (!children || !style) return;
		if (!visible) {
			style.height = "0px";
			return;
		}
		let offsetHeight = 0;
		for (let i = 0; i < children?.length; i++) {
			const child = children[i] as HTMLElement;
			offsetHeight += child.offsetHeight;
		}
		if (offsetHeight === 0) return;
		style.height = `${offsetHeight}px`;

	}, [visible, viewport]);

	const signInMenu = (
		<Menu>
    		<Menu.Item key="0">
    		  <a href="/user/login">Sign In</a>
    		</Menu.Item>
			<Menu.Divider />
    		<Menu.Item key="1">
    		  <a href="/user/signup">Create Account</a>
    		</Menu.Item>
		</Menu>
	);
	
	const headerSmall = (
		<>
			<div className={styles.bottomHeader}>
				<div className={classnames(styles.bottomHeaderContainer, styles.small)}>
					<div>
						<Toggler toggle={()=> setVisible((prev) => !prev)} />
					</div>
					<a href="/">
						<img src={logo} className={styles.logo} alt="Website Logo" />
					</a>
					<div>
						<HeartOutlined className={styles.bottomHeaderIcon}/>
						<ShoppingOutlined className={styles.bottomHeaderIcon}/>
					</div>
				</div>
			</div>
		</>
	);

	const headerLarge = (
		<>
			<div className={styles.bottomHeader}>
				<div className={styles.bottomHeaderContainer}>
					<a href="/">
						<img src={logo} className={styles.logo} alt="Website Logo" />
					</a>
					<ul className={styles.nameList}>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => {}}>NEW IN</a>
						</li>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => {}}>OFFERS</a>
						</li>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => {}}>POPULAR</a>
						</li>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => {}}>CLOTHES</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
	
	const dropdown = (
		<div ref={dropdownRef} className={classnames(styles.dropdown, visible ? styles.show : styles.hide)}>
			<ul className={styles.nameList}>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} onClick={() => {}}>NEW IN</a>
				</li>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} onClick={() => {}}>OFFERS</a>
				</li>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} onClick={() => {}}>POPULAR</a>
				</li>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} onClick={() => {}}>CLOTHES</a>
				</li>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} onClick={() => {}}>SIGN IN</a>
				</li>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} onClick={() => {}}>CREATE ACCOUNT</a>
				</li>
			</ul>
		</div>
	);

	return (
		<div className={classnames(styles.headerWrapper, styles.sticky, pin)}>
			<header className={classnames(styles.headerContainer)}>
				<div className={classnames(styles.topHeader)}>
					<div className={styles.topHeaderContainer}>
						<div className={styles.topHeaderItemContainer}>
							<a className={styles.topHeaderItem} href="/">
							Store
							</a>
							<Dropdown overlay={signInMenu} trigger={["hover"]}>
								<a className={styles.topHeaderItem} href="/user/login">
								Sign In
								</a>
							</Dropdown>
							<SearchOutlined className={styles.topHeaderIcon}/>
							<HeartOutlined className={styles.topHeaderIcon}/>
							<ShoppingOutlined className={styles.topHeaderIcon}/>
						</div>
					</div>
				</div>
				{viewport <= 768 ? headerSmall : headerLarge}
			</header>
			{viewport <= 768 && dropdown}
		</div>
	);
};

export default connect(({ user }: IStoreState) => ({
	userId: user.userId,
	userName: user.userName
}))(Header);