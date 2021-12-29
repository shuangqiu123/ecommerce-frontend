import React from "react";
import styles from "./Icon.less";

interface IIconProps {
	title: string;
	href?: string;
}

const Icon: React.FC<IIconProps> = ({
	title,
	href,
	children
}) => (
	<a className={styles.icon} href={href} title={title} target="_blank">
		{children}
	</a>
);

export default Icon;