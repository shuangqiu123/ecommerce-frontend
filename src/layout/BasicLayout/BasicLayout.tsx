import React from "react";
import classnames from "classnames";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./BasicLayout.less";

interface IBasicLayoutProps {
	flexbox?: boolean;
}

const BasicLayout: React.FC<IBasicLayoutProps> = ({ flexbox, children}) => {

	return (
		<div className={classnames(styles.basicLayout)}>
			<Header />
			<div className={`${styles.childrenContainer} ${flexbox && styles.flexbox}`}>
				{children}
			</div>
			<Footer />
		</div>
	);
};

export default BasicLayout;