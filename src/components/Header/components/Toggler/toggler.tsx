import React, { useState } from "react";
import styles from "./toggler.less";

interface ITogglerProps {
	toggle: () => void;
}

const Toggler: React.FC<ITogglerProps> = ({
	toggle
}) => {
	const [open, setOpen] = useState<boolean>(false);

	const buttonOnClick = (): void => {
		setOpen(prev => !prev);
		toggle();
	};

	return (
		<button
			className={`${styles.toggler} ${open? styles.open : ""}`}
			onClick={buttonOnClick}
		>
			<span className={styles.iconBar}></span>
			<span className={styles.iconBar}></span>
			<span className={styles.iconBar}></span>
		</button>
	);
};

export default Toggler;