import React, { useEffect } from "react";
import classnames from "classnames";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./BasicLayout.less";
import { useDispatch, useSelector } from "react-redux";
import { EUserActionTypes } from "@/common/User";
import { IStoreState } from "@/interface/Redux";
import { Spin } from "antd";
import { EItemActionType } from "@/common/Item";

interface IBasicLayoutProps {
	flexbox?: boolean;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ flexbox, children}) => {
	const dispatch = useDispatch();
	const loading: boolean = useSelector(({ loading }: IStoreState) => loading.loading);

	useEffect(() => {
		dispatch({
			type: EUserActionTypes.refreshUser
		});
		dispatch({
			type: EItemActionType.refreshCart
		});
	}, [dispatch]);

	return (
		<Spin spinning={loading}>
			<div className={classnames(styles.basicLayout)}>
				<Header />
				<div className={`${styles.childrenContainer} ${flexbox && styles.flexbox}`}>
					{children}
				</div>
				<Footer />
			</div>
		</Spin>
	);
};

export default BasicLayout;