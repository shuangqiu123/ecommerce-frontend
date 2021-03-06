/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useRef } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { IStoreState } from "@/interface/Redux";
import HeartOutlined from "@ant-design/icons/HeartOutlined";
import ShoppingOutlined from "@ant-design/icons/ShoppingOutlined";
import logo from "@/asset/icon/S.svg";
import Toggler from "./components/Toggler";
import { useScroll } from "@/hook/useScroll";
import styles from "./Header.less";
import classnames from "classnames";
import { useViewport } from "@/hook/useViewport";
import { Badge, Dropdown, Menu } from "antd";
import { EUserActionTypes } from "@/common/User";

interface IHeaderProps {
	isLogin: boolean;
}

const Header: React.FC<IHeaderProps> = ({
	isLogin
}) => {
	const [visible, setVisible] = useState<boolean>(false);
	const dispatch = useDispatch();
	const [pin, setPin] = useState("");
	const [up, down, top] = useScroll();
	const [viewport] = useViewport();
	const count = useSelector(({ item }: IStoreState) => item.cartItems.length);
	const saveCount = useSelector(({ item }: IStoreState) => item.savedItems.length);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const history = useHistory();

	useEffect(() => {
		if (down) {
			setPin(styles.unpinned);
		}
		if (top || up) {
			setPin("");
		}
	}, [up, down, top]);

	useEffect(() => {
		if (viewport > 992) return;
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

	const logOutOnClick = () => {
		dispatch({
			type: EUserActionTypes.logout
		});
		history.replace("/user/login");
	};

	const signInMenu = (
		<Menu>
			{isLogin ? (
				<>
					<Menu.Item key="0">
    		 			<a onClick={() => history.push("/user/home")}>Home</a>
    				</Menu.Item>
					<Menu.Item key="1">
						<a onClick={logOutOnClick}>Log Out</a>
					</Menu.Item>
				</>
			): (
				<>
					<Menu.Item key="0">
			 			<a onClick={() => history.push("/user/login")} >Sign In</a>
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key="1">
					  <a onClick={() => history.push("/user/signup")}>Create Account</a>
					</Menu.Item>
				</>
			)}
		</Menu>
	);
	
	const headerSmall = (
		<>
			<div className={styles.bottomHeader}>
				<div className={classnames(styles.bottomHeaderContainer, styles.small)}>
					<div className={styles.left}>
						<Toggler toggle={()=> setVisible((prev) => !prev)} />
					</div>
					<a href="/">
						<img src={logo} className={styles.logo} alt="Website Logo" />
					</a>
					<div className={styles.icons}>
						<div className={styles.bottomHeaderIconContainer} onClick={() => history.push("/saveItem")}>
							<Badge count={saveCount} offset={[-5, 24]} size="small" color="blue">
								<HeartOutlined className={styles.bottomHeaderIcon}/>
							</Badge>
						</div>
						<div className={styles.bottomHeaderIconContainer} onClick={() => history.push("/cart")}>
							<Badge count={count} offset={[-1, 24]} size="small" color="blue">
								<ShoppingOutlined className={styles.bottomHeaderIcon} />
							</Badge>
						</div>
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
							<a className={styles.nameItemAnchor} href="/newIn">NEW IN</a>
						</li>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} href="/popular">POPULAR</a>
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
					<a className={styles.nameItemAnchor} href="/newIn">NEW IN</a>
				</li>
				<li className={styles.nameItem}>
					<a className={styles.nameItemAnchor} href="/popular">POPULAR</a>
				</li>
				{isLogin && (
					<>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => history.push("/user/home") }>User Home</a>
						</li><li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={logOutOnClick}>Log Out</a>
						</li>
					</>
				)}
				{!isLogin && (
					<>
						<li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => history.push("/user/login") }>SIGN IN</a>
						</li><li className={styles.nameItem}>
							<a className={styles.nameItemAnchor} onClick={() => history.push("/user/signup") }>CREATE ACCOUNT</a>
						</li>
					</>
				)}
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
								{isLogin ? (
									<a className={styles.topHeaderItem} onClick={() => history.push("/user/home")}>
										User
									</a>
								) : (
									<a className={styles.topHeaderItem} onClick={() => history.push("/user/login")}>
										Sign In
									</a>
								)}
							</Dropdown>
							<div className={styles.topHeaderIconContainer} onClick={() => history.push("/saveItem")}>
								<Badge count={saveCount} offset={[-3, 24]} size="small" color="blue">
									<HeartOutlined className={styles.topHeaderIcon}/>
								</Badge>
							</div>
							<div className={styles.topHeaderIconContainer} onClick={() => history.push("/cart")}>
								<Badge count={count} size="small" color="blue" offset={[-1, 24]}>
									<ShoppingOutlined className={styles.topHeaderIcon} />
								</Badge>
							</div>
						</div>
					</div>
				</div>
				{viewport <= 992 ? headerSmall : headerLarge}
			</header>
			{viewport <= 992 && dropdown}
		</div>
	);
};

export default connect(({ user }: IStoreState) => ({
	isLogin: user.id !== null && user.id !== ""
}))(Header);