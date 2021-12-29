import React from "react";
import classnames from "classnames";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./BasicLayout.less";

interface IBasicLayoutProps {
	onePage: boolean;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({onePage, children}) => {
	return (
		<div className={classnames(styles.basicLayout, onePage ? styles.onePage : "")}>
			<Header />
			<div className={`${styles.childrenContainer}`}>
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default BasicLayout;