import React from "react";
import classnames from "classnames";
import styles from "./Button.less";

interface IButtonProps {
	name: string;
	classname?: string;
	reverse?: boolean;
	onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({
	name,
	classname,
	reverse,
	onClick
}) => (
	<button className={classnames(styles.squareButton, reverse && styles.reverse, classname)} onClick={onClick}>
		{name}
	</button>
);

export default Button;