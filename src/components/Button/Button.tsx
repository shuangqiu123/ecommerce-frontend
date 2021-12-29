import React from "react";
import styles from "./Button.less";

interface IButtonProps {
	name: string;
	onClick: () => void;
}

const Button: React.FC<IButtonProps> = ({
	name,
	onClick
}) => (
	<button className={styles.squareButton} onClick={onClick}>
		{name}
	</button>
);

export default Button;